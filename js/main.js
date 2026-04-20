/* ======================================================
   js/main.js
   互動邏輯、行事曆渲染與 UI 狀態管理
====================================================== */

/* ── STATE ── */
let curY=2026, curM=7, mode='grid';
const MN=['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'];
const MS=86400000;

function D(y,m,d){return new Date(y,m,d);}
function adjYM(y,m){if(m<0){m+=12;y--}if(m>11){m-=12;y++}return{y,m};}

/* ── BUILD FLAT RANGE LIST ── */
function buildRangeItems(){
  const items=[];
  EVENTS.forEach(ev=>{
    ev.ranges.forEach(r=>{
      items.push({ev, r, rs:D(r.sy,r.sm,r.sd), re:D(r.ey,r.em,r.ed), label:r.label});
    });
  });
  return items;
}

/* ── RENDER ── */
function render(){
  document.getElementById('calLabel').innerHTML=`${curY} 年 <span>${MN[curM]}</span>`;
  if(mode==='grid') renderGrid(); else renderAgenda();
}

function renderGrid(){
  const body=document.getElementById('calBody');
  body.innerHTML='';

  const{y:py,m:pm}=adjYM(curY,curM-1);
  const{y:ny,m:nm}=adjYM(curY,curM+1);
  const firstDay=new Date(curY,curM,1).getDay();
  const dim=new Date(curY,curM+1,0).getDate();
  const prevDim=new Date(curY,curM,0).getDate();

  const days=[];
  for(let i=firstDay-1;i>=0;i--) days.push({y:py,m:pm,d:prevDim-i,o:true});
  for(let d=1;d<=dim;d++) days.push({y:curY,m:curM,d,o:false});
  let nd=1;
  while(days.length%7) days.push({y:ny,m:nm,d:nd++,o:true});

  const today=new Date();
  const allRanges=buildRangeItems();

  for(let w=0;w<days.length/7;w++){
    const week=days.slice(w*7,w*7+7);
    const wEl=document.createElement('div');
    wEl.className='cal-week';

    const dnEl=document.createElement('div');
    dnEl.className='week-dnums';
    week.forEach(day=>{
      const isTod=!day.o&&day.y===today.getFullYear()&&day.m===today.getMonth()&&day.d===today.getDate();
      const c=document.createElement('div');
      c.className='dn-cell'+(day.o?' other':'')+(isTod?' today':'');
      c.innerHTML=isTod?`<span class="dn-inner">${day.d}</span>`:`<span>${day.d}</span>`;
      dnEl.appendChild(c);
    });
    wEl.appendChild(dnEl);

    const ws=D(week[0].y,week[0].m,week[0].d);
    const we=D(week[6].y,week[6].m,week[6].d);

    const items=[];
    allRanges.forEach(({ev,rs,re,label})=>{
      if(re<ws||rs>we) return;
      const cs=rs<ws?ws:rs, ce=re>we?we:re;
      const sc=Math.round((cs-ws)/MS), ec=Math.round((ce-ws)/MS);
      items.push({ev,sc,ec,label, cl:rs<ws, cr:re>we, isSt:rs>=ws});
    });

    items.sort((a,b)=>a.sc!==b.sc?a.sc-b.sc:(b.ec-b.sc)-(a.ec-a.sc));

    const laneEnd=[];
    items.forEach(item=>{
      let ln=0;
      while(laneEnd[ln]!==undefined&&laneEnd[ln]>=item.sc) ln++;
      laneEnd[ln]=item.ec;
      item.ln=ln;
    });

    if(items.length){
      const eg=document.createElement('div');
      eg.className='week-egrid';
      const numL=Math.max(...items.map(i=>i.ln))+1;
      eg.style.gridTemplateRows=`repeat(${numL},18px)`;
      items.forEach(item=>{
        const bar=document.createElement('div');
        bar.className='evt-bar'+(item.cl?' cl':'')+(item.cr?' cr':'');
        bar.style.background=item.ev.color;
        bar.style.gridColumn=`${item.sc+1}/${item.ec+2}`;
        bar.style.gridRow=`${item.ln+1}`;
        bar.textContent=item.isSt?item.label:'';
        bar.title=`${item.ev.name}：${item.label}`;
        bar.addEventListener('click',()=>openModal(item.ev));
        eg.appendChild(bar);
      });
      wEl.appendChild(eg);
    } else {
      const emp=document.createElement('div');
      emp.className='week-empty';
      wEl.appendChild(emp);
    }
    body.appendChild(wEl);
  }
}

