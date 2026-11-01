import{j as e}from"./index-ChgiYNvj.js";import{B as i}from"./BlogPostLayout-C3GCbov8.js";function r({name:t,alt:n,children:a}){const s=`/images/step-5-preview/${t}.png`;return e.jsxs("figure",{className:"not-prose my-8",children:[e.jsx("a",{href:s,target:"_blank",rel:"noreferrer",className:"block overflow-hidden rounded-xl border border-border bg-white focus-visible:outline-2 focus-visible:outline-primary","aria-label":`Open full-size figure: ${n}`,children:e.jsx("img",{src:s,alt:n,className:"block h-auto w-full",loading:t.startsWith("serving-")?"eager":"lazy"})}),e.jsx("figcaption",{className:"mt-3 text-sm leading-relaxed text-muted-foreground",children:a})]})}function o(t){const n={a:"a",code:"code",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(n.p,{children:`An AI agent often needs several steps to finish a job. When fixing a bug, it may
read code, run tests, inspect errors, and try again, adding information that it
may need later. As that history grows, the model has more to read before it can
respond, while the GPUs must keep up with other users running their own tasks.`}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:`Step 5 Preview has already been served in production with SGLang’s inference engine
and routing layer.`}),` Alongside this production serving work, SGLang and Miles
provide day-0 inference and reinforcement learning support for Step 5 Preview.
On four GB300 GPUs, at an MTP acceptance length of 2.85, FlashInfer TRT-LLM MoE
decodes a single request at about `,e.jsx(n.strong,{children:"299 tokens/s"}),`, and MegaMoE reaches about
`,e.jsx(n.strong,{children:"740 output tokens/s per GPU"}),` at 64 concurrent requests.
Miles also demonstrates a 79-step GRPO training run, detailed below.`]}),`
`,e.jsx(r,{name:"serving-latency",alt:"Step 5 Preview on four GB300 GPUs: per-user decode speed with FlashInfer TRT-LLM MoE at 1, 4 and 8 concurrent requests",children:e.jsx(n.p,{children:`Low latency with FlashInfer TRT-LLM MoE: per-user decode speed at 1 to 8
concurrent requests on 4× GB300 (TP4). Time to first token is for a single
request with an 8K-token prompt.`})}),`
`,e.jsx(r,{name:"serving-throughput",alt:"Step 5 Preview on four GB300 GPUs: output throughput per GPU with MegaMoE at 8 to 64 concurrent requests",children:e.jsx(n.p,{children:`High throughput with MegaMoE: output throughput per GPU at 8 to 64 concurrent
requests on 4× GB300 (TP4). Prefill throughput is for one 128K-token prompt
(prompt tokens / time to first token / 4 GPUs). Both figures: FP8 routed
experts (BF16 in the last three MoE layers), BF16 KV cache, MTP at an
acceptance length of 2.85, about 8K input and 768 to 1,280 output tokens, public
text, no prefix-cache hits.`})}),`
`,e.jsx(n.h2,{children:"Get Started"}),`
`,e.jsxs(n.p,{children:["Follow the ",e.jsx(n.a,{href:"https://docs.sglang.io/cookbook/autoregressive/StepFun/Step-5-Preview",children:"SGLang Cookbook"}),`
for setup instructions, then launch Step 5 Preview with:`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-bash",children:`sglang serve \\
  --trust-remote-code \\
  --model-path stepfun-ai/Step-5-Preview \\
  --tp 4 \\
  --moe-runner-backend flashinfer_trtllm \\
  --attention-backend fa4 \\
  --page-size 64 \\
  --kv-cache-dtype bfloat16 \\
  --mem-fraction-static 0.9 \\
  --swa-full-tokens-ratio 0.03 \\
  --chunked-prefill-size 16384 \\
  --max-running-requests 64 \\
  --cuda-graph-backend-prefill breakable \\
  --flashinfer-allreduce-fusion-backend trtllm \\
  --speculative-algorithm EAGLE \\
  --speculative-num-steps 3 \\
  --speculative-eagle-topk 1 \\
  --speculative-num-draft-tokens 4 \\
  --enable-multi-layer-eagle \\
  --reasoning-parser step5 \\
  --tool-call-parser step5 \\
  --host 0.0.0.0 \\
  --port 30000
`})}),`
`,e.jsxs(n.p,{children:[`For reinforcement learning and post-training, follow the
`,e.jsx(n.a,{href:"https://miles.radixark.com/docs/models/stepfun/step5",children:"Miles Cookbook"}),"."]}),`
`,e.jsx(n.h2,{children:"Overview"}),`
`,e.jsxs(n.p,{children:["Step 5 Preview combines ",e.jsx(n.strong,{children:"600B total parameters with 27B active per token"}),`,
`,e.jsx(n.strong,{children:"a 1M-token context window"}),", and ",e.jsx(n.strong,{children:"image input"}),`. Its main architectural choices
address different parts of agent workloads: sparse experts limit the computation
used for each token, hybrid attention controls how much history each layer reads,
and three multi-token prediction (MTP) layers support speculative decoding.`]}),`
`,e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:"Model feature"}),e.jsx(n.th,{children:"Configuration"}),e.jsx(n.th,{children:"What it enables"})]})}),e.jsxs(n.tbody,{children:[e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"Sparse MoE"}),e.jsx(n.td,{children:"600B total parameters, 27B active; 8 of 352 routed experts plus one shared expert"}),e.jsx(n.td,{children:"Uses a subset of the model for each token"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"Long context"}),e.jsx(n.td,{children:"Up to 1M tokens"}),e.jsx(n.td,{children:"Room for documents, code, and accumulated task history"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"Image input"}),e.jsx(n.td,{children:"Text and images"}),e.jsx(n.td,{children:"Includes screenshots and visual material in a request"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"Hybrid attention"}),e.jsx(n.td,{children:"3 sliding-window layers followed by 1 sparse layer; 92 layers total"}),e.jsx(n.td,{children:"Combines recent context with selected older information"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"MTP"}),e.jsx(n.td,{children:"3 prediction layers"}),e.jsx(n.td,{children:"Proposes multiple tokens for verification together"})]})]})]}),`
`,e.jsx(n.h3,{children:"Hybrid Attention"}),`
`,e.jsx(n.p,{children:`A long-running agent needs both the latest tool result and information from
much earlier in the task. Reading the full history in every layer would add
work as that history grows. Step 5 Preview instead combines a short recent
window with selective access to older context, giving the serving system less
attention work to perform than reading the entire history in every layer.`}),`
`,e.jsxs(n.p,{children:["Three out of every four layers read the ",e.jsx(n.strong,{children:"most recent 512 tokens"}),`. The fourth
scores summaries of `,e.jsx(n.strong,{children:"8-token blocks"})," and selects up to ",e.jsx(n.strong,{children:`512 historical
blocks`}),`, then reads the individual tokens in those blocks and the current
block. This is how the model reaches back into earlier context while keeping
most layers focused on recent information.`]}),`
`,e.jsx(r,{name:"attention-layout",alt:"Step 5 Preview architecture with three sliding-window layers followed by one sparse attention layer",children:e.jsx(n.p,{children:`Step 5 Preview repeats a group of three sliding-window attention layers and
one sparse attention layer. Local layers read the most recent 512 tokens. In
each sparse layer, an indexer scores 8-token blocks, and attention reads
token-level keys and values from up to 512 selected historical blocks plus
the current block.`})}),`
`,e.jsx(n.h2,{children:"SGLang Day-0 Support"}),`
`,e.jsx(n.p,{children:`For an application team, the serving challenge has two parts: keep responses
fast as more users arrive, and avoid processing the same task history again
when an agent takes its next step. SGLang addresses these through sparse
attention kernels from StepFun, a choice of MoE backends, and routing that takes
cached context into account.`}),`
`,e.jsx(n.h3,{children:"Kernels from StepFun"}),`
`,e.jsx(n.p,{children:`StepFun developed optimized kernels for Step 5 Preview's sparse attention and
contributed them to SGLang for this release. We thank the StepFun team for these
kernels, for their support of the open-source community, and for working closely
with us to bring them into SGLang to run optimally on NVIDIA GPUs from Day 0:`}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Sparse prefill:"})," Gathers the blocks selected by the indexer for a whole batch into one shared set, then runs attention over that set using per-query masks."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Sparse decode:"})," Runs decode attention over only the selected blocks, splitting long KV histories into partitions and merging the partial results."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Indexer scoring:"})," Scores each query directly against compressed history stored in SGLang's paged cache, for both prefill and decode."]}),`
`]}),`
`,e.jsx(n.h3,{children:"Performance"}),`
`,e.jsxs(n.p,{children:[`SGLang offers two MoE backends for Step 5 Preview, each suited to a different
traffic pattern. `,e.jsx(n.strong,{children:"FlashInfer TRT-LLM MoE"}),` delivers strong low-latency
performance at small concurrency: a single request decodes at about
`,e.jsx(n.strong,{children:"299 tokens/s"}),". ",e.jsx(n.strong,{children:"MegaMoE"}),` delivers higher throughput as concurrency grows:
at `,e.jsx(n.strong,{children:"64 concurrent requests"})," it produces about ",e.jsx(n.strong,{children:"740 output tokens/s per GPU"}),`,
and it prefills a 128K-token prompt at about `,e.jsx(n.strong,{children:"11,440 tokens/s per GPU"}),`,
averaged over the full prompt. Decode results use an MTP acceptance length
of 2.85.`]}),`
`,e.jsx(n.h3,{children:"Production Serving"}),`
`,e.jsx(n.p,{children:`Production traffic brings a different challenge from a
fixed benchmark: requests arrive in bursts, input lengths vary, and workers
carry different loads. The important questions are how long users wait for an
answer, how smoothly it continues generating, and how much output each GPU can
deliver while meeting those latency targets.`}),`
`,e.jsx(n.p,{children:`The routing layer helps by choosing where each request runs. An agent often
sends much of the same context again after a tool call; a worker that already
holds that prefix can reuse the cached computation. The router tracks both
cached prefixes and worker load, so it can favor reuse without concentrating
requests on an overloaded worker. It supports Kubernetes deployments and scales
across replicas as the worker pool grows. The router is being prepared for a
formal release; this section describes its use in the Step 5 Preview serving work.`}),`
`,e.jsx(r,{name:"cache-aware-router",alt:"Routing supported text chats to workers with cached prefixes, with cache updates flowing back to the router",children:e.jsx(n.p,{children:`For supported text chats, the router forwards token IDs to a worker holding
the request's prefix while balancing load. Multimodal requests and unsupported
chat formats retain their original messages and media for engine-side
processing. Workers publish KV-cache events to keep the router's prefix view
current.`})}),`
`,e.jsx(n.p,{children:"Two optimizations developed for Step 5 Preview reduce repeated CPU work in this path:"}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Reuse tokenization across the router and engine."}),` The router needs token IDs
to match prefixes, so tokenizing the same request again in the engine duplicates
work. For supported text chats, it forwards those IDs and the engine skips both
tokenization and chat templating. A parity check enables this path only when
the IDs match what the engine would produce, with fallback otherwise.
Multimodal requests and unsupported formats keep their original inputs. This
removes redundant processing while preserving the engine's input handling.`]}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Keep cache updates lightweight."}),` Workers send frequent events describing
changes to their KV caches. Routing needs only the block hashes in those events,
so the decoder skips the token-ID payloads without allocating arrays for them,
reducing work as the event stream grows. Per-worker metrics track missing events,
publisher resets, and decoding failures so operators can detect problems with
the cache view used for routing.`]}),`
`,e.jsx(n.h2,{children:"Miles Day-0 Support"}),`
`,e.jsx(n.p,{children:`Once a model is serving an application, a team may want to train it for a
particular task. Miles adds this option for Step 5 Preview, with a working RL
run that demonstrates both learning progress and agreement between the training
and rollout systems. The rollout system generates the responses used for
training, so checking that the two systems score those responses similarly is
an important integration check.`}),`
`,e.jsxs(n.p,{children:["In a ",e.jsx(n.strong,{children:"79-step GRPO run on DAPO-Math-17K"}),`, the five-step moving mean of training
reward rises from approximately `,e.jsx(n.strong,{children:"0.44 to 0.75"}),`. This shows that the model is
learning on the math training workload. The run uses a `,e.jsx(n.strong,{children:"2K response cap"}),` and
`,e.jsx(n.strong,{children:"256 samples per step"}),"."]}),`
`,e.jsx(r,{name:"miles-training",alt:"GRPO training over 79 steps: increasing math training reward and low trainer versus rollout policy mismatch",children:e.jsx(n.p,{children:`GRPO on DAPO-Math-17K with a 2K response cap and 256 samples per step over 79
steps. Left: per-step reward and its five-step moving mean. Right: per-token
KL divergence and mean absolute log-probability difference between trainer and
rollout. The supplied run is labeled Step5 601B.`})}),`
`,e.jsxs(n.p,{children:[`The right-hand panel checks trainer/rollout agreement. Per-token KL stays
roughly between `,e.jsx(n.strong,{children:"0.0006 and 0.0009"}),`, and the mean absolute log-probability
difference remains low across the run. Together, the two panels show that this
configuration can train the model while keeping the trainer and rollout engine
closely aligned.`]}),`
`,e.jsx(n.p,{children:`For teams planning their own post-training, this is evidence that the RL path
has been exercised through a learning run. It is not yet evidence of better
coding agents or a higher held-out math score. Those improvements need separate
evaluations on the tasks the team wants to deploy.`}),`
`,e.jsx(n.h2,{children:"Acknowledgments"}),`
`,e.jsx(n.p,{children:"This work was a collaboration between the SGLang & Miles team and the StepFun team, together with NVIDIA and Alibaba Bailian."}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Alibaba Bailian"}),": Peng Yu, Zhangheng Huang, Zhiyang Huang, Zhen Wang"]})]})}function l(t={}){const{wrapper:n}=t.components||{};return n?e.jsx(n,{...t,children:e.jsx(o,{...t})}):o(t)}function c(){return e.jsx(i,{tags:["Day-0 Support"],meta:e.jsx("time",{dateTime:"2026-10-14",className:"text-sm font-medium text-muted-foreground",children:"October 14, 2026"}),title:"Step 5 Preview: Day-0 Inference and RL Support with SGLang and Miles",summary:"Efficient serving for long-context agents, with production experience and reinforcement learning support from day one.",articleWidth:"wide",children:e.jsx(l,{})})}export{c as default};
