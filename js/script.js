const EVENTS = [
  {
    id:'recruit', name:'儲備幹部招募', color:'#4f86c6', category:'行政',
    desc:'透過書面審查與面試制度，遴選具責任感與執行力之學生加入班聯會團隊。',
    // Each phase is a separate range with its own label
    ranges:[
      {sy:2026,sm:7,sd:18,ey:2026,em:8,ed:13, label:'報名與表單填寫'},
      {sy:2026,sm:8,sd:14,ey:2026,em:8,ed:18, label:'書審與面試'},
      {sy:2026,sm:8,sd:23,ey:2026,em:8,ed:23, label:'結果公布'},
    ],
    timeline:[
      {date:'8/18 ～ 9/13',label:'報名與表單填寫'},
      {date:'9/14 ～ 9/18',label:'書審與面試'},
      {date:'9/23',label:'結果公布'},
    ]
  },
  {
    id:'commerce', name:'校商週邊', color:'#e07b54', category:'校商',
    desc:'由學生投稿商品並經投票選出年度代表性周邊，打造竹中限定商品文化。',
    ranges:[
      {sy:2026,sm:9,sd:30,ey:2026,em:10,ed:20, label:'商品預購'},
      {sy:2026,sm:11,sd:4,ey:2026,em:11,ed:4,  label:'商品發放'},
    ],
    timeline:[
      {date:'10/30 ～ 11/20',label:'商品預購'},
      {date:'12/4',label:'商品發放'},
    ]
  },
  {
    id:'christmas', name:'聯合聖誕傳情', color:'#c06070', category:'跨校',
    desc:'提供學生跨校傳遞卡片與禮物的溫馨平台，感受節日氛圍與跨校情誼。',
    ranges:[
      {sy:2026,sm:10,sd:3,ey:2026,em:10,ed:24, label:'卡片預購'},
      {sy:2026,sm:11,sd:1,ey:2026,em:11,ed:15, label:'領取與投遞'},
    ],
    timeline:[
      {date:'11/3 ～ 11/24',label:'卡片預購'},
      {date:'12/1 ～ 12/15',label:'領取與投遞'},
    ]
  },
  {
    id:'dance', name:'聯合舞會', color:'#8b5cf6', category:'跨校',
    desc:'與友校共同舉辦大型交流盛典，共舞共樂，共創美好夜晚。',
    ranges:[
      {sy:2026,sm:10,sd:4, ey:2026,em:10,ed:17, label:'門票預購'},
      {sy:2026,sm:11,sd:15,ey:2026,em:11,ed:15, label:'發放門票'},
      {sy:2026,sm:11,sd:19,ey:2026,em:11,ed:19, label:'活動舉行'},
    ],
    timeline:[
      {date:'11/4 ～ 11/17',label:'門票預購'},
      {date:'12/15',label:'發放門票'},
      {date:'12/19',label:'活動舉行'},
    ]
  },
  {
    id:'karaoke', name:'聯合卡拉OK', color:'#2e9e7a', category:'跨校',
    desc:'促進跨校交流與藝術展現，一展歌唱才華的絕佳舞台。',
    ranges:[
      {sy:2027,sm:1,sd:1, ey:2027,em:2,ed:6,  label:'報名'},
      {sy:2027,sm:2,sd:12,ey:2027,em:2,ed:13, label:'初賽'},
      {sy:2027,sm:3,sd:24,ey:2027,em:3,ed:24, label:'複賽'},
    ],
    timeline:[
      {date:'2/1 ～ 3/6',label:'報名'},
      {date:'3/12 ～ 3/13',label:'初賽'},
      {date:'4/24',label:'複賽'},
    ]
  },
  {
    id:'bazaar', name:'愛心園遊會', color:'#e8a838', category:'校內',
    desc:'結合社福團體與社區資源，推動公益參與，共創溫暖校園。',
    ranges:[
      {sy:2027,sm:2,sd:13,ey:2027,em:2,ed:13, label:'活動舉行'},
    ],
    timeline:[{date:'3/13',label:'活動舉行'}]
  },
  {
    id:'film', name:'聯合電影節', color:'#5a8fd4', category:'跨校',
    desc:'考試期間辦理跨校電影放映活動，提供學生喘息、紓壓的空間。',
    ranges:[
      {sy:2027,sm:3,sd:27,ey:2027,em:4,ed:6,  label:'門票預售'},
      {sy:2027,sm:4,sd:11,ey:2027,em:4,ed:17, label:'活動舉行'},
    ],
    timeline:[
      {date:'4/27 ～ 5/6',label:'門票預售'},
      {date:'5/11 ～ 5/17',label:'活動舉行（依考程調整）'},
    ]
  },
  {
    id:'halloween', name:'萬聖節變裝大賽', color:'#e05c2a', category:'校內',
    desc:'打破校園嚴謹氛圍，透過創意變裝展現竹中人的幽默感與藝術長才。開放學生於校內創意變裝，角逐年度最佳造型獎。',
    ranges:[
      {sy:2026,sm:9,sd:30,ey:2026,em:9,ed:30, label:'活動舉行'},
    ],
    timeline:[
      {date:'10/30',label:'活動舉行'},
    ]
  },
  {
    id:'easter', name:'復活節彩蛋尋找', color:'#4caf7d', category:'校內',
    desc:'結合校園地景與解謎機制，讓學生在課餘時間探索校園放鬆身心。於校園內放置彩蛋，尋獲即可兌換驚喜獎勵。',
    ranges:[
      {sy:2027,sm:2,sd:28,ey:2027,em:2,ed:28, label:'活動舉行'},
    ],
    timeline:[
      {date:'3/28',label:'活動舉行'},
    ]
  },
];

