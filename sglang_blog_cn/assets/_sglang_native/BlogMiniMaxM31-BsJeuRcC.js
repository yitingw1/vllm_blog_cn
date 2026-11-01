import{j as e,r as h,b as fe,d as O,R as T,u as L,e as X,P,f as w,g as Y,h as be,i as je,a as E}from"./index-ChgiYNvj.js";import{B as Me}from"./BlogPostLayout-C3GCbov8.js";const ve="/sglang_blog_cn/assets/_sglang_native/megaattention-preferred-clusters-CXKE9DWw.png",we="/sglang_blog_cn/assets/_sglang_native/megaattention-operator-dataflow-BAAL5HLc.png",ye="/sglang_blog_cn/assets/_sglang_native/megamoe-operator-dataflow-B7yQcyjc.png",ke="/sglang_blog_cn/assets/_sglang_native/megamoe-cta-scheduling-CoGdSVny.png",Te="/sglang_blog_cn/assets/_sglang_native/miles-m31-rl-training-Ck_9ietz.png",Ae="/sglang_blog_cn/assets/_sglang_native/tp4-agentx-curve-Z4YqsYRg.png",Fe="/sglang_blog_cn/assets/_sglang_native/tp4-agentx-curve-mi350x-DU7jtGvm.png";function Se({stats:t}){return e.jsx("figure",{className:"not-prose my-8 grid grid-cols-2 border-y border-border sm:grid-flow-col sm:grid-cols-none sm:auto-cols-fr",children:t.map((n,s)=>e.jsxs("div",{className:`min-w-0 py-5 pr-4 sm:py-6 sm:pr-5 ${s%2?"border-l border-border pl-4":""} ${s>0?"sm:border-l sm:border-border sm:pl-6":""} ${s>1?"border-t border-border sm:border-t-0":""}`,children:[e.jsxs("b",{className:"block font-mono text-3xl font-medium leading-none tracking-tight text-primary tabular-nums sm:text-4xl",children:[n.value,n.unit&&e.jsx("em",{className:"ml-1.5 text-sm font-medium not-italic tracking-normal text-muted-foreground sm:text-base",children:n.unit})]}),e.jsx("span",{className:"mt-3 block text-sm font-semibold leading-snug text-foreground",children:n.label}),n.sub&&e.jsx("small",{className:"mt-1 block text-xs leading-snug text-muted-foreground",children:n.sub})]},s))})}function z({cell:t,emphasized:n}){return e.jsxs(e.Fragment,{children:[e.jsx("span",{className:`block font-semibold ${n?"text-foreground":"text-foreground/80"}`,children:t.lead}),t.sub&&e.jsx("span",{className:"mt-1 block text-[13px] leading-snug text-muted-foreground",children:t.sub})]})}function Ce({columns:t,rows:n,highlight:s=t.length-1,caption:r}){return e.jsxs("figure",{className:"not-prose my-8 text-sm [&_code]:font-mono [&_code]:text-[12px]",children:[e.jsx("div",{className:"hidden sm:block",children:e.jsxs("table",{className:"w-full table-fixed border-separate border-spacing-x-2 border-spacing-y-0",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{className:"w-32 pl-0"}),t.map((a,o)=>e.jsx("th",{className:`rounded-t-lg px-4 py-2.5 text-left font-semibold tracking-tight ${o===s?"border-b-2 border-primary/40 bg-primary/10 text-primary":"border-b border-border bg-muted text-muted-foreground"}`,children:a},o))]})}),e.jsx("tbody",{children:n.map((a,o)=>e.jsxs("tr",{children:[e.jsx("th",{scope:"row",className:"py-3.5 pl-0 pr-3 text-left align-top font-semibold leading-snug text-foreground",children:a.label}),a.cells.map((c,i)=>e.jsx("td",{className:`px-4 py-3.5 align-top leading-snug ${i===s?"bg-primary/[0.07]":"bg-muted/70"} ${o===n.length-1?"rounded-b-lg":"border-b border-border"}`,children:e.jsx(z,{cell:c,emphasized:i===s})},i))]},o))})]})}),e.jsx("div",{className:"divide-y divide-border sm:hidden",children:n.map((a,o)=>e.jsxs("div",{className:"py-4 first:pt-0",children:[e.jsx("div",{className:"mb-2 font-semibold text-foreground",children:a.label}),e.jsx("div",{className:"grid grid-cols-2 gap-2",children:a.cells.map((c,i)=>e.jsxs("div",{className:`rounded-lg px-3 py-2.5 leading-snug ${i===s?"bg-primary/[0.07]":"bg-muted/70"}`,children:[e.jsx("span",{className:`mb-1 block text-[11px] font-semibold uppercase tracking-wider ${i===s?"text-primary":"text-muted-foreground"}`,children:t[i]}),e.jsx(z,{cell:c,emphasized:i===s})]},i))})]},o))}),r&&e.jsx("figcaption",{className:"mt-3 text-[13px] leading-snug text-muted-foreground",children:r})]})}function Pe({series:t,groups:n,unit:s,max:r,ticks:a,highlight:o=t.length-1,number:c,caption:i}){const m=d=>d===o?"bg-primary":"bg-muted-foreground/35";return e.jsxs("figure",{className:"not-prose my-8 text-sm",children:[e.jsxs("div",{className:"mb-4 flex flex-wrap items-center gap-x-5 gap-y-1 text-[13px] text-muted-foreground",children:[t.map((d,l)=>e.jsxs("span",{className:"inline-flex items-center gap-2",children:[e.jsx("span",{className:`h-2.5 w-2.5 rounded-sm ${m(l)}`}),e.jsx("span",{className:l===o?"font-semibold text-foreground":"",children:d})]},l)),e.jsx("span",{className:"ml-auto",children:s})]}),e.jsxs("div",{className:"flex gap-2",children:[e.jsx("div",{className:"relative h-64 w-9 shrink-0 font-mono text-[11px] text-muted-foreground tabular-nums",children:a.map(d=>e.jsx("span",{className:"absolute right-0 translate-y-1/2",style:{bottom:`${d/r*100}%`},children:d},d))}),e.jsxs("div",{className:"min-w-0 flex-1",children:[e.jsxs("div",{className:"relative h-64 border-b border-border",children:[a.map(d=>e.jsx("div",{className:"absolute inset-x-0 border-t border-dashed border-border",style:{bottom:`${d/r*100}%`}},d)),e.jsx("div",{className:"relative flex h-full items-end",children:n.map((d,l)=>e.jsx("div",{className:"flex h-full flex-1 items-end justify-center gap-1 px-1.5 sm:gap-1.5 sm:px-3",children:d.values.map((p,x)=>e.jsxs("div",{className:"flex h-full w-full max-w-11 flex-col justify-end",children:[e.jsx("span",{className:`mb-1 text-center font-mono text-[10px] leading-none tabular-nums sm:text-[11px] ${x===o?"font-semibold text-primary":"text-muted-foreground"}`,children:p}),e.jsx("div",{className:`rounded-t-sm ${m(x)}`,style:{height:`${p/r*100}%`}})]},x))},l))})]}),e.jsx("div",{className:"flex pt-2",children:n.map((d,l)=>e.jsx("div",{className:"flex-1 text-center font-mono text-xs font-semibold text-foreground",children:d.label},l))})]})]}),e.jsxs("figcaption",{className:"mt-3 text-center text-sm leading-relaxed text-muted-foreground",children:[e.jsxs("span",{className:"font-medium text-foreground",children:["Figure ",c,"."]})," ",i]})]})}function A({src:t,alt:n,number:s,children:r}){return e.jsxs("figure",{className:"not-prose my-8",children:[e.jsx("img",{src:t,alt:n,className:"mx-auto block h-auto w-full",loading:"lazy"}),e.jsxs("figcaption",{className:"mt-3 text-center text-sm leading-relaxed text-muted-foreground [&_p]:inline",children:[e.jsxs("span",{className:"font-medium text-foreground",children:["Figure ",s,"."]})," ",r]})]})}function I({children:t}){return e.jsx("code",{className:"not-prose rounded bg-muted px-1.5 py-0.5 font-mono text-[0.875em] text-foreground",children:t})}function U(t){const n=Ie(t),s=h.forwardRef((r,a)=>{const{children:o,...c}=r,i=h.Children.toArray(o),m=i.find(Re);if(m){const d=m.props.children,l=i.map(p=>p===m?h.Children.count(d)>1?h.Children.only(null):h.isValidElement(d)?d.props.children:null:p);return e.jsx(n,{...c,ref:a,children:h.isValidElement(d)?h.cloneElement(d,void 0,l):null})}return e.jsx(n,{...c,ref:a,children:o})});return s.displayName=`${t}.Slot`,s}function Ie(t){const n=h.forwardRef((s,r)=>{const{children:a,...o}=s;if(h.isValidElement(a)){const c=De(a),i=Ee(o,a.props);return a.type!==h.Fragment&&(i.ref=r?fe(r,c):c),h.cloneElement(a,i)}return h.Children.count(a)>1?h.Children.only(null):null});return n.displayName=`${t}.SlotClone`,n}var Ne=Symbol("radix.slottable");function Re(t){return h.isValidElement(t)&&typeof t.type=="function"&&"__radixId"in t.type&&t.type.__radixId===Ne}function Ee(t,n){const s={...n};for(const r in n){const a=t[r],o=n[r];/^on[A-Z]/.test(r)?a&&o?s[r]=(...i)=>{const m=o(...i);return a(...i),m}:a&&(s[r]=a):r==="style"?s[r]={...a,...o}:r==="className"&&(s[r]=[a,o].filter(Boolean).join(" "))}return{...t,...s}}function De(t){let n=Object.getOwnPropertyDescriptor(t.props,"ref")?.get,s=n&&"isReactWarning"in n&&n.isReactWarning;return s?t.ref:(n=Object.getOwnPropertyDescriptor(t,"ref")?.get,s=n&&"isReactWarning"in n&&n.isReactWarning,s?t.props.ref:t.props.ref||t.ref)}function Ge(t){const n=t+"CollectionProvider",[s,r]=O(n),[a,o]=s(n,{collectionRef:{current:null},itemMap:new Map}),c=M=>{const{scope:u,children:b}=M,v=T.useRef(null),g=T.useRef(new Map).current;return e.jsx(a,{scope:u,itemMap:g,collectionRef:v,children:b})};c.displayName=n;const i=t+"CollectionSlot",m=U(i),d=T.forwardRef((M,u)=>{const{scope:b,children:v}=M,g=o(i,b),f=L(u,g.collectionRef);return e.jsx(m,{ref:f,children:v})});d.displayName=i;const l=t+"CollectionItemSlot",p="data-radix-collection-item",x=U(l),y=T.forwardRef((M,u)=>{const{scope:b,children:v,...g}=M,f=T.useRef(null),S=L(u,f),C=o(l,b);return T.useEffect(()=>(C.itemMap.set(f,{ref:f,...g}),()=>{C.itemMap.delete(f)})),e.jsx(x,{[p]:"",ref:S,children:v})});y.displayName=l;function F(M){const u=o(t+"CollectionConsumer",M);return T.useCallback(()=>{const v=u.collectionRef.current;if(!v)return[];const g=Array.from(v.querySelectorAll(`[${p}]`));return Array.from(u.itemMap.values()).sort((C,R)=>g.indexOf(C.ref.current)-g.indexOf(R.ref.current))},[u.collectionRef,u.itemMap])}return[{Provider:c,Slot:d,ItemSlot:y},F,r]}var _e=h.createContext(void 0);function W(t){const n=h.useContext(_e);return t||n||"ltr"}var _="rovingFocusGroup.onEntryFocus",Le={bubbles:!1,cancelable:!0},N="RovingFocusGroup",[K,Q,Ke]=Ge(N),[Oe,Z]=O(N,[Ke]),[Ve,Be]=Oe(N),J=h.forwardRef((t,n)=>e.jsx(K.Provider,{scope:t.__scopeRovingFocusGroup,children:e.jsx(K.Slot,{scope:t.__scopeRovingFocusGroup,children:e.jsx(ze,{...t,ref:n})})}));J.displayName=N;var ze=h.forwardRef((t,n)=>{const{__scopeRovingFocusGroup:s,orientation:r,loop:a=!1,dir:o,currentTabStopId:c,defaultCurrentTabStopId:i,onCurrentTabStopIdChange:m,onEntryFocus:d,preventScrollOnEntryFocus:l=!1,...p}=t,x=h.useRef(null),y=L(n,x),F=W(o),[M,u]=Y({prop:c,defaultProp:i??null,onChange:m,caller:N}),[b,v]=h.useState(!1),g=be(d),f=Q(s),S=h.useRef(!1),[C,R]=h.useState(0);return h.useEffect(()=>{const j=x.current;if(j)return j.addEventListener(_,g),()=>j.removeEventListener(_,g)},[g]),e.jsx(Ve,{scope:s,orientation:r,dir:F,loop:a,currentTabStopId:M,onItemFocus:h.useCallback(j=>u(j),[u]),onItemShiftTab:h.useCallback(()=>v(!0),[]),onFocusableItemAdd:h.useCallback(()=>R(j=>j+1),[]),onFocusableItemRemove:h.useCallback(()=>R(j=>j-1),[]),children:e.jsx(P.div,{tabIndex:b||C===0?-1:0,"data-orientation":r,...p,ref:y,style:{outline:"none",...t.style},onMouseDown:w(t.onMouseDown,()=>{S.current=!0}),onFocus:w(t.onFocus,j=>{const pe=!S.current;if(j.target===j.currentTarget&&pe&&!b){const B=new CustomEvent(_,Le);if(j.currentTarget.dispatchEvent(B),!B.defaultPrevented){const G=f().filter(k=>k.focusable),me=G.find(k=>k.active),ge=G.find(k=>k.id===M),xe=[me,ge,...G].filter(Boolean).map(k=>k.ref.current);te(xe,l)}}S.current=!1}),onBlur:w(t.onBlur,()=>v(!1))})})}),ee="RovingFocusGroupItem",ne=h.forwardRef((t,n)=>{const{__scopeRovingFocusGroup:s,focusable:r=!0,active:a=!1,tabStopId:o,children:c,...i}=t,m=X(),d=o||m,l=Be(ee,s),p=l.currentTabStopId===d,x=Q(s),{onFocusableItemAdd:y,onFocusableItemRemove:F,currentTabStopId:M}=l;return h.useEffect(()=>{if(r)return y(),()=>F()},[r,y,F]),e.jsx(K.ItemSlot,{scope:s,id:d,focusable:r,active:a,children:e.jsx(P.span,{tabIndex:p?0:-1,"data-orientation":l.orientation,...i,ref:n,onMouseDown:w(t.onMouseDown,u=>{r?l.onItemFocus(d):u.preventDefault()}),onFocus:w(t.onFocus,()=>l.onItemFocus(d)),onKeyDown:w(t.onKeyDown,u=>{if(u.key==="Tab"&&u.shiftKey){l.onItemShiftTab();return}if(u.target!==u.currentTarget)return;const b=$e(u,l.orientation,l.dir);if(b!==void 0){if(u.metaKey||u.ctrlKey||u.altKey||u.shiftKey)return;u.preventDefault();let g=x().filter(f=>f.focusable).map(f=>f.ref.current);if(b==="last")g.reverse();else if(b==="prev"||b==="next"){b==="prev"&&g.reverse();const f=g.indexOf(u.currentTarget);g=l.loop?qe(g,f+1):g.slice(f+1)}setTimeout(()=>te(g))}}),children:typeof c=="function"?c({isCurrentTabStop:p,hasTabStop:M!=null}):c})})});ne.displayName=ee;var Ue={ArrowLeft:"prev",ArrowUp:"prev",ArrowRight:"next",ArrowDown:"next",PageUp:"first",Home:"first",PageDown:"last",End:"last"};function He(t,n){return n!=="rtl"?t:t==="ArrowLeft"?"ArrowRight":t==="ArrowRight"?"ArrowLeft":t}function $e(t,n,s){const r=He(t.key,s);if(!(n==="vertical"&&["ArrowLeft","ArrowRight"].includes(r))&&!(n==="horizontal"&&["ArrowUp","ArrowDown"].includes(r)))return Ue[r]}function te(t,n=!1){const s=document.activeElement;for(const r of t)if(r===s||(r.focus({preventScroll:n}),document.activeElement!==s))return}function qe(t,n){return t.map((s,r)=>t[(n+r)%t.length])}var Xe=J,Ye=ne,D="Tabs",[We]=O(D,[Z]),re=Z(),[Qe,V]=We(D),se=h.forwardRef((t,n)=>{const{__scopeTabs:s,value:r,onValueChange:a,defaultValue:o,orientation:c="horizontal",dir:i,activationMode:m="automatic",...d}=t,l=W(i),[p,x]=Y({prop:r,onChange:a,defaultProp:o??"",caller:D});return e.jsx(Qe,{scope:s,baseId:X(),value:p,onValueChange:x,orientation:c,dir:l,activationMode:m,children:e.jsx(P.div,{dir:l,"data-orientation":c,...d,ref:n})})});se.displayName=D;var ae="TabsList",oe=h.forwardRef((t,n)=>{const{__scopeTabs:s,loop:r=!0,...a}=t,o=V(ae,s),c=re(s);return e.jsx(Xe,{asChild:!0,...c,orientation:o.orientation,dir:o.dir,loop:r,children:e.jsx(P.div,{role:"tablist","aria-orientation":o.orientation,...a,ref:n})})});oe.displayName=ae;var ie="TabsTrigger",le=h.forwardRef((t,n)=>{const{__scopeTabs:s,value:r,disabled:a=!1,...o}=t,c=V(ie,s),i=re(s),m=he(c.baseId,r),d=ue(c.baseId,r),l=r===c.value;return e.jsx(Ye,{asChild:!0,...i,focusable:!a,active:l,children:e.jsx(P.button,{type:"button",role:"tab","aria-selected":l,"aria-controls":d,"data-state":l?"active":"inactive","data-disabled":a?"":void 0,disabled:a,id:m,...o,ref:n,onMouseDown:w(t.onMouseDown,p=>{!a&&p.button===0&&p.ctrlKey===!1?c.onValueChange(r):p.preventDefault()}),onKeyDown:w(t.onKeyDown,p=>{[" ","Enter"].includes(p.key)&&c.onValueChange(r)}),onFocus:w(t.onFocus,()=>{const p=c.activationMode!=="manual";!l&&!a&&p&&c.onValueChange(r)})})})});le.displayName=ie;var ce="TabsContent",de=h.forwardRef((t,n)=>{const{__scopeTabs:s,value:r,forceMount:a,children:o,...c}=t,i=V(ce,s),m=he(i.baseId,r),d=ue(i.baseId,r),l=r===i.value,p=h.useRef(l);return h.useEffect(()=>{const x=requestAnimationFrame(()=>p.current=!1);return()=>cancelAnimationFrame(x)},[]),e.jsx(je,{present:a||l,children:({present:x})=>e.jsx(P.div,{"data-state":l?"active":"inactive","data-orientation":i.orientation,role:"tabpanel","aria-labelledby":m,hidden:!x,id:d,tabIndex:0,...c,ref:n,style:{...t.style,animationDuration:p.current?"0s":void 0},children:x&&o})})});de.displayName=ce;function he(t,n){return`${t}-trigger-${n}`}function ue(t,n){return`${t}-content-${n}`}var Ze=se,Je=oe,en=le,nn=de;function tn({className:t,...n}){return e.jsx(Ze,{"data-slot":"tabs",className:E("flex flex-col gap-2",t),...n})}function rn({className:t,...n}){return e.jsx(Je,{"data-slot":"tabs-list",className:E("bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-lg p-[3px]",t),...n})}function H({className:t,...n}){return e.jsx(en,{"data-slot":"tabs-trigger",className:E("data-[state=active]:bg-background dark:data-[state=active]:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 text-foreground dark:text-muted-foreground inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",t),...n})}function $({className:t,...n}){return e.jsx(nn,{"data-slot":"tabs-content",className:E("flex-1 outline-none",t),...n})}function q(t){const n={a:"a",br:"br",code:"code",h2:"h2",h3:"h3",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",...t.components};return e.jsxs(e.Fragment,{children:[e.jsxs(n.p,{children:[e.jsxs(n.strong,{children:[`SGLang and Miles provide day-0 inference and reinforcement learning support for
`,e.jsx(n.a,{href:"https://huggingface.co/MiniMaxAI/MiniMax-M3.1-Flash",children:"MiniMax M3.1 Flash"}),"."]}),`
SGLang serves M3.1 Flash with MSA-V1 sparse attention kernels, ultra-low-latency
MegaKernels, DSpark and DFlash2 speculative decoding, and HiCache. Miles trains M3.1
Flash with reinforcement learning, using SGLang for rollouts.`]}),`
`,e.jsxs(n.p,{children:[`For agentic workloads, SGLang optimizes M3.1 Flash for both single-request latency and
high-throughput serving of many concurrent sessions. With ultra-low latency
MegaKernels, SGLang decodes a single request at about `,e.jsx(n.strong,{children:"1K tokens/s"}),` on 4× B300 at an
acceptance length of 5. On the AgentX coding-agent trace, one TP4 replica sustains
about `,e.jsx(n.strong,{children:"100K tokens/s per GPU"}),` at 96 concurrent sessions and an acceptance length of
3.07.`]}),`
`,e.jsx(n.h2,{children:"Model Overview"}),`
`,e.jsxs(n.p,{children:[`MiniMax M3.1 Flash is a natively multimodal MoE model. It reads text, images, and
video over a million-token context. Weights are on
`,e.jsx(n.a,{href:"https://huggingface.co/MiniMaxAI/MiniMax-M3.1-Flash",children:"Hugging Face"}),`, and full details
are in the model card.`]}),`
`,e.jsx(Se,{stats:[{value:"428",unit:"B",label:"total parameters"},{value:"23",unit:"B",label:"active per token"},{value:"1",unit:"M",label:"token context"},{value:"3",label:"input modalities",sub:"text · image · video"}]}),`
`,e.jsx(n.h3,{children:"What's New in MiniMax M3.1 Flash"}),`
`,e.jsx(n.p,{children:`MiniMax M3.1 Flash keeps the MiniMax M3 backbone and vision encoder, with the
following changes:`}),`
`,e.jsx(Ce,{columns:["M3","M3.1 Flash"],rows:[{label:"Attention",cells:[{lead:"Mixed MSA + full attention",sub:"Full attention in the first 3 layers"},{lead:"Full MSA",sub:"MSA in all 60 layers"}]},{label:"Precision",cells:[{lead:"BF16"},{lead:"NVFP4*",sub:"Attention + indexer + MoE"}]},{label:"KV Cache",cells:[{lead:"134 KB / token",sub:"BF16"},{lead:"38 KB / token",sub:"NVFP4"}]},{label:"Speculative Decoding",cells:[{lead:"—"},{lead:"DSpark / DFlash2",sub:"DSpark draft ships in the checkpoint"}]}],caption:e.jsxs(e.Fragment,{children:["KV cache per token across all 60 layers, including the indexer key cache.",e.jsx(n.br,{}),"* Attention and indexer kernels compute with FP8 queries over the NVFP4 KV cache."]})}),`
`,e.jsx(n.h2,{children:"Get Started"}),`
`,e.jsxs(n.p,{children:["Follow the ",e.jsx(n.a,{href:"https://docs.sglang.io/cookbook/autoregressive/MiniMax/MiniMax-M3.1",children:"MiniMax M3.1 Flash SGLang Cookbook"}),`
for deployment instructions. Its command generator covers each supported GPU and
serving strategy. On B300, we recommend this configuration for agentic workloads,
with HiCache and DSpark / DFlash2 speculative decoding:`]}),`
`,e.jsxs(tn,{defaultValue:"dspark",children:[e.jsxs(rn,{children:[e.jsx(H,{value:"dspark",children:"DSpark"}),e.jsx(H,{value:"dflash2",children:"DFlash2"})]}),e.jsx($,{value:"dspark",children:e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-bash",children:`FMHA_SM100_ALLOW_JIT=1 \\
sglang serve \\
  --model-path MiniMaxAI/MiniMax-M3.1-Flash \\
  --trust-remote-code \\
  --reasoning-parser minimax-m3 \\
  --tool-call-parser minimax-m3 \\
  --tp 4 \\
  --moe-runner-backend flashinfer_trtllm_routed \\
  --speculative-algorithm DSPARK \\
  --speculative-use-block-verification \\
  --enable-hierarchical-cache \\
  --hicache-ratio 2 \\
  --cuda-graph-backend-prefill breakable \\
  --chunked-prefill-size 32768 \\
  --max-running-requests 128 \\
  --cuda-graph-max-bs-decode 128 \\
  --mem-fraction-static 0.8 \\
  --tokenizer-worker-num 8
`})})}),e.jsx($,{value:"dflash2",children:e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-bash",children:`FMHA_SM100_ALLOW_JIT=1 \\
sglang serve \\
  --model-path MiniMaxAI/MiniMax-M3.1-Flash \\
  --trust-remote-code \\
  --reasoning-parser minimax-m3 \\
  --tool-call-parser minimax-m3 \\
  --tp 4 \\
  --moe-runner-backend flashinfer_trtllm_routed \\
  --speculative-algorithm DFLASH \\
  --speculative-draft-model-path RadixArk/Minimax-M3.1-Flash-Dflash2 \\
  --speculative-use-block-verification \\
  --enable-hierarchical-cache \\
  --hicache-ratio 2 \\
  --cuda-graph-backend-prefill breakable \\
  --chunked-prefill-size 32768 \\
  --max-running-requests 128 \\
  --cuda-graph-max-bs-decode 128 \\
  --mem-fraction-static 0.8 \\
  --tokenizer-worker-num 8
`})})})]}),`
`,e.jsxs(n.p,{children:["The command runs in the ",e.jsx(I,{children:"lmsysorg/sglang:dev-minimax-m31-flash"}),` image, which
includes the CUDA 13.4 toolkit that the MSA kernels need. The first launch compiles these
kernels and caches them for later launches.`]}),`
`,e.jsx(n.h2,{children:"SGLang Day-0 Support"}),`
`,e.jsx(n.h3,{children:"Feature Support"}),`
`,e.jsx(n.p,{children:`The table below lists the serving capabilities integrated for M3.1 Flash. Availability
of individual execution paths depends on the hardware and deployment configuration.`}),`
`,e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:"Feature"}),e.jsx(n.th,{children:"Status"}),e.jsx(n.th,{children:"Coverage"})]})}),e.jsxs(n.tbody,{children:[e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"API"}),e.jsx(n.td,{children:"Yes"}),e.jsx(n.td,{children:"Tool calling, reasoning effort, thinking control"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"Multimodal"}),e.jsx(n.td,{children:"Yes"}),e.jsx(n.td,{children:"Text, image, and video input"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"HiCache"}),e.jsx(n.td,{children:"Yes"}),e.jsx(n.td,{children:"L2 host memory and L3 Mooncake storage, compatible with speculative decoding"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"Speculative decoding"}),e.jsx(n.td,{children:"Yes"}),e.jsx(n.td,{children:"DSpark (draft shipped in the model checkpoint), DFlash2 (draft trained by RadixArk), block verification for sampled proposals"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"CUDA Graph"}),e.jsx(n.td,{children:"Yes"}),e.jsx(n.td,{children:"Decode CUDA Graph, Breakable CUDA Graph for prefill"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"Disaggregation"}),e.jsx(n.td,{children:"Yes"}),e.jsx(n.td,{children:"PD, EPD"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"Parallelism"}),e.jsx(n.td,{children:"Yes"}),e.jsx(n.td,{children:"TP, DP Attention, EP"})]})]})]}),`
`,e.jsx(n.h3,{children:"Hardware Support"}),`
`,e.jsx(n.p,{children:`Day-0 support covers NVIDIA Blackwell, NVIDIA Hopper, and AMD Instinct GPUs, each
with its own kernel path.`}),`
`,e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{}),e.jsxs(n.th,{children:["NVIDIA Blackwell",e.jsx("br",{}),"GB300, B300, B200"]}),e.jsxs(n.th,{children:["NVIDIA Hopper",e.jsx("br",{}),"H200"]}),e.jsxs(n.th,{children:["AMD Instinct",e.jsx("br",{}),"MI350X, MI355X"]})]})}),e.jsxs(n.tbody,{children:[e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"Checkpoint"}),e.jsx(n.td,{children:"NVFP4"}),e.jsx(n.td,{children:"NVFP4"}),e.jsx(n.td,{children:"NVFP4, Quark MXFP4"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"KV cache"}),e.jsx(n.td,{children:"NVFP4 KV cache and indexer K cache"}),e.jsx(n.td,{children:"BF16 or FP8 KV cache, with the indexer K cache in the same dtype"}),e.jsx(n.td,{children:"NVFP4 KV cache and indexer K cache, or FP8 with the Quark MXFP4 checkpoint"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"Attention"}),e.jsxs(n.td,{children:["MSA-V1 sparse attention and indexer",e.jsx("br",{}),"MegaAttention MegaKernel at batch size 1"]}),e.jsx(n.td,{children:"Triton sparse attention, paged indexer scoring and sparse decode"}),e.jsxs(n.td,{children:["Gluon sparse attention for decode and prefill",e.jsx("br",{}),"Triton indexer scoring"]})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"MoE"}),e.jsxs(n.td,{children:["TRT-LLM MoE, DeepGEMM MegaMoE",e.jsx("br",{}),"MegaMoE MegaKernel at batch size 1"]}),e.jsx(n.td,{children:"Marlin W4A16"}),e.jsx(n.td,{children:"MXFP4 MoE on AITER FlyDSL kernels"})]})]})]}),`
`,e.jsx(n.p,{children:`Beyond the attention and MoE kernels, SGLang fuses all-reduce, normalization,
activation, quantization, and cache writes on Blackwell and Hopper, and packs the
token gathers for DP attention. On AMD, SGLang fuses QK-norm, RoPE and the KV-cache
write, the FP8 quantization after RMSNorm and SwiGLU, and the router with its top-k
and expert sort. The MXFP8 attention, dense and shared-expert projections run as
block-FP8 GEMMs on AITER with tables tuned for M3.1. All-reduce uses AITER custom
all-reduce for small messages and INT8/INT4 quick all-reduce for large ones.`}),`
`,e.jsx(n.p,{children:`On B300, TRT-LLM MoE at TP4 decodes faster than DeepGEMM MegaMoE at TP4/EP4 at every
batch size we measured, by 59% at batch size 1 and 20% at batch size 32, so the
recommended deployment uses it. DeepGEMM MegaMoE keeps higher prefill throughput. On
H200 at 128K context, the Hopper optimizations raise TP8 decode throughput by 1.38× at
batch size 1 and 1.49× at batch size 22. On MI355X without speculative decoding,
individual optimizations improve decode by up to 61% at batch size 1 and prefill by
up to 25%.`}),`
`,e.jsxs(n.p,{children:[`Launch recipes for each platform are in the
`,e.jsx(n.a,{href:"https://docs.sglang.io/cookbook/autoregressive/MiniMax/MiniMax-M3.1",children:"SGLang Cookbook"}),`.
For questions, join the `,e.jsx(n.a,{href:"https://slack.sglang.io",children:"SGLang Slack"}),"."]}),`
`,e.jsx(n.h3,{children:"DFlash2 Speculative Decoding"}),`
`,e.jsxs(n.p,{children:[`In addition to the DSpark draft shipped with the checkpoint, SGLang supports
DFlash2 for M3.1 Flash with a `,e.jsx(n.a,{href:"https://huggingface.co/RadixArk/Minimax-M3.1-Flash-Dflash2",children:"draft model trained by RadixArk"}),`.
The draft conditions on hidden states from M3.1 Flash, projecting them into its own
KV cache, and reuses the target model's token embeddings and LM head. It proposes
several future tokens in a single forward pass. M3.1 Flash then verifies those proposals
together, so an accepted prefix can advance generation by multiple tokens per
target-model call.`]}),`
`,e.jsxs(n.p,{children:[`DFlash2 combines parallel drafting with dynamic convolutions across positions
in the draft block and a lightweight candidate selector that models dependencies
between proposed tokens. SGLang captures drafting and candidate selection in the
same CUDA graph and uses its overlap scheduler to reduce CPU overhead between
GPU operations. The DFlash2 draft uses the `,e.jsx(I,{children:"DFLASH"})," speculative-decoding path."]}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Block verification."}),` For sampled DSpark and DFlash2 proposals, SGLang supports
`,e.jsx(n.a,{href:"https://arxiv.org/abs/2403.10444",children:"block verification"}),` through
`,e.jsx(I,{children:"--speculative-use-block-verification"}),`. It uses the joint probabilities of draft
prefixes under the draft and target models to decide how much of the block to
accept. After accepting a prefix, the verifier draws a correction token, or a
target-model bonus token if all proposals were accepted. This can increase the
accepted prefix length while preserving the target sampling distribution. The
benefit applies to sampled proposals. The flag does not change greedy verification.`]}),`
`,e.jsx(n.h3,{children:"AgentX Performance"}),`
`,e.jsx(A,{number:1,src:Ae,alt:"AgentX throughput per GPU versus P90 per-user decode speed at 1 to 96 concurrent sessions",children:e.jsx(n.p,{children:"AgentX throughput per GPU and per-user decode speed for one TP4 replica on 4× B300."})}),`
`,e.jsxs(n.p,{children:[`AgentX replays 393 recorded coding-agent sessions
(`,e.jsx(I,{children:"semianalysis_cc_traces_weka_062126"}),`). We served MiniMax M3.1 Flash with
SGLang as one TP4 replica on 4× B300 with DSpark at 1 to 96 concurrent sessions, with
the DSpark acceptance length fixed at 3.07 tokens per step and HiCache enabled from 48
sessions. Throughput counts input and output tokens per GPU, including cached prompt
tokens. Per-user speed is the inverse of the P90 inter-token latency.`]}),`
`,e.jsx(n.p,{children:`Throughput grows from 5.4K tokens/s per GPU at one session to 101.5K at 96 sessions, while
per-user speed goes from 353 to 44 tokens/s. HiCache capacity matters at high
concurrency. At 96 sessions, raising the host pool from 2× to 4× the GPU KV cache lifted
throughput from 76.2K to 101.5K tokens/s per GPU and per-user speed from 26 to 44
tokens/s, because fewer evicted prefixes had to be prefilled again.`}),`
`,e.jsx(A,{number:2,src:Fe,alt:"AgentX throughput per GPU versus P90 per-user decode speed on MI350X at 1 to 64 concurrent sessions",children:e.jsx(n.p,{children:"AgentX throughput per GPU and per-user decode speed for one TP4 replica on 4× MI350X."})}),`
`,e.jsx(n.p,{children:`We ran the same AgentX setup on 4× MI350X at 1 to 64 concurrent sessions, with HiCache
at a 2× host pool from 48 sessions. Throughput grows from about 5K tokens/s per GPU at
one session to about 81K at 64 sessions, while per-user speed goes from about 318 to
61 tokens/s.`}),`
`,e.jsx(n.h2,{children:"Ultra-Low Latency Inference"}),`
`,e.jsx(n.p,{children:`At small batch sizes, decode latency depends on both individual operators and the
transitions between them. Separate kernel scheduling, intermediate writes and
rereads, and waits for an entire preceding stage all add latency.`}),`
`,e.jsx(n.p,{children:`MegaKernel brings multiple stages into one GPU kernel, coordinating resources
across operators. Different CTAs and clusters can execute different stages
concurrently, with downstream tasks advancing as soon as their inputs are ready.
Weight loading and initialization overlap upstream computation, while CTAs and
clusters continue into subsequent tasks, reusing on-chip data and resources.
Organizing execution around task dependencies shortens the critical path.`}),`
`,e.jsx(n.p,{children:`Following this approach, we implement each M3.1 Flash decode Transformer block at
batch size 1 as two MegaKernels: MegaAttention and MegaMoE. Each covers its respective
module, including communication and post-processing, to minimize per-layer latency.`}),`
`,e.jsxs(n.p,{children:[`SGLang runs these MegaKernels through the plugin framework of
`,e.jsx(n.a,{href:"https://www.lmsys.org/blog/2026-10-18-sglang-low-latency-mode",children:"SGLang Low-Latency Mode"}),`.
With `,e.jsx(I,{children:"--monokernel-backend msa"}),`, SGLang dispatches single-request verification
steps to MegaAttention and MegaMoE and keeps the standard path for larger batches.`]}),`
`,e.jsx(n.h3,{children:"Reaching ~1000 TPS with MegaKernels"}),`
`,e.jsx(Pe,{series:["Standard decode path","MegaKernels"],unit:"decode tokens/s, batch size 1",max:1200,ticks:[0,250,500,750,1e3],groups:[{label:"1K",values:[479,1028]},{label:"32K",values:[474,968]},{label:"64K",values:[472,976]},{label:"128K",values:[467,957]},{label:"256K",values:[465,919]}],number:3,caption:e.jsx(e.Fragment,{children:"Decode throughput of one request on MiniMax M3.1 Flash, 4× NVIDIA B300 (TP4), with the speculative acceptance length fixed at 5. 2.15× at 1K, 2.04× at 32K, 2.07× at 64K, 2.05× at 128K, and 1.98× at 256K context."})}),`
`,e.jsx(n.h3,{children:"MegaAttention"}),`
`,e.jsx(n.p,{children:`MegaAttention integrates input normalization and quantization, QKV and indexer
projections, RoPE and KV-cache updates, indexer scoring and TopK selection, sparse
attention, output projection, and tensor-parallel reduction with residual addition and
RMSNorm.`}),`
`,e.jsx(A,{number:4,src:we,alt:"MegaAttention operator dataflow: QKV and indexer branches feed sparse attention, followed by OProj, TP AllReduce, Residual Add, and RMSNorm.",children:e.jsx(n.p,{children:"MegaAttention operators and their data dependencies."})}),`
`,e.jsx(n.p,{children:`64 CTAs perform projection, while other CTAs begin indexer scoring once Qi
is ready. CTAs that finish projection then join the indexing work. After indexing,
8 clusters execute TopK and FMHA, while another 6 prepare and execute OProj,
with 8 CTAs per cluster. This partitioning reuses resources across stages and
overlaps downstream preparation with upstream computation.`}),`
`,e.jsx(A,{number:5,src:ve,alt:"MegaAttention resource partitioning and fine-grained dependencies, with cluster reuse for FMHA, TP4 reduction, and RMSNorm.",children:e.jsx(n.p,{children:"MegaAttention task partitioning, fine-grained dependencies, and cluster reuse."})}),`
`,e.jsx(n.p,{children:`Once Qi is ready for indexer query tokens, the kernel publishes a shared readiness
signal. Using the existing historical indexer K cache, the indexer can score
historical pages concurrently with the remaining projection work, without waiting
for the entire projection stage to finish. TopK results are then passed through
shared memory within each FMHA cluster, reducing intermediate data movement.`}),`
`,e.jsx(n.p,{children:`OProj CTAs initialize their pipelines and preload weights during upstream
computation, then wait for the corresponding activation-group readiness signals
before loading FMHA output. Preparing ahead of input readiness shortens the
subsequent execution path.`}),`
`,e.jsx(n.p,{children:`The communication tail reuses the per-token clusters that executed FMHA. OProj
writes directly into the TP4 communication payload. Once all local OProj outputs
and all 4 ranks are ready, 2 CTAs per token cluster perform NVLS reduction
and residual addition, accumulating the sum of squares for RMSNorm. They pass
residual slices and statistics through distributed shared memory to all 8
CTAs, which cooperate to complete RMSNorm. The residual result is written to
global memory as a module output, while RMSNorm consumes the cluster-local
handoff, avoiding a reload.`}),`
`,e.jsx(n.h3,{children:"MegaMoE"}),`
`,e.jsx(n.p,{children:`MegaMoE integrates routing, input quantization, routed and shared expert computation,
weighted combination, tensor-parallel reduction, and residual addition in 1
cooperative kernel launch per rank.`}),`
`,e.jsx(A,{number:6,src:ye,alt:"MegaMoE operator dataflow: independent routing and input quantization feed routed and shared experts, followed by weighted combination, TP AllReduce, and residual addition.",children:e.jsx(n.p,{children:"MegaMoE operators and their data dependencies."})}),`
`,e.jsx(n.p,{children:`Routing overlaps input quantization. The shared expert starts from the packed
input without waiting for route selection, allowing it to overlap routed expert
computation.`}),`
`,e.jsx(n.p,{children:`The illustrated implementation assigns 128 CTAs to routed work and 16 to the shared
expert. Routed CTAs perform input packing and router partial jobs at entry, then
continue into expert computation. Tasks are assigned by token, selected-route slot,
and slab. Actual expert IDs come from the router. Shared CTAs partition channels
across all tokens.`}),`
`,e.jsx(A,{number:7,src:ke,alt:"MegaMoE CTA scheduling: a token-by-route-by-slab task matrix, 4-way activation handoff, FC2 weight-load overlap, and reused output owners performing per-slice communication and residual addition.",children:e.jsx(n.p,{children:"MegaMoE CTA assignments, activation handoffs, execution overlap, and output-owner reuse. The matrix shows logical task ownership. The local timing sketches are schematic."})}),`
`,e.jsx(n.p,{children:`4 CTAs cooperate on each selected route of a token. Each computes an Up/Gate
projection (FC1) slice, applies activation and quantization, then produces an output
slice through the Down projection (FC2). Every FC2 CTA consumes activation slices
from all 4 CTAs. Producers publish epoch-tagged records, allowing consumers to
identify ready data for the same token and route without waiting for unrelated
routes.`}),`
`,e.jsx(n.p,{children:`FC2 weight loading overlaps the FC1 tail. Once the final FC1 MMA reads of a buffer
region complete, the weight producer reuses that shared-memory region for FC2
weights, starting downstream transfers while remaining FC1 work continues. FC2 MMA
still waits for the complete activation from all 4 CTAs and the corresponding
weight values and scales.`}),`
`,e.jsx(n.p,{children:`For each token and output slab, the CTA assigned to selected-route slot 0 continues
into combine and communication, giving 32 reused output owners. Each retains its
own Down result in shared memory and gathers the other 3 routes’ matching
outputs through epoch-tagged records. During Down computation, an idle consumer
warp waits for the matching shared expert slice, overlapping readiness checking
with computation. The owner still synchronizes before consuming that slice.`}),`
`,e.jsx(n.p,{children:`Each owner combines its rank’s shared and weighted routed contributions, then
pushes BF16 records carrying epoch tags to peer ranks, delivering data and readiness
together. Receivers alternate between 2 buffers and accept only current-epoch
records. Once a slice’s peer records are ready, the owner sums them with its local
contribution in fixed rank order and adds the residual to produce the final output.`}),`
`,e.jsx(n.h2,{children:"Miles Day-0 Support"}),`
`,e.jsxs(n.p,{children:[e.jsx(n.a,{href:"https://github.com/radixark/miles",children:"Miles"}),` supports MiniMax M3.1 Flash reinforcement learning on day 0,
training on Megatron and generating rollouts with SGLang.`]}),`
`,e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:"Area"}),e.jsx(n.th,{children:"Status"}),e.jsx(n.th,{children:"Coverage"})]})}),e.jsxs(n.tbody,{children:[e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"Training backend"}),e.jsx(n.td,{children:"Yes"}),e.jsx(n.td,{children:"Megatron"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"Rollout"}),e.jsx(n.td,{children:"Yes"}),e.jsx(n.td,{children:"SGLang, BF16"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"Parallelism"}),e.jsx(n.td,{children:"Yes"}),e.jsx(n.td,{children:"DP, TP, PP, EP, SP"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"Execution"}),e.jsx(n.td,{children:"Yes"}),e.jsx(n.td,{children:"Colocated training and rollout"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"Routing replay"}),e.jsx(n.td,{children:"Yes"}),e.jsx(n.td,{children:"Rollout Routing Replay for the MoE router"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"Validated run"}),e.jsx(n.td,{children:"Yes"}),e.jsx(n.td,{children:"GRPO on DAPO-Math-17K, 32 GB300 GPUs, 66 steps"})]})]})]}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Sparse attention."}),` The Megatron-Core plugin implements MSA on every layer: as in
SGLang, the indexer selects 16 128-token blocks per KV head, and a Triton kernel attends
over them. The indexer is frozen and its top-k is recomputed in training. It matches
SGLang's selection except at near-ties.`]}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Trainer–rollout consistency."}),` Rollout Routing Replay fixes the MoE expert path, and
q/k normalization and RoPE run in FP32 with a single BF16 cast, as in SGLang's fused kernel.`]}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Colocated training and rollout."}),` Training and rollout share 32 GPUs. Optimizer moments
stream to node-local NVMe, and updated BF16 weights are written in place into SGLang's
fused q/k/v + index GEMM, keeping captured CUDA graphs valid.`]}),`
`,e.jsx(n.h3,{children:"The Validated Run"}),`
`,e.jsx(n.p,{children:`The figure below shows steps 0–65 of a GRPO run on DAPO-Math-17K with a 4K-token response
cap on 32 GB300 GPUs (TP4, PP4, EP8, 256 samples per step). The five-step mean reward rises
from 0.64 to 0.77, and per-token KL between trainer and rollout stays between 0.00065 and
0.00101 without sustained growth.`}),`
`,e.jsx(A,{number:8,src:Te,alt:"Raw reward and trainer-vs-rollout policy mismatch over 66 GRPO steps",children:e.jsx(n.p,{children:"DAPO-Math-17K reward and trainer–rollout discrepancy over steps 0–65."})}),`
`,e.jsx(n.h3,{children:"Get Started with Miles"}),`
`,e.jsx(n.p,{children:"The Miles recipe downloads the release, converts it to BF16, and launches training:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-bash",children:`# 4-layer model on one node of 4 GB300 GPUs, to check the setup
python scripts/run_minimax_m3_1_flash.py --model-name MiniMax-M3.1-Flash-4layer-bf16 --num-nodes 1

# Full model on 8 nodes of 4 GB300 GPUs, with the nodes joined to one ray cluster
MILES_SCRIPT_EXTERNAL_RAY=1 python scripts/run_minimax_m3_1_flash.py \\
    --model-name MiniMax-M3.1-Flash-bf16 --num-nodes 8
`})}),`
`,e.jsx(n.h2,{children:"Acknowledgments"}),`
`,e.jsx(n.p,{children:`Thanks to the MiniMax, NVIDIA, and AMD teams for collaborating with the SGLang &
Miles team on day-0 support for MiniMax M3.1 Flash.`}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"MiniMax"}),": Zhi Zhang, Hai Cheng, Tong Chen, Liyuan Zhang, Yudong Pan, Jingxin Li"]})]})}function sn(t={}){const{wrapper:n}=t.components||{};return n?e.jsx(n,{...t,children:e.jsx(q,{...t})}):q(t)}function cn(){return e.jsx(Me,{tags:["Day-0 Support"],meta:e.jsx("time",{dateTime:"2026-10-22",className:"text-sm font-medium text-muted-foreground",children:"October 22, 2026"}),title:"SGLang and Miles Add Day-0 Support for MiniMax M3.1 Flash",articleWidth:"wide",children:e.jsx(sn,{})})}export{cn as default};
