# vLLM 2026 年第四季度路线图（中文翻译）

> 原文：[Roadmap: vLLM Roadmap Q4 2026](https://github.com/vllm-project/vllm/issues/61024)
>
> 原文发布于 2026 年 10 月 10 日。本文件为中文翻译，技术名称、代码标识符和项目名称保留英文，以官方原文为准。

在 [#32455](https://github.com/vllm-project/vllm/issues/32455) 中，我们把 vLLM 的目标拆分到了不同的特别兴趣小组（Special Interest Group，SIG）。在 [Q3 路线图](https://github.com/vllm-project/vllm/issues/48168)的基础上，下面列出了各个 SIG 的 Q4 路线图。这些 SIG 的定期会议可在 vLLM 公共日历中查看。

## 核心要点

* **智能体工作负载（Agentic Workload）：** Q3 已将 Model Runner V2 设为默认实现，并带来了达到生产可用水平的 Rust 前端和分布式 KV 卸载支持。Q4 将重点降低优化后智能体服务的部署难度，包括提升模型发布首日性能、提供调优后的生产部署方案、采用自适应推测解码、提供更丰富的智能体提示（agent hints），以及增强跨硬件容错能力。
* **生态系统（Ecosystem）：** 我们正在扩展 NVIDIA 和 AMD 平台上的低精度服务与检查点转换能力，加强推测解码和强化学习（RL）集成，并推进 Agentic API 与 vLLM-Omni。对于前沿模型和新硬件，需要建立一条清晰路径，使其从初步支持逐步发展为经过验证和优化的生产配置。
* **开源软件维护（OSS Maintenance）：** 我们正在简化引擎和模型接口，完成量化分派重构，并改善 CI 覆盖率、反馈速度、安全性和性能评估。通过智能体辅助代码审查和更完善的测试质量检查，帮助社区维护持续增长的模型、功能与硬件组合矩阵。

### SIG Core（[会议记录](https://docs.google.com/document/d/1x36yhn655LiuV6bPK2C1M-6jfMzgXDLQf2PIngJndgc/edit?tab=t.0)）

- [ ] 完全移除 Model Runner V1，并解决剩余的 [Model Runner V2 功能缺口](https://github.com/vllm-project/vllm/issues/47172)。
- [ ] 实现[可扩展 KV Cache 支持](https://github.com/vllm-project/vllm/pull/56492)、可插拔的模型 `KVCacheConfigBuilder` 实现，以及针对滑动窗口注意力推测器的更优缓存分组启发式策略。
- [ ] 重构 CUDA Graph：将预填充和解码的图尺寸分开；明确捕获、分派和填充语义，包括自适应验证与序列并行；简化编码器和 DeepSeek V4.1 跳过预填充计算时使用的图。根据填充开销和性能回退情况验证预填充图的尺寸设置。
- [ ] 简化并强化引擎的模型循环、数据并行流程和调度器，同时提高流式输入的可靠性。
- [ ] 通过更清晰的模型接口，降低模型实现与引擎之间的耦合。
- [ ] 推进 Rust 前端成为默认实现，包括解决 Responses API 的就绪度和功能对等要求。
- [ ] 与 Dynamo 合作，通过[前向传播指标](https://github.com/vllm-project/vllm/pull/52061)增加原生的逐步可观测性。

* 前瞻性目标：
  - 通过标准化 KV 布局简化 KV Connector 接口，并探索并行接口。
  - 重新审视自动前缀缓存，研究以预读式 EAGLE 块缓存替代丢弃缓存块的方案。
  - 在当前清理工作的基础上，探索更全面的调度器重新设计。

### SIG Large Scale Serving（[会议记录](https://docs.google.com/document/d/15A9zid75c41pcn8hzIKXOW2R6VFgeUfGuIMq-ebgEEI/edit?tab=t.0#heading=h.prqroxfe0fr1)）

- [ ] 与 Dynamo 和 llm-d 合作，把智能体提示扩展到路由器和 KV Connector，涵盖多租户、缓存层 TTL、文件系统淘汰，以及对预取、淘汰和选择性卸载的请求级控制。
- [ ] 发布生产部署方案，清楚解释部署与性能权衡，包括预填充/解码分离和 KV 卸载。
- [ ] 强化数值故障处理（包括 NaN），并通过重启和缩容恢复专家并行；将恢复能力与 llm-d 和 Dynamo 集成。
- [ ] 在 AMD 及包括 Rubin 和 MI455X 在内的新硬件上，为重点模型实现业界领先的智能体工作负载性能。
- [ ] 与 Dynamo 合作，将原生[前向传播指标](https://github.com/vllm-project/vllm/pull/52061)集成到服务可观测性工作中。

* 拟议工作：确定 AFD 的范围和里程碑。

### SIG Model Performance（[会议记录](https://docs.google.com/document/d/1A1TOuCTPQ_72npOSzhWKfYOmDIF7OoagLGaL8gHe1TQ/edit?tab=t.0#heading=h.wmm9txlfqo9w)）

- [ ] 改善模型发布首日性能，以及从初始模型支持走向优化后的智能体服务配置的工作流程。
- [ ] 继续围绕前沿模型开展集中优化，包括 DeepSeek V4.1、GLM 5.3 和 Qwen3.8，并持续跟踪模型和功能进展。
- [ ] 优化 Vera Rubin 性能并发布可复现的服务方案。
- [ ] 将 FP4 KV Cache 支持扩展到更多模型，并加入磁盘后端 KV 卸载。
- [ ] 继续完善[性能评估仪表板](https://vllm-ci-dashboard.vercel.app/perf)，并与 SIG CI 合作扩大性能回退跟踪范围。

* 待评估提案：将 `vllm-recipes` 纳入主仓库、重构特定模型测试，以及明确弃用 vLLM IR 和自定义 Torch 编译 Pass 的范围与可行性。

### SIG Spec Decode（[会议记录](https://docs.google.com/document/d/1DlgW4dWZyGup_BOZm24Bo50AFIiQgPXfSLqMGDLt6Ic/edit?tab=t.0#heading=h.1efi34fxtsr2)）

- [ ] 改善草稿模型与验证模型之间的 HMA 和异构注意力支持。使采用滑动窗口的草稿模型能够高效组合不同的目标注意力类型，并减少 KV Cache 填充和内存开销。
- [ ] 完善自适应验证，并扩展到 Mamba2、GDN 和 QSA。研究 Oracle 验证，以量化剩余性能空间并指导优化。
- [ ] 将推测模型代码迁移到 Flat Model，随后优化面向低延迟推理的融合和内核，包括拒绝采样。
- [ ] 默认启用块级拒绝采样和概率验证。
- [ ] 最终确定常用草稿算法的 `open-spec-config` 配置细节，并实现草稿模型加载。
- [ ] 改善与工具调用、推理和结构化输出配合使用时的配置易用性与稳健性。默认启用推测解码本身仍属于前瞻性目标。

### SIG CI（[会议记录](https://docs.google.com/document/u/2/d/18VJOuEyAZmRVILWpOtYx5jC4iFZLwjHVw5TAdfJnjXQ/edit?tab=t.0)）

- [ ] 收集测试覆盖率数据，并维护包含预填充/解码分离在内的功能组合矩阵。
- [ ] 通过自动测试选择、pytest 级粒度、自动分片和默认任务超时，将反馈时间缩短到约 30 分钟。
- [ ] 将剩余的四张 L4 作业迁移到 H200 MIG，减少 Docker 构建/拉取和环境配置开销，并淘汰面向旧模型的过时作业。
- [ ] 改进基础设施故障检测、隔离和重试机制，并继续治理不稳定测试。
- [ ] 对 vLLM 执行攻击性安全测试，并使 CI 能够安全地服务于整个 vLLM 生态中的项目。
- [ ] 将性能和准确率评估扩展到分离式服务与 TPU，包括类似 InferenceX 的基准扫描，以及吞吐量/延迟帕累托曲线。
- [ ] 开发智能体辅助审查器和 CI 协调智能体，并加入单元测试质量检查。
- [ ] 明确并记录 RDNA、XPU 和其他加速器的 CI 触发路径与覆盖范围，包括在主仓库之外维护的项目，以减少跨后端破坏。

### SIG Quantization

- [ ] **Rubin 上的 LUT-B（W3A8）：** 最终确定 NVIDIA 格式规范，包括 Tile 尺寸、码本和缩放因子（[Model Optimizer #2204](https://github.com/NVIDIA/Model-Optimizer/issues/2204)、[compressed-tensors #801](https://github.com/vllm-project/compressed-tensors/pull/801)）；提供经过验证的检查点、[LLM Compressor 校准方案](https://github.com/vllm-project/llm-compressor/pull/3018)，以及使用 MXFP8 激活值的优化稠密/MoE 内核。
- [ ] **生产级 FP4 及更低位宽 KV Cache：** 发布重点模型的准确率评估和推荐配置。覆盖长上下文交互式服务与高并发数据生成，并与混合注意力、推测草稿模型、NIXL 分离式服务和分层卸载组合使用。
  - 将 NVFP4 覆盖扩展到 FlashMLA/DSA 稀疏注意力、FA4、Rubin 内核及 [SM8x–SM12x 支持](https://github.com/vllm-project/vllm/pull/46963)。
  - 推进 ROCm 低位宽 KV 工作，包括 [UltraQuant](https://github.com/vllm-project/vllm/pull/57057) 和 [Octave KV 提案](https://github.com/vllm-project/vllm/issues/59773)；针对不同平台分别验证，避免假设一种格式适合所有后端。
- [ ] **检查点重量化：** 通过通用在线量化 API 完成[从任意精度进行在线量化的路线图](https://github.com/vllm-project/vllm/issues/59062)，包括[重量化](https://github.com/vllm-project/vllm/pull/55684)、[激活 QuantKey 覆盖](https://github.com/vllm-project/vllm/pull/51808)、[共享专家](https://github.com/vllm-project/vllm/pull/55686)和 [MLA `kv_b_proj`](https://github.com/vllm-project/vllm/pull/55741)。初期转换包括在 Hopper 和 MI300 上将 MXFP8 转为按通道/块 FP8，以及跨厂商将 FP8/NVFP4 转为 MXFP4。
- [ ] **统一分派与可检查性：** 在 [Quark](https://github.com/vllm-project/vllm/pull/56099)、[ModelOpt MoE](https://github.com/vllm-project/vllm/issues/55339) 和 compressed-tensors 中完成 QuantKey/QuantConfig 的采用。在各类方法中声明权重和激活 QuantKey，完成 [MoE Oracle 和线性内核迁移](https://github.com/vllm-project/vllm/issues/54959)，将 QuantKey 扩展到 `FusedMoEQuantDesc`，并按层类型记录所选内核/后端。
- [ ] **内核整合：** [在 Hopper 上让 Humming 取代 Marlin 成为默认实现](https://github.com/vllm-project/vllm/pull/56997)，随后扩展到 SM10x/SM12x。整合自动调优配置，对功能重叠的 CuTe-DSL、b12x、FlashInfer TRTLLM、Marlin、Qutlass 和 Humming 路径进行基准测试，为不同架构选择默认实现并淘汰已被取代的路径。
- [ ] **压缩生态：** 为重点模型提供发布首日可用的 NVFP4/MXFP4 检查点，推进 [MoNe](https://github.com/vllm-project/vllm/pull/50415) 和 [REAP 专家剪枝](https://github.com/vllm-project/llm-compressor/pull/2906)，并将 `convert_checkpoint` 作为通用格式转换入口。
- [ ] **质量验证：** 增加量化模型准确率 CI、在线量化的张量并行一致性检查，以及与 RL 生态共同完成量化权重重载正确性检查。

* 研究方向：LUT-B 注意力支持；通过 QuTLASS、HIGGS 和 QAD 实现带旋转的 FP4。继续评估[弃用旧格式](https://github.com/vllm-project/vllm/issues/30136)。

### SIG AMD

- [ ] 缩小 ROCm 上前沿模型在预填充、解码、推测解码和长上下文方面的性能差距，优先覆盖 DeepSeek V4/V4.1、Kimi K3、GLM 5.x 和 Qwen3.x。
- [ ] 将稀疏、MLA 和混合注意力模型的上下文并行生产化，并强化预填充/解码分离和 KV 传输。
- [ ] 改善横跨 GPU、主机内存、SSD 和分布式存储的多层 KV 卸载，包括 Mooncake、MoRI/UMBP 和 NIXL 集成。
- [ ] 扩展 AITER 内核及融合的 FP8/MXFP8/FP4/MXFP4 执行路径，实现自动后端选择，并减少 AMD 专用配置要求。
- [ ] 加强 AMD/Quark 发布首日支持：为重点 CDNA 模型提供 FP4 和 FP8-PTPC，为重点 RDNA 模型提供 INT4 及其他低位宽格式。与 SIG Quantization 协调在线重量化和灵活的激活 QuantKey 覆盖。
- [ ] 推进 ROCm 上的 UltraQuant 和 MXFP4 KV Cache/注意力支持，并为重点模型支持 MTP、EAGLE 和 DFlash，包括量化草稿头。
- [ ] 将 MI355X 维持为主要性能平台，同时缩小 MI300X/MI325X 差距，在适用场景扩展 RDNA 支持，并改善 AMD CI 对等性、性能回退覆盖和 ROCm 发布就绪度。与 SIG CI 共同记录 RDNA 验证和 CI 触发路径。

### SIG Agentic API

- [ ] 交付[多智能体 API](https://github.com/vllm-project/agentic-api/issues/298)。
- [ ] 增加[代码解释器工具](https://github.com/vllm-project/agentic-api/issues/308)。
- [ ] 使用[共享 Rust 前端库](https://github.com/vllm-project/agentic-api/issues/359)直接调用 vLLM 引擎进行推理。
- [ ] 增加[文件搜索工具](https://github.com/vllm-project/agentic-api/pull/278)。

### vLLM-Omni

- [ ] 继续优化包括 MiniMax H3 在内的前沿扩散模型。
- [ ] 与 RL 框架集成，包括以 ve-omni 作为训练框架与 verl 集成。
- [ ] 扩展加速后端和框架集成，包括 FastVideo。
- [ ] 完成[全双工重新设计](https://github.com/vllm-project/vllm-omni/issues/7181)，延续 Q3 的原型验证工作。

### RL 生态系统

- [ ] 执行 [Q4 vLLM × RL 路线图](https://github.com/vllm-project/vllm/issues/58990)：权重更新、训练—推理一致性，以及面向 RL 的 LoRA 等功能支持。
- [ ] 改善新模型发布首日的 RL 支持。
- [ ] 重构权重更新，并推进辅助 Connector 设计，从架构层面解决正确性问题，包括与 SIG Quantization 共同支持量化权重重载。

---

欢迎留下反馈和评论，并直接与相应 SIG 领域合作，以开展更深入的协作。