/* ── STATE ── */
let curY=2026, curM=7, mode='grid';
const MIN_Y=2026,MIN_M=7,MAX_Y=2027,MAX_M=5;
function isAtMin(){return curY===MIN_Y&&curM===MIN_M;}
function isAtMax(){return curY===MAX_Y&&curM===MAX_M;}
function updateNavBtns() {
  // 在循環模式下，按鈕永遠可以點擊，所以直接設為 false
  const prevBtn = document.getElementById('prevM');
  const nextBtn = document.getElementById('nextM');
  if (prevBtn) prevBtn.disabled = false;
  if (nextBtn) nextBtn.disabled = false;
}

function changeMonth(dir) {
  // 必須先定義 slide，否則後續 if(slide) 會出錯
  const slide = document.getElementById('calSlide');

  const performLogic = () => {
    curM += dir;

    // 處理標準月份進退位
    if (curM > 11) {
      curM = 0;
      curY++;
    } else if (curM < 0) {
      curM = 11;
      curY--;
    }

    // --- 核心：循環判斷邏輯 ---
    // 超過最大限制 (2027/5) 則跳回最小 (2026/7)
    if (curY > MAX_Y || (curY === MAX_Y && curM > MAX_M)) {
      curY = MIN_Y;
      curM = MIN_M;
    } 
    // 低於最小限制 (2026/7) 則跳至最大 (2027/5)
    else if (curY < MIN_Y || (curY === MIN_Y && curM < MIN_M)) {
      curY = MAX_Y;
      curM = MAX_M;
    }

    render();
    // 記得執行按鈕狀態更新（雖然循環模式下按鈕不應被禁用）
    updateNavBtns();
  };

  if (slide) {
    const outX = dir > 0 ? '-30px' : '30px';
    const inX = dir > 0 ? '30px' : '-30px';
    
    // 出場動畫
    slide.style.cssText = `transition:transform .2s ease,opacity .2s ease;transform:translateX(${outX});opacity:0`;
    
    setTimeout(() => {
      performLogic(); 
      
      // 準備進場位置
      slide.style.cssText = `transition:none;transform:translateX(${inX});opacity:0`;
      
      // 進場動畫
      requestAnimationFrame(() => requestAnimationFrame(() => {
        slide.style.cssText = 'transition:transform .2s ease,opacity .2s ease;transform:translateX(0);opacity:1';
      }));
    }, 185);
  } else {
    performLogic();
  }
}
const MN=['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'];
const MS=86400000;