function renderAgenda(){
  const el=document.getElementById('calList');
  el.innerHTML='';
  const ms=D(curY,curM,1), me=D(curY,curM+1,0);
  const allRanges=buildRangeItems();
  const rows=[];
  allRanges.forEach(({ev,rs,re,label})=>{
    if(re<ms||rs>me) return;
    rows.push({ev,rs,re,label});
  });
  rows.sort((a,b)=>a.rs-b.rs);

  if(!rows.length){
    el.innerHTML='<div style="padding:30px;text-align:center;color:var(--muted);font-size:13px">本月無排定活動</div>';
    return;
  }
  const wrap=document.createElement('div');
  wrap.innerHTML=`<div class="ag-month-title">${curY}年 ${MN[curM]}</div>`;
  rows.forEach(({ev,rs,re,label})=>{
    const f=d=>`${d.getMonth()+1}/${d.getDate()}`;
    const ds=rs.getTime()===re.getTime()?f(rs):`${f(rs)} ～ ${f(re)}`;
    const item=document.createElement('div');
    item.className='ag-item';
    item.innerHTML=`<div class="ag-dot" style="background:${ev.color}"></div>
      <div>
        <div class="ag-date">${ds}</div>
        <div class="ag-name">${label}</div>
        <div class="ag-phase">${ev.name}</div>
      </div>`;
    item.addEventListener('click',()=>openModal(ev));
    wrap.appendChild(item);
  });
  el.appendChild(wrap);
}

function renderLegend(){
  const el=document.getElementById('calLegend');
  EVENTS.forEach(ev=>{
    const item=document.createElement('div');
    item.className='leg-item';
    item.innerHTML=`<div class="leg-dot" style="background:${ev.color}"></div>${ev.name}`;
    item.addEventListener('click',()=>openModal(ev));
    el.appendChild(item);
  });
}

/* ── MODAL ── */
function openModal(ev){
  document.getElementById('mBar').style.background=ev.color;
  document.getElementById('mTag').textContent=ev.category;
  document.getElementById('mTag').style.background=ev.color;
  document.getElementById('mTitle').textContent=ev.name;
  document.getElementById('mDesc').textContent=ev.desc;
  const tl=document.getElementById('mTl');
  tl.innerHTML='';
  ev.timeline.forEach(t=>{
    tl.innerHTML+=`<div class="tl-row2">
      <div class="tl-dot2" style="background:${ev.color}"></div>
      <div><div class="tl-date2">${t.date}</div>
      <div class="tl-label2">${t.label}</div></div></div>`;
  });
  document.getElementById('overlay').classList.add('open');
  document.body.style.overflow='hidden';
}
function closeModal(){
  document.getElementById('overlay').classList.remove('open');
  document.body.style.overflow='';
}

