/* ============================================================
   360 Consultoria Automotiva — interactions
   ============================================================ */
(function(){
  'use strict';
  const $=(s,c)=>(c||document).querySelector(s);
  const $$=(s,c)=>[...(c||document).querySelectorAll(s)];
  const fmt=n=>n.toLocaleString('pt-BR',{maximumFractionDigits:0});

  /* ---- Hero video: autoplay + sound toggle ---- */
  const heroVideo=$('.hero__video'), soundBtn=$('#heroSound');
  if(heroVideo){
    const tryPlay=()=>heroVideo.play().catch(()=>{});
    if(heroVideo.readyState>=3){ tryPlay(); }
    else { heroVideo.addEventListener('canplaythrough', tryPlay, {once:true}); }
  }
  if(heroVideo && soundBtn){
    soundBtn.addEventListener('click',()=>{
      heroVideo.muted=!heroVideo.muted;
      soundBtn.classList.toggle('on',!heroVideo.muted);
      soundBtn.setAttribute('aria-label',heroVideo.muted?'Ativar som':'Desativar som');
    });
  }

  /* ---- Navbar scroll state ---- */
  const nav=$('.nav');
  const onScroll=()=>{ nav.classList.toggle('scrolled', window.scrollY>40); };
  window.addEventListener('scroll',onScroll,{passive:true}); onScroll();

  /* ---- Mobile drawer ---- */
  const drawer=$('.drawer');
  $('.nav__burger').addEventListener('click',()=>drawer.classList.add('open'));
  $('.drawer__close').addEventListener('click',()=>drawer.classList.remove('open'));
  drawer.addEventListener('click',e=>{ if(e.target===drawer) drawer.classList.remove('open'); });
  $$('.drawer a').forEach(a=>a.addEventListener('click',()=>drawer.classList.remove('open')));

  /* ---- Hero floating lens (follows cursor over the photo area) ---- */
  const hero=$('.hero'), reveal=$('#heroReveal'), heroCursor=$('#heroCursor');
  const revealIc=reveal.querySelector('.hero__reveal-ic');
  const revealB=reveal.querySelector('.hero__reveal-tx b');
  const revealP=reveal.querySelector('.hero__reveal-tx p');

  const heroCtx=[
    {
      ic:'<circle cx="10.5" cy="10.5" r="6.5"/><path d="M20.5 20.5l-5.4-5.4" stroke-linecap="round"/>',
      b:'Enxergamos o que você não vê.',
      p:'Análise completa de estrutura, mecânica, histórico e documentação para decisões inteligentes e sem riscos.'
    },
    {
      ic:'<path d="M14 3H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V8z" stroke-linejoin="round"/><path d="M14 3v5h5" stroke-linejoin="round"/><circle cx="10.5" cy="14.5" r="2.8"/><path d="M16.8 19.8l-2.1-2.1" stroke-linecap="round"/>',
      b:'Descobrimos o histórico oculto.',
      p:'Consulta completa de leilão, sinistros, restrições e registros que podem impactar o valor e a segurança do veículo.'
    },
    {
      ic:'<path d="M4 17V11M9 17V7M14 17v-5M19 17V5" stroke-linecap="round"/><path d="M9 7l5-3 5 2M17 5l2 2" stroke-linecap="round" stroke-linejoin="round"/>',
      b:'Negociamos com informação.',
      p:'Transformamos dados técnicos em argumentos sólidos para reduzir riscos e conseguir melhores condições.'
    },
    {
      ic:'<path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" stroke-linejoin="round"/><path d="M9 12l2 2 4-4" stroke-linecap="round" stroke-linejoin="round"/>',
      b:'Sua decisão com confiança.',
      p:'Você recebe um parecer claro e objetivo para comprar, vender ou recusar um negócio sem dúvidas.'
    },
    {
      ic:'<path d="M3 13l2-5a3 3 0 012.8-2h8.4A3 3 0 0119 8l2 5" stroke-linejoin="round"/><path d="M5 13h14v5a1 1 0 01-1 1h-2a1 1 0 01-1-1v-1H9v1a1 1 0 01-1 1H6a1 1 0 01-1-1z" stroke-linejoin="round"/><circle cx="7.5" cy="16" r="1" fill="currentColor" stroke="none"/><circle cx="16.5" cy="16" r="1" fill="currentColor" stroke="none"/>',
      b:'Avaliamos além da aparência.',
      p:'Nem todo problema está visível. Investigamos estrutura, pintura e componentes críticos do veículo.'
    }
  ];

  let activeCtx=-1, ctxTimer=null;
  function switchCtx(i){
    if(i===activeCtx) return;
    activeCtx=i;
    reveal.classList.add('ctx-fade');
    clearTimeout(ctxTimer);
    ctxTimer=setTimeout(()=>{
      const c=heroCtx[i];
      revealIc.innerHTML='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">'+c.ic+'</svg>';
      revealB.textContent=c.b;
      revealP.textContent=c.p;
      reveal.classList.remove('ctx-fade');
    },180);
  }
  switchCtx(0);

  if(hero && reveal){
    let raf=null, tx=0, ty=0, cx=0, cy=0;
    hero.addEventListener('mousemove',e=>{
      const r=hero.getBoundingClientRect();
      const x=e.clientX-r.left, y=e.clientY-r.top;
      const inZone = x>r.width*0.5 && x<r.width && y>80 && y<r.height;
      if(inZone){
        reveal.classList.add('show');
        heroCursor.classList.add('show');
        hero.classList.add('hero--lensing');
        // divide zone into 5 vertical bands
        const zoneTop=112, zoneBot=r.height-24;
        const band=Math.floor((y-zoneTop)/((zoneBot-zoneTop)/heroCtx.length));
        switchCtx(Math.max(0,Math.min(band,heroCtx.length-1)));
        const bw=reveal.offsetWidth, bh=reveal.offsetHeight;
        let bx=Math.min(e.clientX+10, window.innerWidth-bw-16);
        let by=Math.min(Math.max(e.clientY+10,16), window.innerHeight-bh-16);
        tx=bx; ty=by; cx=e.clientX; cy=e.clientY;
        if(!raf) raf=requestAnimationFrame(()=>{
          reveal.style.transform='translate('+tx+'px,'+ty+'px)';
          heroCursor.style.transform='translate('+cx+'px,'+cy+'px) translate(-50%,-50%)';
          raf=null;
        });
      } else {
        reveal.classList.remove('show');
        heroCursor.classList.remove('show');
        hero.classList.remove('hero--lensing');
      }
    });
    hero.addEventListener('mouseleave',()=>{
      reveal.classList.remove('show');
      heroCursor.classList.remove('show');
      hero.classList.remove('hero--lensing');
      activeCtx=-1;
    });
  }

  /* ---- Reveal on scroll ---- */
  const io=new IntersectionObserver((es)=>{
    es.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
  },{threshold:.12,rootMargin:'0px 0px -8% 0px'});
  $$('[data-reveal]').forEach(el=>io.observe(el));
  // expose so data.js can re-observe newly injected elements
  window.__reobserve=()=>$$('[data-reveal]:not(.in)').forEach(el=>io.observe(el));

  /* ---- Timeline ---- */
  const steps=$$('.tl__step');
  const tlLine=$('.tl__line span');
  const tlData=[
    {tag:'Etapa 01 — Contato',h:'Contato Inicial',p:'Você fala com a 360 pelo WhatsApp ou formulário. Entendemos rapidamente o que você precisa e qual veículo está no radar.',li:['Atendimento ágil e humano','Sem compromisso inicial','Resposta em minutos']},
    {tag:'Etapa 02 — Briefing',h:'Entendimento da Necessidade',p:'Mapeamos seu objetivo: comprar, vender ou avaliar. Definimos o tipo de análise ideal para o seu caso e orçamento.',li:['Perfil de uso e orçamento','Tipo de inspeção indicada','Expectativa de prazo']},
    {tag:'Etapa 03 — Análise',h:'Análise do Veículo',p:'Inspeção técnica presencial + consulta documental completa: estrutura, pintura, mecânica, histórico e pendências.',li:['Inspeção técnica presencial','Consulta de leilão e sinistro','Verificação de quilometragem']},
    {tag:'Etapa 04 — Laudo',h:'Relatório Completo',p:'Você recebe um laudo profissional com fotos, vídeos e parecer claro — tudo que o anúncio não conta.',li:['Relatório em PDF com fotos','Parecer técnico objetivo','Recomendação de decisão']},
    {tag:'Etapa 05 — Negociação',h:'Negociação e Fechamento',p:'Com dados na mão, negociamos preço e condições a seu favor — ou seguimos para o próximo carro com segurança.',li:['Argumentos técnicos de preço','Apoio até o fechamento','Economia comprovada']}
  ];
  const tlTag=$('#tl-tag'),tlH=$('#tl-h'),tlP=$('#tl-p'),tlUl=$('#tl-list'),tlImg=$('#tl-img'),tlPanel=$('.tl__panel');
  function setStep(i){
    steps.forEach((s,k)=>{ s.classList.toggle('active',k===i); s.classList.toggle('done',k<i); });
    tlLine.style.width=(i/(steps.length-1)*100)+'%';
    tlPanel.classList.add('tl__panel--fade');
    setTimeout(()=>{
      const d=tlData[i];
      tlTag.textContent=d.tag; tlH.textContent=d.h; tlP.textContent=d.p;
      tlImg.querySelector('img').src='assets/etapa0'+(i+1)+'.png';
      tlUl.innerHTML=d.li.map(t=>`<li>${checkSvg}${t}</li>`).join('');
      tlPanel.classList.remove('tl__panel--fade');
    },220);
  }
  const checkSvg='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>';
  steps.forEach((s,i)=>s.addEventListener('click',()=>setStep(i)));
  setStep(0);
  // auto-advance when section visible
  let tlTimer=null,tlIdx=0;
  const tlSecObs=new IntersectionObserver(es=>es.forEach(e=>{
    if(e.isIntersecting){ tlTimer=setInterval(()=>{ tlIdx=(tlIdx+1)%steps.length; setStep(tlIdx); },4200); }
    else { clearInterval(tlTimer); }
  }),{threshold:.4});
  tlSecObs.observe($('.tl'));
  steps.forEach((s,i)=>s.addEventListener('click',()=>{ tlIdx=i; clearInterval(tlTimer); tlTimer=setInterval(()=>{ tlIdx=(tlIdx+1)%steps.length; setStep(tlIdx); },4200); }));

  /* ---- Timeline mobile carousel ---- */
  (function(){
    const mob=$('#tl-mob');
    if(!mob) return;
    const chk='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>';
    const arrL='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>';
    const arrR='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6"/></svg>';

    mob.innerHTML=`
      <div class="tl__mob-viewport">
        <div class="tl__mob-track" id="tlm-track">
          ${tlData.map((d,i)=>`
            <div class="tl__mob-card">
              <span class="tl__mob-tag">${d.tag}</span>
              <h3 class="tl__mob-title">${d.h}</h3>
              <div class="tl__mob-img"><img src="assets/etapa0${i+1}.png" alt="${d.h}" loading="lazy"></div>
              <div class="tl__mob-body">
                <p>${d.p}</p>
                <ul>${d.li.map(t=>`<li>${chk}${t}</li>`).join('')}</ul>
              </div>
            </div>`).join('')}
        </div>
      </div>
      <div class="tl__mob-nav">
        <button class="tl__mob-arr" id="tlm-prev" aria-label="Anterior">${arrL}</button>
        <div class="tl__mob-dots" id="tlm-dots">
          ${tlData.map((_,i)=>`<button aria-label="Etapa ${i+1}"></button>`).join('')}
        </div>
        <button class="tl__mob-arr" id="tlm-next" aria-label="Próximo">${arrR}</button>
      </div>`;

    const track=$('#tlm-track');
    const dots=$$('#tlm-dots button');
    const prev=$('#tlm-prev');
    const next=$('#tlm-next');
    const vp=mob.querySelector('.tl__mob-viewport');
    let idx=0;

    function goTo(i){
      idx=Math.max(0,Math.min(i,tlData.length-1));
      track.style.transform=`translateX(-${idx*vp.offsetWidth}px)`;
      dots.forEach((d,k)=>d.classList.toggle('active',k===idx));
      prev.disabled=idx===0;
      next.disabled=idx===tlData.length-1;
    }

    prev.addEventListener('click',()=>goTo(idx-1));
    next.addEventListener('click',()=>goTo(idx+1));
    dots.forEach((d,i)=>d.addEventListener('click',()=>goTo(i)));

    // swipe
    let tx=0;
    mob.addEventListener('touchstart',e=>{tx=e.touches[0].clientX;},{passive:true});
    mob.addEventListener('touchend',e=>{
      const dx=tx-e.changedTouches[0].clientX;
      if(Math.abs(dx)>44) goTo(idx+(dx>0?1:-1));
    },{passive:true});

    // recalc on resize (e.g. orientation change)
    window.addEventListener('resize',()=>goTo(idx),{passive:true});

    goTo(0);
  })();

  /* ---- Mapa de cobertura (Leaflet + OpenStreetMap) ---- */
  if(typeof L!=='undefined' && document.getElementById('cov-map')){
    const covMap=L.map('cov-map',{scrollWheelZoom:false,zoomControl:true,attributionControl:true})
      .setView([-16.72,-49.27],11);

    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',{
      attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>',
      maxZoom:19,subdomains:'abcd'
    }).addTo(covMap);

    const mkIcon=(main)=>L.divIcon({
      className:'',
      html:`<div class="map-pin ${main?'main':'sec'}" style="width:${main?26:18}px;height:${main?26:18}px"></div>`,
      iconSize:[main?26:18,main?26:18],
      iconAnchor:[main?13:9,main?26:18],
      popupAnchor:[0,-20]
    });

    [
      {lat:-16.6869,lng:-49.2648,name:'Goiânia',main:true},
      {lat:-16.8233,lng:-49.2446,name:'Aparecida de Goiânia',main:false},
      {lat:-16.6466,lng:-49.4925,name:'Trindade',main:false},
      {lat:-16.7106,lng:-49.0904,name:'Senador Canedo',main:false},
      {lat:-16.5620,lng:-49.3200,name:'Goianira',main:false}
    ].forEach(p=>{
      L.marker([p.lat,p.lng],{icon:mkIcon(p.main)})
        .addTo(covMap)
        .bindPopup(`<b>${p.name}</b>`)
        .on('mouseover',function(){ this.openPopup(); });
    });
  }

  /* ---- Diferencial: diagrama radial + lente ---- */
  const orbit=$('#orbit'), oSvg=$('#orbitSvg'), oNodes=$('#orbitNodes'), oLens=$('#orbitLens'), difGrid=$('#difGrid');
  const I={
    estrutura:'<path d="M12 3l7 3v5c0 4.2-2.9 7.4-7 8.7C7.9 18.4 5 15.2 5 11V6l7-3z" stroke-linejoin="round"/><path d="M9.2 11.6l1.9 1.9 3.7-3.7" stroke-linecap="round" stroke-linejoin="round"/>',
    cambio:'<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1" stroke-linecap="round"/>',
    sinistro:'<path d="M5 13l1.6-4.5A2 2 0 0 1 8.5 7h7a2 2 0 0 1 1.9 1.5L19 13" stroke-linejoin="round"/><path d="M4 13h16v4a1 1 0 0 1-1 1h-1.5a1 1 0 0 1-1-1v-1H7.5v1a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1z" stroke-linejoin="round"/><path d="M13.5 3.5l-1.5 2 2 .6-1.5 2" stroke-linecap="round" stroke-linejoin="round"/>',
    doc:'<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" stroke-linejoin="round"/><path d="M14 3v5h5" stroke-linejoin="round"/><path d="M9 13h6M9 16.5h4" stroke-linecap="round"/>',
    preco:'<circle cx="12" cy="12" r="9"/><path d="M14.6 9.2c-.5-.9-1.6-1.4-2.6-1.4-1.4 0-2.6.8-2.6 2s.9 1.6 2.6 2 2.7 1 2.7 2.2-1.2 2-2.7 2c-1.1 0-2.2-.5-2.7-1.4M12 6v12" stroke-linecap="round" stroke-linejoin="round"/>',
    historico:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2" stroke-linecap="round" stroke-linejoin="round"/>',
    pintura:'<rect x="3" y="4.5" width="13" height="6" rx="1.4" stroke-linejoin="round"/><path d="M16 7.5h3.2L21 10v3.5h-7.5v2.5" stroke-linecap="round" stroke-linejoin="round"/><rect x="11" y="16" width="3.2" height="4.5" rx="1" stroke-linejoin="round"/>',
    motor:'<path d="M4 11V8.5h2.5V6.5H11V9h2.5l2-2H18v3h2.5v4H18v2.5h-2.5l-2-2H8.5v2H4v-3H2v-2.5z" stroke-linejoin="round"/>',
    suspensao:'<path d="M12 2v2.5" stroke-linecap="round"/><path d="M8.5 5.5h7l-7 3h7l-7 3h7l-7 3h7" stroke-linecap="round" stroke-linejoin="round"/><path d="M12 17.5V22" stroke-linecap="round"/>',
    quilometragem:'<path d="M3.6 17.5a9 9 0 1 1 16.8 0" stroke-linecap="round"/><path d="M12 14l4.5-3.5" stroke-linecap="round"/><circle cx="12" cy="14" r="1.4"/>',
    mercado:'<path d="M4 19V13M9.3 19V9M14.6 19v-4M20 19V7" stroke-linecap="round"/><path d="M4 11l5.3-4 4 2.6L20 4" stroke-linecap="round" stroke-linejoin="round"/><path d="M16 4h4v4" stroke-linecap="round" stroke-linejoin="round"/>',
    leilao:'<path d="M13 3.5l7 7-2.3 2.3-7-7z" stroke-linejoin="round"/><path d="M11.3 5.2l-7 7 2.3 2.3 7-7" stroke-linejoin="round"/><path d="M4 20.5h8" stroke-linecap="round"/>'
  };
  // top→bottom on each side
  const right=[['pintura','Pintura'],['motor','Motor'],['suspensao','Suspensão'],['quilometragem','Quilometragem'],['mercado','Mercado'],['leilao','Leilão']];
  const left =[['estrutura','Estrutura'],['cambio','Câmbio'],['sinistro','Sinistro'],['doc','Documentação'],['preco','Preço justo'],['historico','Histórico']];
  const SVGNS='http://www.w3.org/2000/svg';
  const cx=540, cy=310, Rx=432, Ry=212, Rc=176, PB=14;
  const angR=[-54,-32.4,-10.8,10.8,32.4,54];
  const pngSet=new Set(['pintura','estrutura','cambio','sinistro','doc','preco','quilometragem','motor','suspensao','mercado','leilao']);
  function iconHTML(k){ return pngSet.has(k)?`<img src="assets/dif-${k}.png" alt="">`:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor">${I[k]}</svg>`; }
  function mk(side,list){
    list.forEach((it,i)=>{
      const a=(side==='r'?angR[i]:180-angR[i])*Math.PI/180;
      const ix=cx+Rx*Math.cos(a), iy=cy+Ry*Math.sin(a);
      const sx=cx+Rc*Math.cos(a), sy=cy+Rc*Math.sin(a);
      const ex=ix-PB*Math.cos(a), ey=iy-PB*Math.sin(a);
      // connector (circle edge -> icon edge)
      const ln=document.createElementNS(SVGNS,'line');
      ln.setAttribute('x1',sx);ln.setAttribute('y1',sy);ln.setAttribute('x2',ex);ln.setAttribute('y2',ey);
      ln.setAttribute('class','conn');ln.dataset.k=side+i;oSvg.appendChild(ln);
      const dt=document.createElementNS(SVGNS,'circle');
      dt.setAttribute('cx',sx);dt.setAttribute('cy',sy);dt.setAttribute('r','3.5');
      dt.setAttribute('class','dot');dt.dataset.k=side+i;oSvg.appendChild(dt);
      // node (icon circle centered exactly on the line tip)
      const n=document.createElement('div');
      n.className='node node--'+side;
      n.style.left=(ix/1080*100)+'%'; n.style.top=(iy/620*100)+'%';
      n.dataset.k=side+i;
      n.innerHTML=`<span class="node__ic">${iconHTML(it[0])}</span><span class="node__lb">${it[1]}</span>`;
      oNodes.appendChild(n);
    });
  }
  if(orbit){
    mk('r',right); mk('l',left);
    // mobile grid
    const all=[...left,...right];
    difGrid.innerHTML=all.map(it=>`<div class="dif-card"><span class="node__ic">${iconHTML(it[0])}</span><span class="node__lb">${it[1]}</span></div>`).join('');

    const nodes=$$('.node',oNodes);
    function lens(x,y){
      const r=orbit.getBoundingClientRect();
      const lx=x-r.left, ly=y-r.top;
      oLens.classList.add('show'); orbit.classList.add('lensing');
      oLens.style.transform=`translate(${lx-70}px,${ly-70}px)`;
      const R=76;
      nodes.forEach(n=>{
        const nr=n.querySelector('.node__ic').getBoundingClientRect();
        const ncx=nr.left+nr.width/2-r.left, ncy=nr.top+nr.height/2-r.top;
        const lit=Math.hypot(ncx-lx,ncy-ly)<R;
        n.classList.toggle('lit',lit);
        const k=n.dataset.k;
        oSvg.querySelector('.conn[data-k="'+k+'"]').classList.toggle('lit',lit);
        oSvg.querySelector('.dot[data-k="'+k+'"]').classList.toggle('lit',lit);
      });
    }
    function clearLens(){
      oLens.classList.remove('show'); orbit.classList.remove('lensing');
      nodes.forEach(n=>n.classList.remove('lit'));
      $$('.conn,.dot',oSvg).forEach(e=>e.classList.remove('lit'));
    }
    orbit.addEventListener('mousemove',e=>lens(e.clientX,e.clientY));
    orbit.addEventListener('mouseleave',clearLens);
    orbit.addEventListener('touchmove',e=>{const t=e.touches[0];if(t)lens(t.clientX,t.clientY);},{passive:true});
    orbit.addEventListener('touchend',clearLens);
  }

  /* ---- Simulador de economia ---- */
  const sValIn=$('#s-val-num'), sMkt=$('#s-mkt');
  const sYearV=$('#s-year-v'), sYrPrev=$('#s-yr-prev'), sYrNext=$('#s-yr-next');
  const simSegs=$$('.sim__seg');
  const rNum=$('#r-num'), rBadge=$('#r-badge'), rDesc=$('#r-desc'), rEconomy=$('#r-economy');
  const gFill=$('#g-fill'), gDot=$('#g-dot');

  const SEG_RISK={popular:.10,sedan:.13,suv:.16,premium:.22,pickup:.18,van:.14};
  const SEG_NAME={popular:'hatch',sedan:'sedan',suv:'SUV',premium:'premium',pickup:'picape',van:'van'};
  const ARC_R=110, CX=130, CY=145;
  const START_DEG=225, SPAN_DEG=270;
  const ARC_LEN=(SPAN_DEG/360)*2*Math.PI*ARC_R; // ~518
  let simYear=2016, simSeg='sedan';

  function dotXY(p){
    const deg=START_DEG+p*SPAN_DEG;
    const rad=(deg-90)*Math.PI/180;
    return {x:CX+ARC_R*Math.cos(rad), y:CY+ARC_R*Math.sin(rad)};
  }

  function simCalc(){
    const val=parseInt((sValIn.value||'').replace(/\D/g,''))||0;
    const mktF=[.82,1,.25][parseInt(sMkt.value)||1]; // below/avg/above price = [discounted risk, normal, overpriced=higher risk]
    const mktMul=[.82,1,1.22][parseInt(sMkt.value)||1];
    const age=Math.max(0,2026-simYear);
    const base=SEG_RISK[simSeg]||.13;
    const ageF=Math.min(1+age*.06,2.1);
    let risk=Math.round(val*base*ageF*mktMul);
    risk=Math.min(risk,Math.round(val*.55));

    const rawPct=base*ageF*mktMul;
    const pct=Math.min(.97,rawPct/(.55));

    // gauge fill (brighter overlay on top of gradient track)
    gFill.style.strokeDasharray=(pct*ARC_LEN)+' '+(ARC_LEN*2);

    // dot position
    const pos=dotXY(pct);
    gDot.setAttribute('cx',pos.x.toFixed(1));
    gDot.setAttribute('cy',pos.y.toFixed(1));

    // level
    let level,badgeCls;
    if(pct<.34){level='BAIXO';badgeCls='low';}
    else if(pct<.67){level='MODERADO';badgeCls='mid';}
    else{level='ALTO';badgeCls='';}

    rNum.textContent=fmt(risk);
    rBadge.textContent='⚠ '+level;
    rBadge.className='sim__gc-badge '+badgeCls;

    const economy=Math.max(0,risk-1200);
    rEconomy.textContent='R$ '+fmt(economy);

    const segLabel=SEG_NAME[simSeg]||simSeg;
    rDesc.innerHTML=`Um veículo <b>${segLabel}</b> de <b>${simYear}</b> avaliado em <b>R$ ${fmt(val)}</b> pode esconder problemas que representam até <b>R$ ${fmt(risk)}</b> em prejuízo.`;
  }

  function maskCurrency(el){
    let v=el.value.replace(/\D/g,''); v=v.replace(/^0+/,'');
    el.value=v?fmt(parseInt(v)):'';
  }

  function updateMktSlider(){
    const v=parseInt(sMkt.value),pct=(v/2)*100;
    sMkt.style.background=`linear-gradient(90deg,var(--blue) ${pct}%,rgba(255,255,255,.15) ${pct}%)`;
  }

  sValIn.addEventListener('input',()=>{maskCurrency(sValIn);simCalc();});
  sMkt.addEventListener('input',()=>{updateMktSlider();simCalc();});
  sYrPrev.addEventListener('click',()=>{if(simYear>2005){simYear--;sYearV.textContent=simYear;simCalc();}});
  sYrNext.addEventListener('click',()=>{if(simYear<2025){simYear++;sYearV.textContent=simYear;simCalc();}});
  simSegs.forEach(s=>s.addEventListener('click',()=>{
    simSegs.forEach(x=>x.classList.remove('active'));
    s.classList.add('active');
    simSeg=s.dataset.seg;
    simCalc();
  }));

  sValIn.value=fmt(85000);
  updateMktSlider();
  simCalc();

  /* ticks circulares do gauge */
  (function buildTicks(){
    const g=$('#g-ticks'); if(!g) return;
    const ns='http://www.w3.org/2000/svg';
    const TOTAL=36, R_IN=122, R_MAJ=132, R_MIN=128;
    for(let i=0;i<=TOTAL;i++){
      const p=i/TOTAL;
      const deg=START_DEG+p*SPAN_DEG;
      const rad=(deg-90)*Math.PI/180;
      const isMaj=(i%6===0);
      const r2=isMaj?R_MAJ:R_MIN;
      const ln=document.createElementNS(ns,'line');
      ln.setAttribute('x1',(CX+R_IN*Math.cos(rad)).toFixed(2));
      ln.setAttribute('y1',(CY+R_IN*Math.sin(rad)).toFixed(2));
      ln.setAttribute('x2',(CX+r2*Math.cos(rad)).toFixed(2));
      ln.setAttribute('y2',(CY+r2*Math.sin(rad)).toFixed(2));
      ln.setAttribute('stroke',isMaj?'rgba(255,255,255,.55)':'rgba(255,255,255,.25)');
      ln.setAttribute('stroke-width',isMaj?'2':'1');
      ln.setAttribute('stroke-linecap','round');
      g.appendChild(ln);
    }
  })();

  /* ---- Testimonials carousel ---- */
  const track=$('.tst__track'), cards=$$('.tst__card'), dotsWrap=$('.tst__dots');
  let idx=0;
  function perView(){ return window.innerWidth<=640?1:window.innerWidth<=1024?2:3; }
  function maxIdx(){ return Math.max(0,cards.length-perView()); }
  function buildDots(){
    dotsWrap.innerHTML='';
    for(let i=0;i<=maxIdx();i++){ const b=document.createElement('button'); b.addEventListener('click',()=>go(i)); dotsWrap.appendChild(b); }
  }
  function go(i){
    idx=Math.max(0,Math.min(i,maxIdx()));
    const card=cards[0]; const gap=24;
    const step=card.getBoundingClientRect().width+gap;
    track.style.transform=`translateX(${-idx*step}px)`;
    $$('button',dotsWrap).forEach((d,k)=>d.classList.toggle('active',k===idx));
  }
  $('.tst__prev').addEventListener('click',()=>go(idx-1));
  $('.tst__next').addEventListener('click',()=>go(idx+1));
  buildDots(); go(0);
  let rt; window.addEventListener('resize',()=>{ clearTimeout(rt); rt=setTimeout(()=>{buildDots();go(Math.min(idx,maxIdx()));},150); });

  /* ---- FAQ accordion ---- */
  $$('.qa').forEach(qa=>{
    const q=$('.qa__q',qa), a=$('.qa__a',qa);
    q.addEventListener('click',()=>{
      const open=qa.classList.contains('open');
      $$('.qa').forEach(o=>{ o.classList.remove('open'); $('.qa__a',o).style.maxHeight=null; });
      if(!open){ qa.classList.add('open'); a.style.maxHeight=a.scrollHeight+'px'; }
    });
  });

  /* ---- Blog filter (visual) ---- */
  $$('.chip').forEach(c=>c.addEventListener('click',()=>{ $$('.chip').forEach(x=>x.classList.remove('active')); c.classList.add('active'); }));

})();