function D(y,m,d){return new Date(y,m,d);}
function adjYM(y,m){if(m<0){m+=12;y--}if(m>11){m-=12;y++}return{y,m};}

/* ── BUILD FLAT RANGE LIST (one entry per range, not per event) ── */
function buildRangeItems(){
  const items=[];
  EVENTS.forEach(ev=>{
    ev.ranges.forEach(r=>{
      items.push({ev, r,
        rs:D(r.sy,r.sm,r.sd),
        re:D(r.ey,r.em,r.ed),
        label:r.label
      });
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

    // Day numbers row
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

    // Week bounds
    const ws=D(week[0].y,week[0].m,week[0].d);
    const we=D(week[6].y,week[6].m,week[6].d);

    // Collect ranges that overlap this week
    const items=[];
    allRanges.forEach(({ev,rs,re,label})=>{
      if(re<ws||rs>we) return;
      const cs=rs<ws?ws:rs, ce=re>we?we:re;
      const sc=Math.round((cs-ws)/MS), ec=Math.round((ce-ws)/MS);
      items.push({ev,sc,ec,label,
        cl:rs<ws,  // continues from left (prev week)
        cr:re>we,  // continues to right (next week)
        isSt:rs>=ws // starts in this week
      });
    });

    // Sort by start col, then span descending
    items.sort((a,b)=>a.sc!==b.sc?a.sc-b.sc:(b.ec-b.sc)-(a.ec-a.sc));

    // Lane assignment (greedy)
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
        // Show label at start of each range
        bar.textContent=item.isSt?`${item.ev.name}－${item.label}`:``;
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

const WD=['日','一','二','三','四','五','六'];
function fmtDate(d){return`${d.getMonth()+1}/${d.getDate()}（${WD[d.getDay()]}）`;}

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
    const ds=rs.getTime()===re.getTime()?fmtDate(rs):`${fmtDate(rs)} ～ ${fmtDate(re)}`;
    const item=document.createElement('div');
    item.className='ag-item';
    item.innerHTML=`<div class="ag-dot" style="background:${ev.color}"></div>
      <div>
        <div class="ag-date">${ds}</div>
        <div class="ag-name">${ev.name}</div>
        <div class="ag-phase">${label}</div>
      </div>`;
    item.addEventListener('click',()=>openModal(ev));
    wrap.appendChild(item);
  });
  el.appendChild(wrap);
}

function renderLegend(){
  const el=document.getElementById('calLegend');
  const catOrder=['行政','校商','跨校','校內'];
  const grouped={};
  EVENTS.forEach(ev=>{
    if(!grouped[ev.category]) grouped[ev.category]=[];
    grouped[ev.category].push(ev);
  });
  catOrder.forEach(cat=>{
    if(!grouped[cat]) return;
    const group=document.createElement('div');
    group.className='leg-group';
    const label=document.createElement('div');
    label.className='leg-cat';
    label.textContent=cat;
    group.appendChild(label);
    grouped[cat].forEach(ev=>{
      const item=document.createElement('div');
      item.className='leg-item';
      item.innerHTML=`<div class="leg-dot" style="background:${ev.color}"></div>${ev.name}`;
      item.addEventListener('click',()=>openModal(ev));
      group.appendChild(item);
    });
    el.appendChild(group);
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
document.getElementById('mClose').onclick=closeModal;
document.getElementById('overlay').addEventListener('click',e=>{
  if(e.target===e.currentTarget)closeModal();
});
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeModal();});

/* ── VIEW TOGGLE ── */
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

/* ── MONTH NAV ── */
document.getElementById('prevM').onclick=()=>changeMonth(-1);
document.getElementById('nextM').onclick=()=>changeMonth(1);

/* ── SWIPE TO CHANGE MONTH ── */
(()=>{
  const wrap=document.querySelector('.cal-wrap');
  const hintL=document.getElementById('swipeHintL');
  const hintR=document.getElementById('swipeHintR');
  let tx=0, ty=0, swiping=false;
  wrap.addEventListener('touchstart',e=>{
    tx=e.changedTouches[0].clientX;
    ty=e.changedTouches[0].clientY;
    swiping=false;
  },{passive:true});
  wrap.addEventListener('touchmove',e=>{
    const dx=e.changedTouches[0].clientX-tx;
    const dy=e.changedTouches[0].clientY-ty;
    if(Math.abs(dx)<10) return;
    if(Math.abs(dx)<Math.abs(dy)*1.2) return;
    swiping=true;
    if(dx<0){
      hintL&&hintL.classList.remove('visible');
      hintR&&hintR.classList.add('visible');
    } else {
      hintR&&hintR.classList.remove('visible');
      hintL&&hintL.classList.add('visible');
    }
  },{passive:true});
  wrap.addEventListener('touchend',e=>{
    hintL&&hintL.classList.remove('visible');
    hintR&&hintR.classList.remove('visible');
    if(!swiping) return;
    const dx=e.changedTouches[0].clientX-tx;
    const dy=e.changedTouches[0].clientY-ty;
    if(Math.abs(dx)<40||Math.abs(dx)<Math.abs(dy)*1.2) return;
    changeMonth(dx<0?1:-1);
  },{passive:true});
})();

/* ── SMOOTH SCROLL (nav + hero buttons) ── */
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
  if(a.hasAttribute('target')) return; // skip external links
  a.addEventListener('click',e=>{
    const id=a.getAttribute('href').replace('#','');
    if(document.getElementById(id)){e.preventDefault();goTo(id);}
  });
});

/* ── DARK MODE ── */
const SVG_MOON=`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z"/></svg>`;
const SVG_SUN=`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`;
const html=document.documentElement, dBtn=document.getElementById('darkBtn');
function applyTheme(dark){
  html.dataset.theme=dark?'dark':'light';
  dBtn.innerHTML=dark?SVG_SUN:SVG_MOON;
  dBtn.setAttribute('aria-label',dark?'切換為淺色模式':'切換為深色模式');
  localStorage.setItem('theme',dark?'dark':'light');
}
dBtn.onclick=()=>applyTheme(html.dataset.theme!=='dark');
applyTheme(localStorage.getItem('theme')==='dark');

/* ── BACK TO TOP ── */
const topBtn=document.getElementById('topBtn');
topBtn.onclick=()=>window.scrollTo({top:0,behavior:'smooth'});

/* ── SCROLL: progress + nav active ── */
const anchors=['team-anchor','cal-anchor','recruit-anchor','admin-anchor','rights-anchor','commerce-anchor','cross-anchor','campus-anchor','reform-anchor','finance-anchor'];
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

/* ── FADE IN ── */
const obs=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('vis');});
},{threshold:0.07});
document.querySelectorAll('.fade-up').forEach(el=>obs.observe(el));

/* ── COUNT-UP ANIMATION ── */
const countUpObs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting || entry.target.classList.contains('counted')) return;
    entry.target.classList.add('counted');
    const target = parseInt(entry.target.dataset.target, 10);
    const duration = 900;
    let startTs = null;
    const step = ts => {
      if (!startTs) startTs = ts;
      const progress = Math.min((ts - startTs) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      entry.target.textContent = Math.round(ease * target);
      if (progress < 1) requestAnimationFrame(step);
      else entry.target.textContent = target;
    };
    requestAnimationFrame(step);
  });
}, { threshold: 0.6 });
document.querySelectorAll('.stat-num[data-target]').forEach(el => countUpObs.observe(el));

/* ── INIT ── */
render();
renderLegend();
updateNavBtns();