/* ── DOM READY INIT & LISTENERS ── */
document.addEventListener('DOMContentLoaded', () => {
  render();
  renderLegend();

  // Modal Listeners
  document.getElementById('mClose').onclick=closeModal;
  document.getElementById('overlay').addEventListener('click',e=>{
    if(e.target===e.currentTarget)closeModal();
  });
  document.addEventListener('keydown',e=>{if(e.key==='Escape')closeModal();});

  // View Toggle
  document.getElementById('btnGrid').onclick=()=>{
    mode='grid';
    document.getElementById('calGrid').style.display='';
    document.getElementById('calList').style.display='none';
    document.getElementById('btnGrid').classList.add('active');
    document.getElementById('btnList').classList.remove('active');
    render();
  };
  document.getElementById('btnList').onclick=()=>{
    mode='list';
    document.getElementById('calGrid').style.display='none';
    document.getElementById('calList').style.display='block';
    document.getElementById('btnGrid').classList.remove('active');
    document.getElementById('btnList').classList.add('active');
    render();
  };

// Month Nav (限制範圍：2026年8月 ~ 2027年7月)
  // 注意：JavaScript 的月份是從 0 開始算（7 代表 8 月，6 代表 7 月）
  document.getElementById('prevM').onclick = () => {
    if (curY === 2026 && curM === 7) {
      // 如果目前是 2026年8月，再往前按就跳轉到 2027年7月
      curY = 2027;
      curM = 6;
    } else {
      curM--;
      if (curM < 0) { curM = 11; curY--; }
    }
    render();
  };

  document.getElementById('nextM').onclick = () => {
    if (curY === 2027 && curM === 6) {
      // 如果目前是 2027年7月，再往後按就跳轉回 2026年8月
      curY = 2026;
      curM = 7;
    } else {
      curM++;
      if (curM > 11) { curM = 0; curY++; }
    }
    render();
  };

  // Smooth Scroll
  function goTo(id){
    const el=document.getElementById(id);
    if(!el) return;
    const navH=document.querySelector('.jump-nav').offsetHeight;
    const y=el.getBoundingClientRect().top+window.scrollY-navH-6;
    window.scrollTo({top:y,behavior:'smooth'});
  }
  document.querySelectorAll('.jump-nav a').forEach(a=>{
    a.addEventListener('click',e=>{e.preventDefault();goTo(a.dataset.sec);});
  });
  document.querySelectorAll('.hero-btns a').forEach(a=>{
    if(a.hasAttribute('target')) return;
    a.addEventListener('click',e=>{
      const id=a.getAttribute('href').replace('#','');
      if(document.getElementById(id)){e.preventDefault();goTo(id);}
    });
  });

  // Dark Mode
  const html=document.documentElement, dBtn=document.getElementById('darkBtn');
  dBtn.onclick=()=>{
    const dark=html.dataset.theme==='dark';
    html.dataset.theme=dark?'light':'dark';
    dBtn.textContent=dark?'🌙':'☀️';
    localStorage.setItem('theme',html.dataset.theme);
  };
  if(localStorage.getItem('theme')==='dark'){html.dataset.theme='dark';dBtn.textContent='☀️';}

  // Back to Top & Scroll Active Spy
  const topBtn=document.getElementById('topBtn');
  topBtn.onclick=()=>window.scrollTo({top:0,behavior:'smooth'});

  const anchors=['cal-anchor','recruit-anchor','commerce-anchor','cross-anchor','campus-anchor','reform-anchor'];
  const navLinks=document.querySelectorAll('.jump-nav a');
  const prog=document.getElementById('prog');

  window.addEventListener('scroll',()=>{
    const pct=window.scrollY/(document.body.scrollHeight-window.innerHeight);
    prog.style.width=(pct*100)+'%';
    topBtn.classList.toggle('vis',window.scrollY>300);
    let cur='';
    anchors.forEach(id=>{
      const el=document.getElementById(id);
      if(el&&el.getBoundingClientRect().top<=60) cur=id;
    });
    navLinks.forEach(a=>a.classList.toggle('active',a.dataset.sec===cur));
  },{passive:true});

  // Fade In Observer
  const obs=new IntersectionObserver(entries=>{
    entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('vis');});
  },{threshold:0.07});
  document.querySelectorAll('.fade-up').forEach(el=>obs.observe(el));
});