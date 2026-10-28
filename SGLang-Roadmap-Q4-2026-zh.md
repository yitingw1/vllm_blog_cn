# SGLang 2026 年第四季度开发路线图（中文翻译）

> 原文：[Development Roadmap (2026 Q4) · sgl-project/sglang #42473](https://github.com/sgl-project/sglang/issues/42473)
>
> 本文是对 SGLang 官方路线图的非官方简体中文翻译。项目名称、API、缩写以及部分技术术语保留英文，以便与代码和上游 Issue 对照。

欢迎贡献与反馈。可加入 [SGLang Slack](https://slack.sglang.ai) 参与讨论。

## 重点方向

- **易用性（Usability）**：为单引擎和大规模部署提供简单的启动命令，并为常用模型提供易用的 Cookbook 和 Docker 镜像。
- **面向智能体的原生开发（Agent-native development）**：建设自动审查机器人、自动 PR shepherd 机器人，推进模块化以及完整的 Rust 重写。
- **极致性能（Extreme performance）**：开发 Megakernel、低延迟内核、通信与计算重叠内核，并消除 CPU 开销。
- **功能兼容性（Feature compatibility）**：让 HiCache、推测解码、预填充—解码分离（P/D disaggregation）等高级功能可以相互组合使用。
- **多硬件支持（Multi-hardware support）**：支持灵活的多硬件抽象和树外（out-of-tree）开发。

## 易用性

### 部署与 Cookbook

- **Slack**：[`#dev`](https://sgl-fru7574.slack.com/archives/C07PEP77X6F)
- **目标**：简化单引擎和大规模部署的启动命令；使 Docker 镜像、Cookbook 示例和基准测试与当前的模型支持及版本发布保持一致。
- **Issue**：[SGLang Cookbook 社区贡献路线图 · sgl-cookbook #16](https://github.com/sgl-project/sgl-cookbook/issues/16)
- **TODO**：更新第四季度的部署与 Cookbook 路线图，并确认概念验证（PoC）负责人。

### 面向智能体的原生开发

- **目标**：改进自动代码审查与 PR shepherd 流程；继续对运行时及其扩展接口进行模块化，让变更更容易开发、审查和验证。
- **TODO**：为开发自动化和模块化工作增加第四季度跟踪 Issue 及 PoC。

## 基础功能重构与改进

### 调度器重构

- **PoC**：[@hnyls2002](https://github.com/hnyls2002)
- **Slack**：[`#dev`](https://sgl-fru7574.slack.com/archives/C095B2L7UEB)、[`#spec-decoding`](https://sgl-fru7574.slack.com/archives/C09KELDAD8U)
- **目标**：让调度器无状态化；在所有情况下实现零 CPU 开销；用 Rust 重写调度器。
- **Issue**：
  - [[Feature] Overlap Spec Support #11762](https://github.com/sgl-project/sglang/issues/11762)
  - [[Feature] Mixed ChunkPrefill Optimization Roadmap #13626](https://github.com/sgl-project/sglang/issues/13626)
- **TODO**：更新第四季度调度器路线图。

### KV Cache 管理

- **PoC**：[@ispobock](https://github.com/ispobock)、[@hzh0425](https://github.com/hzh0425)、[@xiezhq-hermann](https://github.com/xiezhq-hermann)
- **Slack**：[`#kv-cache-store`](https://sgl-fru7574.slack.com/archives/C095B2L7UEB)、[`#hybrid-model`](https://sgl-fru7574.slack.com/archives/C0AAC18MHQQ)
- **目标**：改进智能体工作负载的 KV Cache 调度；扩展分层缓存复用和混合模型支持；提高与 HiSparse 的兼容性。
- **Issue**：[Agentic Cache Scheduling System Roadmap (Q4) #43098](https://github.com/sgl-project/sglang/issues/43098)

### 推测解码

- **PoC**：[@Qiaolin-Yu](https://github.com/Qiaolin-Yu)
- **Slack**：[`#spec-decoding`](https://sgl-fru7574.slack.com/archives/C09KELDAD8U)
- **目标**：改进算法和计算图抽象；完成重叠执行与约束解码的兼容；扩展自适应策略和并行推测解码。
- **具体方向**：
  - 自适应推测解码：[[Roadmap] Adaptive Speculative Decoding Roadmap #23705](https://github.com/sgl-project/sglang/issues/23705)
  - 并行推测解码：[[Roadmap] Parallel Speculative Decoding Roadmap #27462](https://github.com/sgl-project/sglang/issues/27462)
  - 更好地集成 SpecForge。
  - 更好地兼容不同并行策略，例如流水线并行（PP）。
  - 降低小模型的 CPU 开销。
  - 融合元数据准备和采样路径中的内核。
  - N-gram：[[Roadmap] Further Ngram Speculative Decoding Support #21052](https://github.com/sgl-project/sglang/issues/21052)
  - DSpark：[[Tracking] DSpark in SGLang: roadmap #30344](https://github.com/sgl-project/sglang/issues/30344)

### 预填充—解码分离（P/D Disaggregation）

- **PoC**：[@ShangmingCai](https://github.com/ShangmingCai)
- **Slack**：[`#pd-disaggregation`](https://sgl-fru7574.slack.com/archives/C08AP4WU8P3)
- **目标**：在统一传输层之后统一各种传输协议；增强 KVCache 存活性，并将解码 KV 的预分配移到主机内存；改善路由器协调，以复用智能体请求前缀。
- **Issue**：
  - [[Roadmap] Prefill-Decode Disaggregation Roadmap (2026 Q4) #43699](https://github.com/sgl-project/sglang/issues/43699)
  - [[Tracking] PD disaggregation shared-protocol unification #34510](https://github.com/sgl-project/sglang/issues/34510)

### API 服务器

- **PoC**：[@alexnails](https://github.com/alexnails)、[@rainj-me](https://github.com/rainj-me)
- **Slack**：[`#sglang-grpc-rfc-22558`](https://sgl-fru7574.slack.com/archives/C0ATAE18PS8)、[`#rust-migration`](https://sgl-fru7574.slack.com/archives/C0ATDERV4BS)
- **目标**：改进 Rust API Server 前端；补齐 API 和流式处理能力；减少请求路径开销并推进原生 gRPC 集成。
- **Issue**：
  - [[RFC] Native gRPC Server for SGLang in Rust #22558](https://github.com/sgl-project/sglang/issues/22558)
  - [[RFC] Sglang non-GPU process rust migration #23206](https://github.com/sgl-project/sglang/issues/23206)
- **TODO**：更新 API 路线图，使 gRPC 计划与 Rust 前端保持一致。

### Rust 迁移

- **PoC**：[@ishandhanani](https://github.com/ishandhanani)、[@rainj-me](https://github.com/rainj-me)
- **Slack**：[`#rust-migration`](https://sgl-fru7574.slack.com/archives/C0ATDERV4BS)
- **目标**：完成 Rust 前端的兼容性和性能验证；默认启用 Rust 前缀树后端；继续推进更广泛的运行时迁移。
- **Issue**：
  - [[RFC] Sglang non-GPU process rust migration #23206](https://github.com/sgl-project/sglang/issues/23206)
  - [[Roadmap] Unified Hybrid Radix Cache Refactor #20415](https://github.com/sgl-project/sglang/issues/20415)
- **TODO**：明确第四季度调度器及其余组件的迁移计划。

## 并行策略

### 流水线并行（Pipeline Parallelism）

- **PoC**：[@ShangmingCai](https://github.com/ShangmingCai)
- **Slack**：[`#pipeline-parallel`](https://sgl-fru7574.slack.com/archives/C09J7BY42PP)
- **目标**：测量并减少流水线气泡；完成 PP 与推测解码的兼容；将 PP 扩展到角色切换、预填充完成分配，以及交错式 PP × CP。
- **Issue**：[[Roadmap] Pipeline Parallelism Roadmap (2026 Q4) #43885](https://github.com/sgl-project/sglang/issues/43885)

### 专家并行（Expert Parallelism）

- **Slack**：[`#expert-parallel`](https://sgl-fru7574.slack.com/archives/C09QRUHFJTE)
- **目标**：完成 MoE 后端统一；改善通信与计算重叠；扩展弹性伸缩、故障恢复以及 MoonEP 的生产支持。
- **Issue**：
  - [[Roadmap] MoE Refactor #8715](https://github.com/sgl-project/sglang/issues/8715)
  - [[MoonEP] Kimi-K3 production integration roadmap #35783](https://github.com/sgl-project/sglang/issues/35783)
  - [[RFC] Orchestrator-facing Elastic EP lifecycle contract #35376](https://github.com/sgl-project/sglang/issues/35376)
- **弹性并行 PR**：
  - [[Feat] elastic-ep: Runtime scale-down that retires EP ranks via Mooncake deactivate_ranks #33111](https://github.com/sgl-project/sglang/pull/33111)
  - [[4/N] elastic-ep: Scale at DP-attention replica granularity #33728](https://github.com/sgl-project/sglang/pull/33728)
- **TODO**：更新第四季度 MoE/EP 路线图。

### 数据并行注意力（DP Attention）

- **目标**：调整面向工作负载的路由默认值；通过全局 KV 索引器保持 DP Rank 的缓存局部性，并改善各 Rank 的负载报告。
- **Issue**：
  - [[Feature] Load Balance Refactor for DP-Attention #16080](https://github.com/sgl-project/sglang/issues/16080)
  - [[Roadmap] SGLang's new lightweight SessionAware Router module for bucket-based PD serving #25760](https://github.com/sgl-project/sglang/issues/25760)
- **TODO**：更新第四季度 DP Attention 路线图。

### 上下文并行（Context Parallelism）

- **PoC**：[@Fridge003](https://github.com/Fridge003)、[@kpham-sgl](https://github.com/kpham-sgl)、[@ShangmingCai](https://github.com/ShangmingCai)、[@ch-wan](https://github.com/ch-wan)
- **Slack**：[`#context-parallel`](https://sgl-fru7574.slack.com/archives/C0ANLRB8QK0)
- **目标**：扩展预填充和解码注意力后端的覆盖范围；完成分片 KV 和线性注意力支持；改善 CP 与 HiCache、P/D 分离和推测解码的兼容性。
- **Issue**：
  - [[Roadmap] Prefill Context Parallelism (2026 Q4) #21788](https://github.com/sgl-project/sglang/issues/21788)
  - [[Roadmap] Prefill Context Parallel Refactor #27252](https://github.com/sgl-project/sglang/issues/27252)
  - [[Roadmap][DCP] Decode Context Parallelism & Helix Parallelism (2026 Q4) #29736](https://github.com/sgl-project/sglang/issues/29736)
- **TODO**：更新第四季度 CP 路线图。

### 分布式权重数据并行（Distributed Weight Data Parallelism，DWDP）

- **PoC**：[@yuhao318](https://github.com/yuhao318)
- **目标**：优化专家权重预取和内存使用；扩展模型及服务模式覆盖范围。
- **Issue**：[[Feature] Distributed Weight Data Parallelism (DWDP) for Sparse MoE Models #22084](https://github.com/sgl-project/sglang/issues/22084)
- **TODO**：围绕已经落地的实现更新 DWDP 路线图。

## 多模态

### 扩散与多模态生成

- **Slack**：[`#diffusion`](https://sgl-fru7574.slack.com/archives/C09P0HTKE6A)
- **目标**：
  - 聚焦 MiniMax-H3。
  - 在不改变输出结果的前提下，让通信与计算重叠并融合内核，同时给出经过验证的 GB200/GB300 配置方案。
  - 使用稀疏注意力、少步蒸馏以及 FP8/NVFP4，加速带质量门控的 `high` 档位。
  - 在 RTX 4090、5090 和 PRO 6000 上避免 OOM，并达到至少不低于 ComfyUI 的速度。
  - 开箱即用地服务大多数社区 H3 变体，包括 GGUF、量化和 LoRA 版本。
  - 为音视频输出增加批处理和分离式服务支持。
- **Issue**：[SGLang-Diffusion Roadmap (2026 Q4) #43313](https://github.com/sgl-project/sglang/issues/43313)

### MLLM、VLM 与多模态感知

- **Slack**：[`#multi-modal`](https://sgl-fru7574.slack.com/archives/C087RGPBC81)
- **目标**：完成普通服务和 EPD 的处理器缓存复用；以 Kimi-K3 和 GLM-5.3 为主要工作负载，持续修复正确性和稳定性问题；优化 NVLink 和 MNNVL 部署中的预处理、特征传输、ViT 执行和 GPU 内存使用；确保改进不依赖特定模型，并用真实权重服务基准、智能体工作负载和清晰文档进行验证。
- **Issue**：[MLLM Roadmap (2026 Q4) #43314](https://github.com/sgl-project/sglang/issues/43314)

### SGLang Omni

- **PoC**：[@zhaochenyang20](https://github.com/zhaochenyang20)、[@FrankLeeeee](https://github.com/FrankLeeeee)、[@rwang5203](https://github.com/rwang5203)
- **仓库**：[sgl-project/sglang-omni](https://github.com/sgl-project/sglang-omni)
- **Issue**：[SGLang-Omni Roadmap #1081](https://github.com/sgl-project/sglang-omni/issues/1081)
- **目标**：
  - 为新的 Omni、UMM 和音频生成模型提供 Day-0 服务支持，并降低新模型集成成本。
  - 推广 CUDA Graph 和编译阶段优化；改善 TTS、ASR 和 Qwen3-Omni 的服务性能与默认配置：[`TTS` #1754](https://github.com/sgl-project/sglang-omni/issues/1754)、[`Qwen3-Omni` #2362](https://github.com/sgl-project/sglang-omni/issues/2362)。
  - 改进各阶段可观测性、Token 级跟踪，以及流式与音频质量监控。
  - 完成原生全双工模型集成和会话批处理；扩展流式延迟及质量/性能 CI：[[Roadmap] Full Duplex #1909](https://github.com/sgl-project/sglang-omni/issues/1909)。
  - 使用 Miles 扩展完成结构化音频 Rollout 以及训练—推理一致性： [RL support roadmap for SGLang-Omni #780](https://github.com/sgl-project/sglang-omni/issues/780)。
  - 在原生 SRT 和 `multimodal_gen` 上完成 Cosmos 3 Nano、Edge 和 Super 服务：[[Roadmap] Cosmos 3 Model Support, Serving, and Scale #1864](https://github.com/sgl-project/sglang-omni/issues/1864)。
  - 添加可复用的 UMM 控制器，用于交错推理与生成；从 Cosmos 3 开始，再扩展到 BAGEL 和 SenseNova：[[RFC] Cosmos 3 Native Serving and Interleaved Generation #2183](https://github.com/sgl-project/sglang-omni/issues/2183)。

## 硬件

### 通用多硬件抽象

- **PoC**：[@alexnails](https://github.com/alexnails)
- **目标**：改进平台能力检查以及树外后端兼容性。
- **Issue**：[RFC: Capability-based device gating for CUDA-compatible OOT platforms #42173](https://github.com/sgl-project/sglang/issues/42173)
- **TODO**：明确更全面的第四季度平台与树外集成计划。

### NVIDIA 协作

- **Issue**：[NVIDIA Collaboration Roadmap (2026 Q2) #22960](https://github.com/sgl-project/sglang/issues/22960)
- **TODO**：更新第四季度 NVIDIA 协作路线图。

### AMD 扩展与优化

- **PoC**：[@HaiShaw](https://github.com/HaiShaw)
- **Slack**：[`#amd`](https://sgl-fru7574.slack.com/archives/C09TPAM1N68)
- **目标**：支持 MI45x 和 Helios；推进分布式服务、MoRI-EP 以及 HiCache/HiSparse 兼容性；优化内核与量化。
- **Issue**：[AMD Development Roadmap (2026 Q4) #46462](https://github.com/sgl-project/sglang/issues/46462)

### TPU

- **PoC**：[@hlFu](https://github.com/hlFu)
- **基于 TorchTPU 的方案**：TODO——增加第四季度跟踪 Issue。
- **基于 JAX 的方案**：[Development Roadmap (2026 Q3) · sglang-jax #1460](https://github.com/sgl-project/sglang-jax/issues/1460)
- **Slack**：[`#dev-jax-tpu`](https://sgl-fru7574.slack.com/archives/C09EBE5HT5X)
- **目标**：改进主机—设备传输、P/D 与 HiCache 兼容性，以及 TPU 内核性能。

### NPU

- **PoC**：[@iforgetmyname](https://github.com/iforgetmyname)
- **Issue**：[NPU Development Roadmap (2026 H2) #25598](https://github.com/sgl-project/sglang/issues/25598)
- **TODO**：确认下半年路线图中剩余的第四季度里程碑。

### Intel CPU/XPU

- **PoC**：[@mingfeima](https://github.com/mingfeima)
- **CPU（2026 Q4）**：[[Roadmap] Intel CPU (Xeon) Backend Optimization (2026 Q4) #44675](https://github.com/sgl-project/sglang/issues/44675)
- **XPU（2026 Q4）**：[[Roadmap] Intel GPU (XPU) Backend Optimization (2026 Q4) #44674](https://github.com/sgl-project/sglang/issues/44674)

## 内核

### 内核优化

- **PoC**：[@BBuf](https://github.com/BBuf)
- **目标**：
  - 使用低延迟内核、Megakernel、通信—计算重叠及量化融合，改善预填充、解码和推测验证性能。
  - 在端到端分析指导下，持续优化 DeepSeek-V4.1-Flash、Kimi-K3 和 GLM-5.3-Flash 等模型的性能关键内核。
  - 继续集成由智能体开发的 KDA 和 Cake 高性能内核；通过正确性与性能验证后，在适合的硬件和工作负载上自动启用。
  - 持续优化 RTX PRO 6000 和 DGX Spark 等本地推理硬件上的模型内核。
  - 简化内核分派、合并重复实现，并在 `sglang.kernels` 下维护清晰、可复用的 API。
  - 通过贴近实际的内核基准和端到端模型测试验证改进，覆盖正确性、延迟、吞吐量和 CUDA Graph 兼容性。

## 可靠性与可观测性

### 调试与正确性工具

- **目标**：将张量转储扩展到 CUDA Graph 执行；在各种受支持的传输布局和并行配置中强化 P/D 校验和验证。
- **PR**：
  - [Feat/cuda graph tensor dump #38439](https://github.com/sgl-project/sglang/pull/38439)
  - [[Fix] disaggregation: Clean-up and optimize the KV checksum implementation #39729](https://github.com/sgl-project/sglang/pull/39729)

### 单请求跟踪与缓存诊断

- **目标**：补齐推测解码和多模态路径的跟踪；改善跨缓存层级的 HiCache 故障分类和请求级诊断。
- **Issue**：
  - [[Roadmap] roadmap of request tracing (2025 Q4 and 2026 Q1) #13511](https://github.com/sgl-project/sglang/issues/13511)
  - [[Feature] Enhanced KV Cache Observability: Full-Lifecycle Metrics and Diagnostics #35808](https://github.com/sgl-project/sglang/issues/35808)
- **TODO**：更新第四季度请求跟踪路线图。

### 引擎快速恢复

- **PoC**：[@liusy58](https://github.com/liusy58)、[@QiuMike](https://github.com/QiuMike)、[@alexnails](https://github.com/alexnails)
- **目标**：扩大权重缓存支持的模型和量化范围；改善多节点恢复、权重更新和守护进程生命周期管理；进一步减少剩余启动开销。
- **Issue**：[[Roadmap] Fast Engine Recovery: Weight Cache Daemon #33522](https://github.com/sgl-project/sglang/issues/33522)

## 强化学习框架集成

### Miles

- **PoC**：[@yueming-yuan](https://github.com/yueming-yuan)、[@fzyzcjy](https://github.com/fzyzcjy)
- **仓库**：[radixark/miles](https://github.com/radixark/miles)
- **目标**：消除剩余的 MoE 训练—推理不一致；在 TP/EP/PP 之间扩展 SGLang—Megatron 一致性；为扩散模型、Omni 和 dLLM 扩展共享 Rollout 接口；支持 Rollout 与训练之间的弹性调度；改善长周期智能体训练。
- **Issue**：[[Roadmap] 2026 H2 Roadmap · radixark/miles #2853](https://github.com/radixark/miles/issues/2853)

### slime、verl 与 AReaL

- **PoC**：[@zhaochenyang20](https://github.com/zhaochenyang20)
- **仓库**：[slime](https://github.com/THUDM/slime)、[verl](https://github.com/verl-project/verl)、[AReaL](https://github.com/areal-project/AReaL)
- **目标**：维持 SGLang 作为一等 Rollout 后端的地位；围绕权重同步、采样和 Logprob 语义收敛出稳定的 Rollout Engine API；补齐路由重放、低精度 Rollout、确定性推理和离策略修正方面的框架差距。

## Multi-LoRA 服务

- 支持更多模型；改善预填充和解码性能；完成 DP Attention 兼容性以及用于 Miles RL 的分布式 Adapter 更新；简化稠密和 MoE LoRA 执行。
- **PoC**：[@yushengsu-thu](https://github.com/yushengsu-thu)
- **Issue**：[[Roadmap] LoRA (2026 Q2) #25095](https://github.com/sgl-project/sglang/issues/25095)
- **TODO**：更新第四季度 LoRA 路线图。

## 模型覆盖

### 主要模型 Day-0 支持

- 为所有主要模型提供 Day-0 模型支持。
- **PoC**：[@wisclmy0611](https://github.com/wisclmy0611)、[@JustinTong0323](https://github.com/JustinTong0323)
- **Slack**：[`#dev`](https://sgl-fru7574.slack.com/archives/C07PEP77X6F)

### 扩散语言模型（dLLM）

- **PoC**：[@rwang5203](https://github.com/rwang5203)
- **目标**：让 dLLM 默认可以在 LLM Runtime 上启动；强化流式处理、取消操作和缓存正确性；扩大重叠调度、预填充和 CUDA Graph 的覆盖范围。增加 Dream、Nemotron Labs Diffusion、Fast-dLLM v2、单请求采样以及 DiffusionGemma 决策原语，并通过每日质量与性能 CI 验证。
- **Issue**：[[Roadmap] SGLang dLLM Serving #39499](https://github.com/sgl-project/sglang/issues/39499)

### 决策模型（Decision Models）

- **TODO**。

## CI、发布与维护

### CI 稳定性与回归覆盖

- **PoC**：[@alisonshao](https://github.com/alisonshao)、[@Kangyan-Zhou](https://github.com/Kangyan-Zhou)
- **Slack**：[`#ci-cd-build-release`](https://sgl-fru7574.slack.com/archives/C09HCG2HM1T)
- **目标**：提高稳定性并减少不稳定测试；扩大模型及功能组合覆盖范围；完成剩余的基于基线的回归检查，并保持基准比较一致。
- **Issue**：
  - [[CI Infrastructure] Roadmap: Regression-Based CI Checks #21157](https://github.com/sgl-project/sglang/issues/21157)
  - [[Tracking] SGLang CI/CD Test Coverage Improvements - Q2 2026 Roadmap #20847](https://github.com/sgl-project/sglang/issues/20847)
- **TODO**：更新这两份第四季度路线图；重新审核模型/配置覆盖范围以及剩余的回归检查缺口。

### 测试与 CI 维护

- **目标**：继续逐步清理测试并共享 CI 调度；在保留有意义的正确性和硬件检查的同时减少重复覆盖。
- **Issue**：[[RFC] Incremental test cleanup, CI taxonomy, and shared diffusion dispatch #37405](https://github.com/sgl-project/sglang/issues/37405)
