# Infera：通过分布式推理编排提升智能体 AI 的有效吞吐量

> 本文是 [AMD-AGI/Infera README](https://github.com/AMD-AGI/Infera) 的简体中文翻译。

[![CI](https://github.com/AMD-AGI/Infera/actions/workflows/ci.yml/badge.svg)](https://github.com/AMD-AGI/Infera/actions/workflows/ci.yml)
[![Release](https://github.com/AMD-AGI/Infera/actions/workflows/release.yml/badge.svg)](https://github.com/AMD-AGI/Infera/actions/workflows/release.yml)
[![Docs](https://img.shields.io/badge/docs-latest-blue.svg)](https://rocm.docs.amd.com/projects/infera/en/latest/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://github.com/AMD-AGI/Infera/blob/main/LICENSE)

[什么是 Infera？](#什么是-infera) | [主要功能](#主要功能) | [快速开始](#快速开始) | [引擎镜像](#引擎镜像) | [基准测试](#基准测试) | [文档](#文档) | [路线图](#路线图) | [许可证](#许可证)

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
