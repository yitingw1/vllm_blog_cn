// Interactive Figure 3 for the GLM-5.3 Part 2 post: one prefill layer on 8 GPUs under DP8, TP8, PCP8 and PCP8 x DCP8.
(function(){
// Client-side navigation can mount #ppx after this script has already run, so
// (re)initialise whenever an uninitialised #ppx appears.
function init(){
var root=document.getElementById("ppx");if(!root||root.classList.contains("ppx"))return;
var st=document.createElement("style");st.setAttribute("data-ppx","");st.textContent=String.raw`
.ppx{--bg:#ffffff;--fg:#17202b;--muted:#5b6878;--faint:#8a96a5;--line:#dde3ea;--cell:#eef2f6;--kv:#13897a;--new:#4f8fd6;--q:#5b4fd1;--tmp:#e08a4c;--tmp-soft:#f7d9c3;--wire:#d4762f;--wire-soft:#fdf0e5;--cur:#efedfc;--dot:#1d1640;--mono:"JetBrains Mono",ui-monospace,SFMono-Regular,Menlo,monospace;color:var(--fg);font-size:15px;line-height:1.55;margin:28px 0 8px;display:grid;gap:14px}
@media (prefers-color-scheme:dark){.ppx{--bg:#161d25;--fg:#e6ebf1;--muted:#9aa7b6;--faint:#6c7887;--line:#2a3440;--cell:#1f2832;--kv:#2bb5a2;--new:#5d9fe2;--q:#b3a9ff;--tmp:#f0a06a;--tmp-soft:#5a3a24;--wire:#f0a06a;--wire-soft:#2d2119;--cur:#252244;--dot:#f4f1ff}}
.ppx *{box-sizing:border-box}
.ppx .ppx-modes{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:8px}
.ppx .ppx-mode{all:unset;cursor:pointer;background:var(--bg);border:1px solid var(--line);border-radius:10px;padding:10px 12px;display:grid;gap:2px}
.ppx .ppx-mode:hover{border-color:var(--faint)}
.ppx .ppx-mode:focus-visible,.ppx .ppx-pill:focus-visible,.ppx .ppx-btn:focus-visible{outline:2px solid var(--q);outline-offset:2px}
.ppx .ppx-mode b{font-weight:700;font-size:15px;line-height:1.2}
.ppx .ppx-mode span{font-size:12.5px;color:var(--muted)}
.ppx .ppx-mode[aria-pressed="true"]{border-color:var(--q);box-shadow:0 0 0 1px var(--q) inset}
.ppx .ppx-panel{background:var(--bg);border:1px solid var(--line);border-radius:14px;padding:18px;display:grid;gap:16px;min-width:0}
.ppx .ppx-timeline{display:flex;gap:3px;flex-wrap:wrap}
.ppx .ppx-pill{all:unset;cursor:pointer;display:flex;align-items:center;gap:5px;padding:3px 8px 3px 3px;border-radius:999px;border:1px solid var(--line);font-size:12px;color:var(--muted);white-space:nowrap}
.ppx .ppx-pill i{font:500 10.5px/1 var(--mono);font-style:normal;width:20px;height:20px;border-radius:50%;display:grid;place-items:center;background:var(--cell);color:var(--muted)}
.ppx .ppx-pill.comm i{background:var(--wire-soft);color:var(--wire)}
.ppx .ppx-pill.done{color:var(--fg)}
.ppx .ppx-pill[aria-current="step"]{border-color:var(--fg);color:var(--fg)}
.ppx .ppx-pill[aria-current="step"] i{background:var(--fg);color:var(--bg)}
.ppx .ppx-pill.comm[aria-current="step"]{border-color:var(--wire)}
.ppx .ppx-pill.comm[aria-current="step"] i{background:var(--wire);color:#fff}
.ppx .ppx-cap{display:grid;grid-template-columns:1fr auto;gap:4px 12px;align-items:baseline}
.ppx .ppx-t{font-weight:700;font-size:17px;line-height:1.3;margin:0}
.ppx .ppx-d{grid-column:1/3;margin:0;color:var(--muted)}
.ppx .ppx-nav{display:flex;gap:6px;align-self:start}
.ppx .ppx-btn{all:unset;cursor:pointer;font-size:13px;line-height:1;padding:8px 12px;border-radius:8px;border:1px solid var(--line);color:var(--fg)}
.ppx .ppx-btn:hover{border-color:var(--faint)}
.ppx .ppx-scroll{overflow-x:auto}
.ppx .ppx-grid{min-width:600px;display:grid;gap:5px}
.ppx .ppx-hdr,.ppx .ppx-row{display:grid;grid-template-columns:58px minmax(0,1fr) 14px 84px;align-items:center}
.ppx .ppx-hdr{font:500 10.5px/1.3 var(--mono);letter-spacing:.06em;text-transform:uppercase;color:var(--faint);padding-bottom:4px}
.ppx .ppx-lbl{font:500 12px/1 var(--mono);color:var(--muted)}
.ppx .ppx-axis{display:grid;grid-template-columns:repeat(32,minmax(0,1fr));gap:3px}
.ppx .ppx-ruler{row-gap:2px;align-items:end}
.ppx .ppx-title{grid-column:1/33;color:var(--muted)}
.ppx .ppx-seg{position:relative;padding:0 2px 8px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.ppx .ppx-seg::after{content:"";position:absolute;left:0;right:0;bottom:0;height:5px;border:1px solid var(--faint);border-top:0}
.ppx .ppx-seg.ctx{grid-column:1/17}
.ppx .ppx-seg.cur{grid-column:17/33}
.ppx .ppx-heads{display:grid;grid-template-columns:repeat(8,minmax(0,1fr));gap:2px}
.ppx .c{height:18px;border-radius:4px;background:var(--cell);display:grid;place-items:center}
.ppx .c.stored{background:var(--kv)}
.ppx .c.new{background:var(--bg);box-shadow:inset 0 0 0 2px var(--new)}
.ppx .c.new.q{box-shadow:inset 0 0 0 2px var(--new),0 0 0 2px var(--bg),0 0 0 4px var(--q)}
.ppx .c.temp{background:var(--tmp-soft);box-shadow:inset 0 0 0 1px var(--tmp)}
.ppx .c.q{box-shadow:0 0 0 2px var(--bg),0 0 0 4px var(--q)}
.ppx .c.rx::after{content:"";width:6px;height:6px;border-radius:50%;background:var(--dot)}
.ppx .h{height:18px;border-radius:3px;background:var(--cell);display:grid;place-items:center}
.ppx .h.rx::after{content:"";width:4px;height:4px;border-radius:50%;background:var(--dot)}
.ppx .c.q.act{box-shadow:0 0 0 2px var(--bg),0 0 0 5px var(--q)}
.ppx .h.on{background:var(--q)}
.ppx .ppx-row.dim{opacity:.28}
.ppx .ppx-wire{display:grid;grid-template-columns:58px 1fr;align-items:center;margin-top:6px}
.ppx .ppx-lane{position:relative;height:36px;border-radius:8px;border:1px dashed var(--line);display:flex;align-items:center;gap:10px;padding:0 12px;overflow:hidden;color:var(--faint);font-size:13px}
.ppx .ppx-lane.on{border:1px solid var(--wire);background:var(--wire-soft);color:var(--fg)}
.ppx .ppx-tag{font:500 11px/1 var(--mono);letter-spacing:.06em;text-transform:uppercase;color:var(--wire);white-space:nowrap}
.ppx .ppx-vol{font-family:var(--mono);font-size:12px;color:var(--muted);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.ppx .ppx-pips{position:absolute;left:0;right:0;bottom:0;height:3px;opacity:0}
.ppx .ppx-lane.on .ppx-pips{opacity:1;background:repeating-linear-gradient(90deg,var(--wire) 0 10px,transparent 10px 22px);background-size:22px 3px}
@media (prefers-reduced-motion:no-preference){.ppx .ppx-lane.on .ppx-pips{animation:ppx-flow .9s linear infinite}.ppx .chg{animation:ppx-pop .45s ease-out}.ppx .c.enter{animation:ppx-enter .45s ease-out}.ppx .ppx-heads.act .h.on{animation:ppx-pulse 1.2s ease-in-out infinite}.ppx .c.q.act{animation:ppx-ring 1.2s ease-in-out infinite}}
@keyframes ppx-pulse{50%{opacity:.55}}
@keyframes ppx-enter{from{transform:translateX(14px);opacity:0}}
@keyframes ppx-ring{50%{box-shadow:0 0 0 2px var(--bg),0 0 0 3px var(--q)}}
@keyframes ppx-flow{to{background-position:22px 0}}
@keyframes ppx-pop{0%{transform:scale(.7)}60%{transform:scale(1.12)}100%{transform:scale(1)}}
.ppx .ppx-legend{display:flex;flex-wrap:wrap;gap:6px 16px;font-size:12.5px;color:var(--muted)}
.ppx .ppx-legend span{display:inline-flex;align-items:center;gap:7px}
.ppx .sw{width:14px;height:14px;border-radius:3px;background:var(--cell);display:inline-grid;place-items:center}
.ppx .sw.kv{background:var(--kv)}.ppx .sw.new{background:transparent;box-shadow:inset 0 0 0 2px var(--new)}.ppx .sw.tmp{background:var(--tmp-soft);box-shadow:inset 0 0 0 1px var(--tmp)}.ppx .sw.h{background:var(--q)}
.ppx .sw.q{background:transparent;box-shadow:0 0 0 2px var(--q) inset}
.ppx .sw.rx::after{content:"";width:5px;height:5px;border-radius:50%;background:var(--dot)}
.ppx table{width:100%;min-width:640px;border-collapse:collapse;font-size:13px;margin:0;border:0}
.ppx th,.ppx td{text-align:left;padding:8px 10px;border:0;border-bottom:1px solid var(--line);vertical-align:top;background:transparent;color:var(--fg)}
.ppx th{font:500 10.5px/1.3 var(--mono);letter-spacing:.06em;text-transform:uppercase;color:var(--faint)}
.ppx td:first-child{font-weight:700;white-space:nowrap}
.ppx tr,.ppx tbody tr:nth-child(even){background:transparent}
.ppx tr.cur td{background:var(--cur)}
.ppx tr.cur td:first-child{box-shadow:3px 0 0 var(--q) inset}
.ppx .ok{color:var(--kv);font-weight:500}.ppx .no{color:var(--muted)}
.ppx .ppx-foot{font-size:12px;color:var(--faint);margin:0}
@media (max-width:640px){.ppx .ppx-modes{grid-template-columns:repeat(2,minmax(0,1fr))}.ppx .ppx-cap{grid-template-columns:1fr}.ppx .ppx-nav{grid-column:1;grid-row:3}.ppx .ppx-d{grid-column:1}.ppx .ppx-btn{flex:1;text-align:center}}
.ppx [hidden]{display:none!important}`;
root.classList.add("ppx");
root.innerHTML=`<div class="ppx-modes" role="group" aria-label="Parallelism scheme">
<button class="ppx-mode" data-m="0"><b>DP8</b><span>拆分请求</span></button>
<button class="ppx-mode" data-m="1"><b>TP8</b><span>拆分注意力头</span></button>
<button class="ppx-mode" data-m="2"><b>PCP8</b><span>拆分 query token</span></button>
<button class="ppx-mode" data-m="3"><b>PCP8 × DCP8</b><span>拆分 query 与 KV</span></button>
</div>
<div class="ppx-panel" tabindex="0" aria-label="逐步视图；使用左右方向键切换步骤">
<div class="ppx-timeline" id="ppx-timeline"></div>
<div class="ppx-cap" aria-live="polite"><p class="ppx-t" id="ppx-t"></p><div class="ppx-nav"><button class="ppx-btn" id="ppx-play" aria-pressed="true">暂停</button><button class="ppx-btn" id="ppx-prev" aria-label="上一步">← 上一步</button><button class="ppx-btn" id="ppx-next" aria-label="下一步">下一步 →</button></div><p class="ppx-d" id="ppx-d"></p></div>
<div class="ppx-scroll"><div class="ppx-grid" id="ppx-grid"></div></div>
<div class="ppx-legend"><span data-k="kv"><i class="sw kv"></i>已在 KV 缓存中</span><span data-k="new"><i class="sw new"></i>新 KV，尚未写入缓存</span><span data-k="tmp"><i class="sw tmp"></i>临时副本，本层结束后释放</span><span data-k="q"><i class="sw q"></i>在此计算 query</span><span data-k="h"><i class="sw h"></i>在此计算注意力头</span><span data-k="rx"><i class="sw rx"></i>从其他 GPU 接收</span></div>
</div>
<div class="ppx-panel">
<div class="ppx-scroll">
<table>
<thead><tr><th>方案</th><th>拆分维度</th><th>每张 GPU 的 KV</th><th>每张 GPU 的 query 工作</th><th>每层注意力通信</th><th>100 万 token 提示词</th></tr></thead>
<tbody id="ppx-cmp">
<tr><td>DP8</td><td>请求</td><td>完整，仅位于一张 GPU</td><td>全部 token、64 个头，位于一张 GPU</td><td>无</td><td class="no">无法容纳</td></tr>
<tr><td>TP8</td><td>注意力头</td><td>完整，复制 8 份</td><td>全部 token、8 个头；索引器重复 8 次</td><td>对输出执行 all-reduce</td><td class="no">无法容纳</td></tr>
<tr><td>PCP8</td><td>query token</td><td>完整，复制 8 份</td><td>1/8 token、64 个头</td><td>对新 KV 执行 all-gather</td><td class="no">无法容纳</td></tr>
<tr><td>PCP8 × DCP8</td><td>query 与 KV</td><td>1/8（100 万 token 时为 6.7 GiB）</td><td>1/8 token、64 个头</td><td>新 KV + 完整上下文 gather</td><td class="ok">可以容纳</td></tr>
</tbody>
</table>
</div>
<p class="ppx-foot">C 表示此前步骤已预填充的 token；N 表示本步的 token，最多 16,384（预填充引擎的 max-num-batched-tokens）。100 万 token 的提示词需要 64 步，C 每步增加 N。每个格子代表一组 token；DCP 实际按单个 token 轮询分配（token i 位于 GPU i mod 8）。四种方案的 MoE 专家并行通信相同，因此图中省略。</p>
</div>`;
root.insertBefore(st,root.firstChild);
var own=function(g,i){return i===g||i===15-g};
var ALL=[0,1,2,3,4,5,6,7];
var MODES=[
 {rows:function(g){return g>0?"dim":""},heads:function(g){return g===0?ALL:[]},
  steps:[
   ["开始","整个请求位于 GPU 0。其余七张 GPU 服务其他请求，无法协助处理这个提示词。"],
   ["计算","只有 GPU 0 为全部 16 个分块、全部 64 个头计算 query 和新 KV。"],
   ["写入","GPU 0 把新 KV 写入自己的缓存。"],
   ["注意力","GPU 0 对全部 16 个分块在本地缓存上运行索引器和稀疏注意力。无需通信，但一张 GPU 承担该提示词的全部注意力并保存全部 KV。"],
   ["下一步","本步 token 加入 GPU 0 的较早上下文，随后开始处理提示词的下一分块。上下文持续在单张 GPU 上增长。"]],
  cell:function(g,r,i,s){if(g>0)return{};if(r===0)return{kv:"stored"};return{kv:s===0?"":s===1?"new":"stored",q:true}}},
 {rows:function(){return""},heads:function(g){return[g]},
  steps:[
   ["开始","每张 GPU 都保存完整上下文。MLA 的 latent KV 由全部 64 个头共享，因此无法按头拆分。"],
   ["计算","每张 GPU 都为 16 个分块计算新 KV（共八份相同副本），并为所有 token 计算 query，但只处理自己负责的 8 个头。"],
   ["写入","每张 GPU 都把相同的完整新 KV 写入缓存。"],
   ["注意力","每张 GPU 都重复运行完整索引器，再仅为自己的 8 个头处理所有 token 的注意力。"],
   ["All-reduce","每张 GPU 用输出投影中自己的分片处理 8 个头的输出，为每个 token 得到部分隐藏状态。all-reduce 汇总八份局部结果，使每张 GPU 都获得每个 token 的完整输出。",["All-reduce","attention output · N tokens × 6,144 hidden, BF16"]],
   ["下一步","本步 token 加入较早上下文，随后开始下一分块。每张 GPU 上相同的完整副本继续增长。"]],
  cell:function(g,r,i,s){if(r===0)return{kv:"stored"};return{kv:s===0?"":s===1?"new":"stored",q:true}}},
 {rows:function(){return""},heads:function(){return ALL},
  steps:[
   ["开始","每张 GPU 保存较早上下文的完整副本，并负责本步的两个 query 分块 g 与 15 − g，以及全部 64 个头。"],
   ["计算","每张 GPU 只为自己负责的两个分块计算 query 和新 KV。"],
   ["聚合新 KV","每张 GPU 接收本步其余的新 KV。",["All-gather","new KV · each GPU receives 7/8 × N tokens"]],
   ["写入","每张 GPU 写入全部新 KV，因此每张都保留完整上下文副本。"],
   ["注意力","每张 GPU 在本地完整缓存上，为自己的两个分块运行索引器和稀疏注意力；此后不再需要通信。"],
   ["下一步","本步 token 加入较早上下文，下一分块以同样方式拆分。每张 GPU 都继续保存不断增长的完整副本。"]],
  cell:function(g,r,i,s){if(r===0)return{kv:"stored"};var q=own(g,i);
   if(s===0)return{q:q};if(s===1)return{kv:q?"new":"",q:q};if(s===2)return{kv:"new",q:q,rx:!q};return{kv:"stored",q:q}}},
 {rows:function(){return""},heads:function(){return ALL},
  steps:[
   ["开始","每张 GPU 只保存较早上下文的八分之一（token i 位于 GPU i mod 8）。query 与 PCP 相同，拆分为分块 g 和 15 − g。"],
   ["计算","每张 GPU 只为自己负责的两个分块计算 query 和新 KV。"],
   ["聚合新 KV","每张 GPU 接收本步其余的新 KV。",["All-gather","new KV · each GPU receives 7/8 × N tokens"]],
   ["写入","每张 GPU 只写入自己拥有的新 token（i mod 8 = g），并丢弃其余部分。它负责的 query 分块与保存的 KV 不再重合。"],
   ["聚合 KV 分片","每张 GPU 从所有 GPU 的分片组合出完整上下文的临时副本。",["All-gather","KV shards + indexer keys · each GPU receives 7/8 × (C + N) tokens, BF16"]],
   ["注意力","每张 GPU 在临时副本上，为自己负责的两个分块运行索引器和稀疏注意力。"],
   ["Free","The copy is freed; only the 1/8 shards stay resident."],
   ["下一步","本步 token 继续以轮询方式加入较早上下文，因此每张 GPU 保存更大上下文的八分之一。下一分块仍以相同方式拆分。"]],
  cell:function(g,r,i,s){var q=r===1&&own(g,i),mine=i%8===g,tmp=s===4||s===5;
   if(r===0)return{kv:mine?"stored":tmp?"temp":""};
   if(s===0)return{q:q};if(s===1)return{kv:q?"new":"",q:q};if(s===2)return{kv:"new",q:q,rx:!q};
   return{kv:mine?"stored":tmp?"temp":"",q:q}}}
];
var mode=3,step=0,prev={};
function $(id){return document.getElementById(id)}
function render(fresh){
  var m=MODES[mode],st=m.steps[step],comm=st[2],h,g,r,i,k;
  root.querySelectorAll(".ppx-mode").forEach(function(b,k){b.setAttribute("aria-pressed",k===mode)});
  [].forEach.call($("ppx-cmp").rows,function(tr,k){tr.classList.toggle("cur",k===mode)});
  $("ppx-timeline").innerHTML=m.steps.map(function(s,k){
    return '<button class="ppx-pill'+(s[2]?" comm":"")+(k<step?" done":"")+'" data-s="'+k+'"'+(k===step?' aria-current="step"':"")+"><i>"+(k+1)+"</i>"+s[0]+"</button>"}).join("");
  $("ppx-t").textContent=st[0];
  $("ppx-d").textContent=st[1];
  h='<div class="ppx-hdr"><span></span><div class="ppx-axis ppx-ruler"><span class="ppx-title">Token position in the request\'s block table →</span><span class="ppx-seg ctx">较早上下文 · '+(st[0]==="下一步"?"C + N":"C")+' tokens</span><span class="ppx-seg cur">'+(st[0]==="下一步"?"下一步":"本步")+' · N tokens · 16 个 query 分块</span></div><span></span><span>注意力头</span></div>';
  var att=st[0]==="注意力",ar=st[0]==="All-reduce",nxt=st[0]==="下一步",next={};
  function cellAt(g,r,i){if(!nxt)return m.cell(g,r,i,step);var c=m.cell(g,r,i,0);return r===0?c:{q:c.q}}
  function cls(key,base,fill){next[key]=fill;return base+(fresh&&fill&&prev[key]!==undefined&&prev[key]!==fill&&prev[key]!==fill+"+"?" chg":"")}
  for(g=0;g<8;g++){
    h+='<div class="ppx-row '+m.rows(g)+'"><span class="ppx-lbl">GPU '+g+"</span>";
    h+='<div class="ppx-axis">';
    for(r=0;r<2;r++){
      for(i=0;i<16;i++){var c=cellAt(g,r,i),x="c "+(c.kv||"");
        if(c.q)x+=" q";
        if(c.rx)x+=" rx";
        if(att&&c.q)x+=" act";
        if(ar&&r===1&&c.q)x+=" rx";
        if(nxt&&fresh&&r===1)x+=" enter";
        h+='<div class="'+cls(g+"-"+r+"-"+i,x,(c.kv||"")+(nxt&&r===0&&c.kv?"+":""))+'"></div>'}
    }
    h+="</div>";
    var hs=m.heads(g);
    h+='<span></span><div class="ppx-heads'+(att&&hs.length?" act":"")+'">'+ALL.map(function(k){
      var on=hs.indexOf(k)>=0,x="h"+(on?" on":"");
      return '<div class="'+cls(g+"-h"+k,x,on?"on":"")+'"></div>'}).join("")+"</div></div>";
  }
  prev=next;
  h+='<div class="ppx-wire"><span class="ppx-lbl">Wire</span><div class="ppx-lane'+(comm?" on":"")+'">'
    +(comm?'<span class="ppx-tag">'+comm[0]+'</span><span class="ppx-vol">'+comm[1]+"</span>":"<span>No communication in 本步</span>")
    +'<span class="ppx-pips"></span></div></div>';
  $("ppx-grid").innerHTML=h;
  root.querySelectorAll(".ppx-pill").forEach(function(p){p.onclick=function(){manual();step=+p.dataset.s;render(true)}});
}
function legend(){
  var m=MODES[mode],u={},s,g,r,i,c;
  for(s=0;s<m.steps.length;s++)for(g=0;g<8;g++){
    if(m.heads(g).length)u.h=1;
    if(m.steps[s][0]==="All-reduce")u.rx=1;
    for(r=0;r<2;r++)for(i=0;i<16;i++){c=m.cell(g,r,i,s);
      if(c.kv==="stored")u.kv=1;if(c.kv==="new")u["new"]=1;if(c.kv==="temp")u.tmp=1;if(c.q)u.q=1;if(c.rx)u.rx=1}}
  root.querySelectorAll(".ppx-legend [data-k]").forEach(function(e){e.hidden=!u[e.getAttribute("data-k")]});
}
function go(d){var n=MODES[mode].steps.length;step=(step+d+n)%n;render(true)}
$("ppx-prev").onclick=function(){manual();go(-1)};$("ppx-next").onclick=function(){manual();go(1)};
root.querySelectorAll(".ppx-mode").forEach(function(b){b.onclick=function(){mode=+b.dataset.m;step=0;prev={};legend();render(false);schedule()}});
root.addEventListener("keydown",function(e){
  if(e.key==="ArrowRight"){manual();go(1);e.preventDefault()}
  if(e.key==="ArrowLeft"){manual();go(-1);e.preventDefault()}
});
// Autoplay: step through the scheme while the figure is on screen; any manual
// step pauses it, and reduced-motion users start paused.
var playing=!(window.matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches),visible=!("IntersectionObserver" in window),timer=null;
function schedule(){
  clearTimeout(timer);timer=null;
  if(!playing||!visible||document.hidden||!root.isConnected)return;
  var last=step===MODES[mode].steps.length-1;
  timer=setTimeout(function(){timer=null;if(!root.isConnected)return;go(1);schedule()},last?2600:1700);
}
function setPlaying(p){
  playing=p;var b=$("ppx-play");
  b.textContent=p?"暂停":"Play";b.setAttribute("aria-pressed",String(p));
  b.setAttribute("aria-label",p?"暂停 autoplay":"自动播放步骤");
  root.querySelector(".ppx-cap").setAttribute("aria-live",p?"off":"polite");
  schedule();
}
function manual(){if(playing)setPlaying(false)}
$("ppx-play").onclick=function(){setPlaying(!playing)};
if("IntersectionObserver" in window)new IntersectionObserver(function(es){visible=es[0].isIntersecting;schedule()},{threshold:0.3}).observe(root);
document.addEventListener("visibilitychange",schedule);
legend();
render(false);
setPlaying(playing);
}
init();
new MutationObserver(init).observe(document.documentElement,{childList:true,subtree:true});
})();
