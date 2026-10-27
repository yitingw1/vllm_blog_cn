# Infera：通过分布式推理编排提升智能体 AI 的有效吞吐量

> 本文是 [AMD-AGI/Infera README](https://github.com/AMD-AGI/Infera) 的简体中文翻译。

[![CI](https://github.com/AMD-AGI/Infera/actions/workflows/ci.yml/badge.svg)](https://github.com/AMD-AGI/Infera/actions/workflows/ci.yml)
[![Release](https://github.com/AMD-AGI/Infera/actions/workflows/release.yml/badge.svg)](https://github.com/AMD-AGI/Infera/actions/workflows/release.yml)
[![Docs](https://img.shields.io/badge/docs-latest-blue.svg)](https://rocm.docs.amd.com/projects/infera/en/latest/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://github.com/AMD-AGI/Infera/blob/main/LICENSE)

[什么是 Infera？](#什么是-infera) | [主要功能](#主要功能) | [快速开始](#快速开始) | [引擎镜像](#引擎镜像) | [基准测试](#基准测试) | [与 llm-d、Dynamo 对比](#与-llm-ddynamo-对比) | [文档](#文档) | [路线图](#路线图) | [许可证](#许可证)

AMD ROCm™ Infera 是面向大规模部署的分布式推理参考方案，是推理 GPU 乐团的“指挥”。它从三个维度协调各个引擎实例：**KV 感知路由（KV-Aware Routing）**、**预填充与解码分离（Prefill-Decode Disaggregation）**以及 **KV 缓存分层（KV-Cache Tiering）**，并根据生产环境的服务等级协议（SLA）进行调优。

Infera 从第一天起即为开源项目，并原生支持 ROCm，专为 AMD Instinct™ GPU 构建。它在一个或多个引擎实例前提供单一的 OpenAI 兼容端点，并通过转换层支持 Anthropic Messages API；底层可以运行 vLLM、SGLang 或 ATOM。

## 什么是 Infera？

现代推理引擎会优化单个引擎实例内部的执行，但生产系统通常依赖多个实例来实现规模扩展、可用性和工作负载专门化。随着部署规模增长，团队通常使用传统负载均衡或自定义逻辑来分发请求。

这会形成编排层面的缺口，在智能体工作负载中尤其明显。智能体系统会运行很长的多轮循环，反复复用大型前缀，例如系统提示词、记忆、检索上下文和工具输出，同时每一轮只增加少量新 token。上下文可能增长到数万乃至数十万 token，输入与输出的比例可以超过 100:1。理论上，大部分工作都应该通过 KV 缓存复用；但在实践中，复用经常失效：系统无法了解哪些实例保存了相关 KV 缓存；内存压力会迫使系统逐出大型前缀；同一个请求在不同轮次又经常落到不同实例。即使系统表面上负载均衡，最终仍会重复预填充、丢失缓存局部性、增加延迟并降低吞吐量。

Infera 通过三个维度协调引擎实例来解决这一问题：KV 感知路由、预填充与解码分离，以及 KV 缓存分层。它不会替换推理引擎，而是在整个部署中管理请求放置、执行阶段和可复用 KV 状态。这种编排可以提高推理的**有效吞吐量（goodput）**，即在首 token 时间、token 间延迟等延迟目标内完成的请求速率；这才是决定端到端智能体 AI 性能的指标。Infera 在 AMD Instinct MI355X 上完成构建和验证。

## 主要功能

Infera 围绕三项核心能力协调引擎实例，把 GPU 时间转化为 token：

- **路由：KV 感知路由**——在 KV 缓存复用率与活跃工作量之间进行权衡，把请求路由到合适的引擎实例。路由器会根据每个在线实例已经持有多少提示词前缀，以及实例的当前负载进行评分，并选择最佳匹配，使前缀直接从缓存提供，而无需重新计算。
- **专门化：预填充与解码分离**——在专门的引擎实例上分别运行预填充和解码。预填充受计算能力限制，解码受带宽限制；在同一个实例中运行两者会造成资源利用不足。将它们分离后，可以根据各自任务调整实例池规模，并通过 Mooncake 或 MoRI-IO（AI 网卡 RDMA）在两者之间流式传输 KV。
- **保留：KV 缓存分层**——把可复用 KV 状态保留在 GPU HBM 之外，供后续请求使用。当 HBM 被占满时，AMD Infinity Context（AIC）不会直接丢弃 KV，而是将其从 GPU HBM 移动到本地 NVMe 或由远程 NFS 支持的存储。传输使用直接 GPU 数据路径，无需经过 CPU DRAM 暂存，因此一个实例可以接续使用另一个实例已经计算的前缀。

围绕这些核心能力，Infera 还提供：

- **多引擎支持**——通过统一的服务接口运行 vLLM、SGLang 或 ATOM。
- **兼容 OpenAI 和 Anthropic 的 API**——支持 `/v1/chat/completions`、`/v1/completions` 和 `/v1/messages`；后者为 Anthropic Messages API，由进程内转换层处理。
- **实例集群自动注册**——工作节点注册到 etcd，或在 Kubernetes 上注册到自身 Pod annotation，并持续发送心跳。路由器始终基于实时视图工作，不会把请求发送给已经离线的工作节点；可以运行任意数量的无状态服务器副本。
- **扩缩容时不丢失请求**——工作节点准备完成后才加入，离开时则先进入排空流程：节点宣布 `DRAINING`，完成已经接收的生成任务，然后才注销。在 MI355X 上的测量结果显示：收到 `SIGTERM` 后，工作节点在 **不到一秒**内停止接收新任务，同时所有正在执行的 4,000-token 生成任务均能完成；在持续流量下增加或移除实例会产生 **零失败请求**。参见[扩展实例集群](https://rocm.docs.amd.com/projects/infera/en/latest/features/scaling.html)。
- **Kubernetes 原生支持**——Operator 会协调 `InferaDeployment` CRD，包括聚合式、P/D 分离式和多节点部署，并可选配 Gateway API（GAIE）端点选择器。
- **SLA 规划器**——`python -m infera.planner` 根据实测延迟和模型的离线性能分析，计算满足首 token 时间与 token 间延迟目标所需的预填充和解码副本数量。规划器会报告数量，实际调整实例规模仍由用户完成。

## 架构

Infera 在 ROCm 推理栈中加入一层专注的编排层。应用通过 OpenAI 兼容 API 连接，并可通过兼容 Anthropic 的适配层访问。内置路由器负责调度；服务器可在负载均衡器后横向扩展；同样的路由逻辑还提供高性能 Rust 数据平面实现。

![ROCm Infera 平台架构层次](https://raw.githubusercontent.com/AMD-AGI/Infera/main/images/infera_architecture.png)

运行时，预填充和解码实例通过 etcd 注册到控制平面，路由器根据角色、活跃工作量和 KV 缓存局部性选择兼容的预填充与解码实例组合。预填充实例会查询外部 KV 缓存服务 `kvd`，寻找可复用的块；AIC 通过直接 GPU 路径恢复命中的数据；完成的 KV 状态通过 Mooncake 或 MoRI-IO 传输到解码实例；最后，解码实例通过路由器流式返回响应。

![带外部 KV 缓存存储的预填充与解码分离式部署请求流](https://raw.githubusercontent.com/AMD-AGI/Infera/main/images/infera_request_flow.png)

## 快速开始

### 方案 A——Docker（最快）

引擎镜像已经包含 Infera 和推理引擎，因此无需在主机侧安装。先启动 etcd，然后在引擎容器中运行服务器和一个工作节点。

```bash
# 第 1 步——etcd（共享注册表）
docker run -d --name infera-etcd --network host quay.io/coreos/etcd:v3.5.14 \
  etcd --advertise-client-urls http://127.0.0.1:2379 --listen-client-urls http://0.0.0.0:2379

# 第 2 步——引擎容器（单主机、非 RDMA 运行可以移除 infiniband/IPC_LOCK/libionic）
docker run --rm -it --network host --ipc host --shm-size 32g             \
  --device /dev/kfd --device /dev/dri --device /dev/infiniband           \
  --group-add video --group-add render --cap-add IPC_LOCK                \
  -v /usr/lib/x86_64-linux-gnu/libionic.so:/host-libionic/libionic.so:ro \
  docker.io/rocm/infera:sglang-v0.1.1 bash

# 第 3 步——在容器中启动服务器和工作节点
python -m infera.server --port 8000 --etcd-endpoint 127.0.0.1:2379 \
  --router-tokenizer-path Qwen/Qwen3-0.6B \
  --discovery-backend etcd --request-transport http --kv-event-transport zmq &

python -m infera.engine.sglang --model-path Qwen/Qwen3-0.6B \
  --host 0.0.0.0 --port 30000 --etcd-endpoint 127.0.0.1:2379 \
  --discovery-backend etcd --request-transport http --kv-event-transport zmq &

# 第 4 步——发送请求（等待几秒，让工作节点加载模型）
curl localhost:8000/v1/chat/completions -H 'Content-Type: application/json' \
  -d '{"model":"Qwen/Qwen3-0.6B","messages":[{"role":"user","content":"1+1=?"}],"max_tokens":50}'
```

如需自行构建镜像，请参阅[引擎镜像](#引擎镜像)，并将上面的 `rocm/infera:sglang-v0.1.1` 替换为本地标签 `rocm/infera:sglang-dev`。

### 方案 B——从源代码安装（pip）

> PyPI 软件包 `amd-infera` 尚未发布，请从克隆的仓库安装。

在 ROCm 环境中，例如引擎基础镜像，安装 Infera 和至少一个推理引擎，然后运行与方案 A 相同的 etcd、服务器与工作节点组合：

```bash
pip3 install ".[sglang]"        # 或 .[vllm] / .[atom]；端点选择器需加 .[gaie]
pip3 install -e ".[dev,sglang]" # 可编辑安装 + lint/测试工具，供贡献者使用
```

**可选——Rust 路由器**（`--router-backend rust`）：这是多核数据平面实现。目前尚未作为 wheel 发布，因此需要从源代码构建二进制文件，并安装 [Rust 工具链](https://rustup.rs)：

```bash
cd rust && cargo build --release && cd -   # 生成 rust/target/release/infera-router
```

服务器会自动发现该二进制文件，也可以设置 `INFERA_ROUTER_BIN=/path/to/infera-router`；然后使用 `--router-backend rust` 启动服务器。默认后端为 `python`，无需 Rust 工具链。

### 方案 C——Kubernetes

Operator 会协调 `InferaDeployment` CRD，包括聚合式、预填充与解码分离式，以及多节点部署，并可选配 Gateway API（GAIE）端点选择器。首先安装集群依赖项，包括 LWS、NATS 和 Operator；如需 GAIE 栈，添加 `INSTALL_GATEWAY=true`。随后应用部署配置：

```bash
deploy/scripts/deploy-k8s.sh            # LWS + NATS + Operator，选项参见 --help

# 应用前，根据你的集群修改模板中的 <PLACEHOLDERS>。
kubectl apply -f examples/k8s-deployments/pvc-models.yaml
kubectl apply -f examples/k8s-deployments/single-node-aggregated.yaml
```

[`examples/k8s-deployments/`](https://github.com/AMD-AGI/Infera/blob/main/examples/k8s-deployments/README.md) 中提供了可供填写的部署模板，包括单节点、预填充/解码、多节点 TP 和 GAIE，以及各自的占位符说明。

**扩缩容。**Infera 没有提供扩缩容控制器。工作节点准备就绪后自行注册，排空完成后自行注销；路由器始终把请求发送到当前已注册节点。因此，可以通过对 CR 执行 `kubectl scale`，或直接启动、停止工作节点来扩缩容，无需另行通知系统。

两个方向的成本差异很大，并影响建立在其上的所有设计：

| 操作 | 实测结果 |
|---|---|
| 扩容：`docker run` → 开始服务 | **140 秒**，几乎全部耗时用于加载权重 |
| 缩容：`SIGTERM` → 停止接收新请求 | **< 1 秒** |
| 缩容：正在执行的生成任务 | 运行至完成，受 `--drain-timeout` 限制 |
| 流量下增加和移除实例 | **260 个请求，0 次失败** |

由于冷启动需要数分钟，而控制循环只需数秒，**短于冷启动时间的流量突发无法通过临时增加工作节点来应对**。需要预留容量，或把流量引导到已经运行的实例。Infera 不自带自动扩缩容器；[扩展实例集群](https://rocm.docs.amd.com/projects/infera/en/latest/features/scaling.html)说明了构建自动扩缩容器时已经具备和仍然缺失的能力。

## 引擎镜像

预构建镜像发布在 Docker Hub 的 [`rocm/infera`](https://hub.docker.com/r/rocm/infera/tags) 仓库中，标签格式为 `<component>-<version>`：

| 镜像 | 组件 |
|---|---|
| `rocm/infera:vllm-v0.1.1` | vLLM 引擎 + Infera |
| `rocm/infera:sglang-v0.1.1` | SGLang 引擎 + Infera |
| `rocm/infera:atom-v0.1.1` | ATOM 引擎 + Infera |
| `rocm/infera:kvd-v0.1.1` | 分层 KV 缓存守护进程 `infera.kvd` |
| `rocm/infera:server-v0.1.1` | OpenAI 兼容服务器 + 路由器 |

```bash
docker pull rocm/infera:sglang-v0.1.1
```

如需自行构建，每个引擎在 `deploy/docker/` 下都有一个标准 Dockerfile，用于在厂商基础镜像上叠加 Infera。请从仓库根目录构建；可以通过 `--build-arg <ENGINE>_BASE_IMAGE=...` 覆盖基础镜像。

| Dockerfile | 基础镜像 |
|---|---|
| `Dockerfile.sglang` | `lmsysorg/sglang:v0.5.18-rocm720-mi35x` |
| `Dockerfile.sglang.gfx942` | `lmsysorg/sglang:v0.5.16-rocm720-mi30x` |
| `Dockerfile.vllm` | `vllm/vllm-openai-rocm:nightly-cbe9c40f…` |
| `Dockerfile.atom` | `rocm/atom:rocm7.2.4_…_atom0.1.4_20260612` |

```bash
docker build -f deploy/docker/Dockerfile.sglang -t rocm/infera:sglang-dev .
docker build -f deploy/docker/Dockerfile.vllm   -t rocm/infera:vllm-dev .
docker build -f deploy/docker/Dockerfile.atom   -t rocm/infera:atom-dev .
```

## 基准测试

**Kimi 智能体基准**——这是一个长上下文、多轮编程智能体工作负载，在 MI355X 上运行 Kimi-K2.6-MXFP4，并在固定的单用户交互性 SLA 下，将预填充与解码分离式部署与单节点 TP8 基线进行比较。工作负载定义、拓扑、启动脚本、并发扫描工具、结果和复现步骤位于 [`examples/kimi_agentic_bench/`](https://github.com/AMD-AGI/Infera/blob/main/examples/kimi_agentic_bench/README.md)。

## 与 llm-d、Dynamo 对比

> 调研日期：2026 年 10 月 27 日。以下内容基于 [llm-d 官方仓库与文档](https://github.com/llm-d/llm-d)、[NVIDIA Dynamo 官方仓库与文档](https://github.com/ai-dynamo/dynamo)以及 [Infera 官方仓库与文档](https://github.com/AMD-AGI/Infera)。三个项目仍在快速迭代，具体后端、硬件和功能支持应以各项目最新支持矩阵为准。

### 一句话定位

- **llm-d**：面向 Kubernetes 的生产级分布式推理平台，强调跨加速器支持、可组合的智能路由、分层 KV 缓存、P/D 分离、Wide-EP，以及多租户 QoS、零停机升级、自动扩缩容等 Day-2 运维能力。
- **NVIDIA Dynamo**：面向数据中心规模的模块化推理编排栈，以高性能 Rust 分布式运行时为基础，围绕 NIXL、KVBM、KV 感知路由和 SLA Planner 深度优化 NVIDIA GPU，同时支持 vLLM、SGLang 和 TensorRT-LLM。
- **AMD Infera**：面向 AMD Instinct 与 ROCm 的分布式推理参考方案，聚焦 KV 感知路由、P/D 分离和 KV 分层，并将 AIC、MoRI-IO、Mooncake、vLLM、SGLang 和 ATOM 组合成完整的 AMD 原生路径。

### 核心能力对比

| 维度 | llm-d | NVIDIA Dynamo | AMD Infera |
|---|---|---|---|
| 项目定位 | Kubernetes 优先的生产级分布式推理栈 | 数据中心规模的模块化推理栈 | ROCm 原生的分布式推理参考方案 |
| 主要发起方与治理 | Red Hat、Google Cloud、IBM Research、CoreWeave、NVIDIA 等发起；CNCF Sandbox 项目 | NVIDIA 发起的开放源码项目 | AMD-AGI / AMD 发起 |
| 许可证 | Apache-2.0 | Apache-2.0 | MIT |
| 当前成熟度 | README 标示 v1.0，强调生产部署、Day-2 运维和稳定 v1 配置 API | README 标示 Dynamo 1.0，提供容器、PyPI、Operator、Planner 和完整文档 | README 标示 v0.1，明确定位为基础参考方案，功能仍在建设中 |
| 硬件取向 | 跨厂商：NVIDIA、AMD ROCm、Intel XPU、Google TPU，并列出更多社区加速器 | 以 NVIDIA GPU、CUDA、NVLink/InfiniBand 为主要优化目标 | AMD Instinct 与 ROCm，已在 MI355X 上构建和验证 |
| 推理后端 | vLLM、SGLang；架构文档也列出 TensorRT-LLM | vLLM、SGLang、TensorRT-LLM | vLLM、SGLang、ATOM |
| 对外 API | OpenAI 兼容 API；提供 Batch API，并强调原生 Responses API 状态 | OpenAI 兼容 Frontend，支持多模态、工具调用等场景 | OpenAI API，并通过进程内转换层支持 Anthropic Messages API |
| 智能路由 | Gateway API Inference Extension（GAIE）架构；Proxy 与 Endpoint Picker（EPP）分离，支持 KV、负载、优先级和预测延迟信号 | Frontend 内置路由或 GAIE Endpoint Picker；支持 KV 重叠、活跃块、队列和负载信号，也可独立部署 Router | 内置 Python 或 Rust 路由器，根据 KV 前缀复用率和活跃工作量选择实例；可选 GAIE EndpointPicker |
| P/D 分离 | 通过 EPP 协调 prefill/decode 池；vLLM 使用 NIXL RDMA，SGLang 可使用 Mooncake/NIXL | PrefillRouter 编排；通过 NIXL 在 prefill 与 decode GPU 之间直接传输 KV | 路由器选择 prefill/decode 实例；通过 Mooncake 或 MoRI-IO（AI NIC RDMA）传输 KV |
| Wide-EP / 大型 MoE | 是核心“well-lit path”之一，支持 DP Attention + EP MLP 和面向 rank 的路由 | 可由后端与 Dynamo 拓扑组合实现，重点能力更集中于 P/D、Router、Planner 与 KVBM | README 重点是聚合式、P/D 和多节点拓扑，未把 Wide-EP 列为当前三项核心能力之一 |
| KV 状态索引 | 支持近似和事件驱动的精确全局 KV 索引，供 EPP 路由使用 | Router 可使用 KV 事件，也能在无事件时预测缓存状态；可查询 device、host、disk 和共享缓存层重叠 | 路由器跟踪实例所持前缀；`kvd` 提供外部 KV 缓存查询 |
| KV 分层与卸载 | GPU/加速器 HBM → CPU → 本地 SSD；支持全局索引和从其他实例 CPU 层经 NIXL 拉取 KV | KVBM 覆盖 GPU → CPU → SSD → 远程存储，并与不同推理后端集成 | AIC 将 KV 从 GPU HBM 分层到本地 NVMe 或远程 NFS，使用绕过 CPU DRAM 暂存的直接 GPU 数据路径 |
| 服务发现与控制平面 | Kubernetes CRD：InferencePool、LeaderWorkerSet、DisaggregatedSet；基于 Kubernetes/Gateway API 生态 | Kubernetes 下使用 CRD 与 EndpointSlice；本地/裸机可用 etcd，也支持内存和文件后端 | 工作节点注册到 etcd，或在 Kubernetes 中通过 Pod annotation 注册；Operator 协调 `InferaDeployment` CRD |
| 请求与事件传输 | 数据面交给兼容 L7 Proxy；EPP 通过 `ext-proc` 提供路由决策；引擎遥测进入 Data Layer | 默认 TCP 请求面；事件面默认 ZMQ，也可使用 NATS；本地和 Kubernetes 多数部署无需外部 NATS | 快速开始使用 HTTP 请求传输和 ZMQ KV 事件；支持 etcd/NATS 等组件化部署方式 |
| 自动扩缩容 | KEDA + EPP 指标，支持队列、饱和度、token backlog 和 SLO headroom；具有 SLO 感知自动扩缩容 | Planner 基于实时负载、性能模型和 SLA 自动调整 prefill/decode 副本；Operator 负责执行，AISimulate/Profiler 用于部署前规划 | SLA Planner 计算满足 TTFT/ITL 所需的副本数，但当前只报告建议数量；README 明确说明实际扩缩容由用户完成，未内置 autoscaler |
| 生产运维 | 多租户优先级与公平流控、路由器 HA、P/D 锁步升级、零停机操作、可观测性、批处理 | 优雅排空、请求迁移/取消、Planner、Operator、Profiler、可观测性和故障处理文档较完整 | 支持工作节点自动注册、心跳、排空和零失败扩缩容；整体 Day-2 能力仍处于 v0.1 参考方案阶段 |
| 典型部署入口 | Helm、Kubernetes CRD、Gateway API / OpenShift / 云托管 K8s | 容器、PyPI、DynamoGraphDeploymentRequest、Kubernetes Operator | Docker、pip 源码安装、`InferaDeployment` Operator |

### 三者的共同点

1. **都不取代单机推理引擎。**三者都位于 vLLM、SGLang、TensorRT-LLM 或 ATOM 等引擎之上，负责跨实例的路由、KV 状态和生命周期管理。
2. **都把 KV 缓存视为集群级资源。**它们不仅按当前负载路由，还会考虑前缀缓存位置，以减少重复预填充；同时都提供某种形式的 GPU 外 KV 分层。
3. **都支持预填充与解码分离。**三者都利用预填充偏计算密集、解码偏带宽密集的差异，把两阶段放到不同实例池，并使用高速数据通道传输 KV。
4. **都采用可插拔的多引擎思路。**共同目标是让编排层与具体模型执行引擎解耦，使用户能按模型和硬件选择后端。
5. **都面向长上下文和智能体工作负载。**多轮会话的大型共享前缀、不断增长的上下文以及严格的 TTFT/ITL 目标，是三者优化路由和 KV 复用的主要原因。
6. **都提供 Kubernetes 路径。**三者均可通过 Kubernetes 资源管理工作节点；差别主要在于 Kubernetes 是核心抽象，还是多种部署模式中的一种。

### 最关键的架构差异

#### 1. llm-d：把 Kubernetes 和标准网关作为核心架构

llm-d 的路由器由两部分组成：生产级 L7 Proxy 负责连接、TLS 和转发，Endpoint Picker（EPP）负责 LLM 特定的过滤、评分和目标选择。两者通过 Gateway API Inference Extension 的 `ext-proc` 协议配合，`InferencePool` CRD 则声明后端模型服务器。其优势是可以复用 Envoy、Istio、agentgateway 或云负载均衡器等成熟数据面，并把 KV 感知、优先级、公平性和延迟预测实现为可插拔策略。

llm-d 的 KV 体系分为全局索引、缓存感知路由、分层卸载和 P2P 共享。精确模式消费 vLLM 等引擎产生的 KV 事件，持续跟踪每个块位于哪个 GPU、CPU 或磁盘层；路由器可以把请求发往持有前缀的实例，也可以让目标实例从其他节点的 CPU 层经 NIXL 拉取块，而无需占用源节点的 GPU 预填充能力。

其突出特点是跨硬件与生产运维：官方加速器文档覆盖 NVIDIA、AMD ROCm、Intel XPU 和 Google TPU；v1.0 又强调多租户 QoS、路由器高可用、P/D 锁步升级、会话感知路由、Responses API 状态和批处理。因此，它更接近一个云原生推理平台，而不只是性能组件集合。

#### 2. Dynamo：自带高性能分布式运行时和闭环 Planner

Dynamo 由 Rust `DistributedRuntime` 连接 Frontend、Router、Planner 和工作节点，Python 组件通过绑定复用同一运行时。系统明确分离三个通信平面：服务发现、请求和事件。Kubernetes 部署使用 CRD 与 EndpointSlice；本地或裸机可用 etcd；请求面默认使用直接 TCP 连接，事件面默认使用 ZMQ，二者也可以分别切换到 NATS。

在 P/D 模式中，Frontend 完成 OpenAI 请求预处理和 tokenization，PrefillRouter 根据 KV 重叠度与负载选择预填充节点。预填充节点返回后端特定的传输元数据，解码节点再通过 NIXL 使用 NVLink、InfiniBand/UCX 或 PCIe 执行非阻塞 GPU 到 GPU KV 传输。vLLM、SGLang 和 TensorRT-LLM 使用不同元数据格式，但共享同一个编排模型。

Dynamo 与另外两者相比最显著的组件是 **Planner + AISimulate/Profiler**。Planner 不只是给出副本数量，而是可以根据 TTFT、ITL、队列、吞吐量模型、GPU 预算和工作节点遥测，自动修改预填充与解码池的目标副本数，再由 Operator 执行。Dynamo 1.0 还提供 DGDR 的“模型 + 硬件 + SLA”声明式入口，由性能模型搜索候选配置。因此，它在 NVIDIA 环境中形成了从离线建模、部署规划到在线自动调整的闭环。

KVBM 则把 KV 层级扩展为 GPU、CPU、SSD 和远程存储，并向路由器暴露各层的前缀重叠信号。对重度 NVIDIA 部署而言，NIXL、KVBM、TensorRT-LLM 和 NVLink/NVSwitch 的结合是 Dynamo 的主要差异化优势。

#### 3. Infera：AMD 原生数据通路和较轻量的参考方案

Infera 的三个核心概念与另外两者高度一致：KV 感知路由、P/D 分离和 KV 缓存分层。但它明确从 AMD ROCm 与 Instinct 平台出发，并把 AMD 自身组件组合成参考实现：AIC 负责 GPU HBM、NVMe 和远程 NFS 之间的 KV 分层；MoRI-IO 提供 AI NIC RDMA 通路；Mooncake 也可用于 prefill 到 decode 的 KV 传输；推理后端除 vLLM 和 SGLang 外，还包括 AMD ATOM。

Infera 的 API 范围有一个实用差异：除 OpenAI 接口外，它通过进程内转换层提供 Anthropic Messages API。其工作节点通过 etcd 或 Kubernetes Pod annotation 自动注册并发送心跳，支持 `DRAINING` 排空，实测可在不中断在途生成任务的情况下快速停止接收新请求。

相较于 llm-d 和 Dynamo，Infera 当前更像清晰、可复现、面向 AMD 的参考方案。其 SLA Planner 会计算满足 TTFT 和 ITL 所需的预填充与解码副本数，但 README 明确说明自动调整仍由用户负责。项目路线图也将 v0.1 定义为基础，而非功能完整方案。因此，它的优势是 AMD 路径直接、组件边界清晰、上手链路较短；生产级自动扩缩容、多租户治理和更广泛的 Day-2 能力仍是后续演进重点。

### 选型建议

- **选择 llm-d**：需要跨 NVIDIA、AMD、Intel 或 TPU 的统一 Kubernetes 平台；已经采用 Gateway API、OpenShift、GKE 或成熟 L7 网关；重视多租户 QoS、零停机升级、批处理和 SLO 感知自动扩缩容。
- **选择 Dynamo**：主要运行 NVIDIA GPU，尤其是 NVLink/NVSwitch 与 InfiniBand 集群；希望深度使用 NIXL、KVBM、TensorRT-LLM、自动 Planner、Profiler 和 DGDR；需要从部署前性能搜索到在线扩缩容的闭环。
- **选择 Infera**：主要运行 AMD Instinct/ROCm；希望采用 AIC 的 GPU 到 NVMe/NFS 直接 KV 分层、MoRI-IO 或 Mooncake KV 传输，或需要 ATOM 与 Anthropic Messages API；愿意基于参考方案自行补充自动扩缩容和企业运维能力。
- **只运行单个模型和单个实例时**：三者都可能过重。此时直接使用 vLLM、SGLang、TensorRT-LLM 或 ATOM 通常更简单；只有当出现多实例路由、KV 复用、P/D 分离、分层缓存或 SLA 编排需求时，分布式编排层才体现价值。

### 调研来源

- llm-d：[项目 README](https://github.com/llm-d/llm-d)、[架构](https://llm-d.ai/docs/architecture)、[路由器](https://llm-d.ai/docs/architecture/router)、[KV 缓存管理](https://llm-d.ai/docs/architecture/kv-management)、[分离式服务](https://llm-d.ai/docs/architecture/disaggregation)、[加速器支持](https://github.com/llm-d/llm-d/blob/main/docs/getting-started/accelerators.md)。
- NVIDIA Dynamo：[项目 README](https://github.com/ai-dynamo/dynamo)、[系统架构](https://docs.nvidia.com/dynamo/dev/knowledge-base/concepts/system-architecture/architecture)、[分离式服务](https://docs.nvidia.com/dynamo/dev/knowledge-base/concepts/system-architecture/disaggregated-serving)、[Router](https://docs.nvidia.com/dynamo/components/router)、[KVBM](https://docs.nvidia.com/dynamo/components/kvbm)、[Planner](https://docs.nvidia.com/dynamo/components/planner/planner-guide)。
- AMD Infera：[项目 README](https://github.com/AMD-AGI/Infera)、[官方文档](https://rocm.docs.amd.com/projects/infera/en/latest/)、[功能矩阵](https://rocm.docs.amd.com/projects/infera/en/latest/features/feature_matrix.html)、[兼容性矩阵](https://rocm.docs.amd.com/projects/infera/en/latest/features/compatibility_matrix.html)。

## 文档

完整指南、部署方法和参考资料托管在 **[rocm.docs.amd.com/projects/infera](https://rocm.docs.amd.com/projects/infera/en/latest/)**。

如需在本地构建相同的 Sphinx 手册：

```bash
sudo apt-get install -y graphviz                                  # 安装用于生成图表的 dot
cd manual && pip install -r sphinx/requirements.txt && make html # 打开 _build/html/index.html
```

## 路线图

Infera 当前版本为 v0.1，初始参考方案应被视为基础，而不是功能完整的解决方案。当前限制详见 Infera 的[功能矩阵](https://rocm.docs.amd.com/projects/infera/en/latest/features/feature_matrix.html)和[兼容性矩阵](https://rocm.docs.amd.com/projects/infera/en/latest/features/compatibility_matrix.html)。公开的 [Infera 路线图](https://github.com/AMD-AGI/Infera/issues/9)列出了后续优先事项。

## 许可证

MIT——参见 [LICENSE](https://github.com/AMD-AGI/Infera/blob/main/LICENSE)。© 2026 Advanced Micro Devices, Inc.
