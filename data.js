/* ============================================================
   360 Consultoria Automotiva — content data + render
   ============================================================ */
(function(){
  const $=s=>document.querySelector(s);
  const ic={
    x:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>',
    check:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>',
    arrow:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>'
  };

  /* ---- Golpes / Soluções ---- */
  const bad=['Veículos de leilão','Sinistros ocultos','Quilometragem adulterada','Problemas estruturais','Pendências judiciais','Supervalorização de preço'];
  const good=['Decisões mais inteligentes','Maior proteção do patrimônio','Redução de riscos ocultos','Transparência na negociação','Apoio especializado','Mais tranquilidade do início ao fim'];
  $('#bad-list').innerHTML=bad.map(t=>`<li><span class="why__ic why__ic--x">${ic.x}</span>${t}</li>`).join('');
  $('#good-list').innerHTML=good.map(t=>`<li><span class="why__ic why__ic--c">${ic.check}</span>${t}</li>`).join('');

  /* ---- Serviços ---- */
  const svc=[
    {ic:'<svg viewBox="0 0 512 512" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="m494.26 276.22c-3.6-40.41-9.53-48.28-11.77-51.24-5.15-6.84-13.39-11.31-22.11-16a3.6 3.6 0 0 1-.91-5.68 15.93 15.93 0 0 0 4.53-12.53 16.27 16.27 0 0 0-16.35-14.77h-15.6a17 17 0 0 0-2 .13 8.5 8.5 0 0 0-1.41-.47c-9.24-19.53-21.89-46.27-48.11-59.32-38.89-19.34-110.53-20.34-124.53-20.34s-85.64 1-124.48 20.31c-26.22 13.05-38.87 39.79-48.11 59.32l-.08.16a6.52 6.52 0 0 0-1.35.34 17 17 0 0 0-2-.13h-15.63a16.27 16.27 0 0 0-16.35 14.77 15.93 15.93 0 0 0 4.59 12.47 3.6 3.6 0 0 1-.91 5.68c-8.72 4.72-17 9.19-22.11 16-2.24 3-8.16 10.83-11.77 51.24-2 22.74-2.3 46.28-.73 61.44 3.29 31.5 9.46 50.54 9.72 51.33a16 16 0 0 0 13.2 10.87v.2a16 16 0 0 0 16 16h56a16 16 0 0 0 16-16c8.61 0 14.6-1.54 20.95-3.18a158.83 158.83 0 0 1 28-4.91c30.51-2.91 60.85-3.91 79.06-3.91 17.84 0 49.52 1 80.08 3.91a159.16 159.16 0 0 1 28.11 4.93c6.08 1.56 11.85 3 19.84 3.15a16 16 0 0 0 16 16h56a16 16 0 0 0 16-16v-.12a16 16 0 0 0 13.24-10.87c.26-.79 6.43-19.83 9.72-51.33 1.57-15.17 1.29-38.67-.73-61.45zm-381.93-86.91c8-17 17.15-36.24 33.44-44.35 23.54-11.72 72.33-17 110.23-17s86.69 5.24 110.23 17c16.29 8.11 25.4 27.36 33.44 44.35l1 2.17a8 8 0 0 1-7.44 11.42c-33.23-.9-103.23-3.78-137.23-3.78s-104 2.95-137.28 3.85a8 8 0 0 1-7.44-11.42c.35-.74.72-1.49 1.05-2.24zm11.93 79.63a427.17 427.17 0 0 1-51.84 3.06c-10.6 0-21.53-3-23.56-12.44-1.39-6.35-1.24-9.92-.49-13.51.63-3.05 1.63-5.27 6.63-6.05 13-2 20.27.51 41.55 6.78 14.11 4.15 24.29 9.68 30.09 14.06 2.91 2.16 1.36 7.8-2.38 8.1zm221.38 82c-13.16 1.5-39.48.95-89.34.95s-76.17.55-89.33-.95c-13.58-1.51-30.89-14.35-19.07-25.79 7.87-7.54 26.23-13.18 50.68-16.35s34.8-4.8 57.62-4.8 32.12 1 57.62 4.81 44.77 9.52 50.68 16.35c10.78 12.24-5.29 24.19-18.86 25.84zm117.5-91.39c-2 9.48-13 12.44-23.56 12.44a455.91 455.91 0 0 1-52.84-3.06c-3.06-.29-4.48-5.66-1.38-8.1 5.71-4.49 16-9.91 30.09-14.06 21.28-6.27 33.55-8.78 44.09-6.69 2.57.51 3.93 3.27 4.09 5a40.64 40.64 0 0 1-.49 14.48z"/></svg>',t:'Carro Sob Demanda',d:'Car hunter completo: entrevistamos, buscamos, avaliamos e negociamos o carro certo para você — do início ao fim.'},
    {ic:'<path d="M16 3h5v5"/><path d="M21 3l-7 7"/><path d="M21 14v5a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h5"/>',t:'Consultoria para Lojistas',d:'Avaliação de veículos para lojistas com relatórios padronizados e valores personalizados para cada perfil.'},
    {ic:'<circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/><path d="M11 8v6M8 11h6"/>',t:'Avaliação Pré-Compra',d:'Análise técnica presencial antes de fechar negócio. Você decide com dados e razão, não com emoção.'},
    {ic:'<path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6"/><path d="M9 13l2 2 4-4"/>',t:'Vistoria Cautelar',d:'Histórico documental completo: leilão, sinistro, débitos, restrições e procedência.'},
    {ic:'<path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z"/><circle cx="12" cy="11" r="2.5"/><path d="M12 13.5V16"/>',t:'Avaliação Premium 360°',d:'Laudo técnico completo: estrutura, mecânica, pintura, documentação e mercado.'},
    {ic:'<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2"/><path d="M3 12h18"/>',t:'Consultoria Empresarial',d:'Gestão e avaliação de frotas e veículos corporativos com relatórios padronizados.'}
  ];
  $('#svc-grid').innerHTML=svc.map(s=>`
    <article class="svc" data-reveal>
      <div class="svc__ic">${s.ic.startsWith('<svg')?s.ic:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">${s.ic}</svg>`}</div>
      <h3>${s.t}</h3><p>${s.d}</p>
      <a class="svc__link" href="#contato">Saber mais ${ic.arrow}</a>
    </article>`).join('');

  /* ---- Depoimentos ---- */
  const tst=[
    {n:'Rafael Andrade',c:'Comprou um SUV 2021',q:'Achei o carro perfeito, mas a 360 descobriu passagem por leilão que o vendedor escondeu. Economizei R$ 18 mil e a dor de cabeça de uma vida.'},
    {n:'Juliana Mendes',c:'Vendeu um sedan',q:'Prepararam a documentação e o anúncio. Vendi em 9 dias pelo valor que eu queria, sem precisar negociar para baixo.'},
    {n:'Marcos Vinícius',c:'Avaliação pré-compra',q:'O laudo veio com fotos e parecer técnico claro. Usei os dados para negociar R$ 7.500 de desconto. Pagou o serviço muitas vezes.'},
    {n:'Patrícia Lima',c:'Primeira compra',q:'Nunca tinha comprado carro e estava insegura. A consultoria me deu tranquilidade do início ao fim. Recomendo demais.'},
    {n:'Eduardo Castro',c:'Gestão de frota',q:'Padronizaram a avaliação dos veículos da empresa. Relatórios impecáveis e processo muito mais profissional.'},
    {n:'Camila Rocha',c:'Comprou um hatch',q:'A quilometragem estava adulterada e eu nunca perceberia. A 360 viu o que eu não vi. Atendimento nota 1000.'}
  ];
  const star='<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.9 6.3 6.9.6-5.2 4.6 1.6 6.8L12 17.3 5.8 20.9l1.6-6.8L2.2 9.5l6.9-.6z"/></svg>';
  $('#tst-track').innerHTML=tst.map(t=>`
    <div class="tst__card">
      <div class="tst__stars">${star.repeat(5)}</div>
      <p class="tst__quote">“${t.q}”</p>
      <div class="tst__who">
        <div class="tst__av">${t.n.split(' ').map(w=>w[0]).slice(0,2).join('')}</div>
        <div><b>${t.n}</b><span>${t.c}</span></div>
      </div>
    </div>`).join('');

  /* ---- Blog ---- */
  const posts=[
    {cat:'Compra Segura',t:'7 sinais de que um carro já passou por leilão',d:'Aprenda a identificar pistas de procedência antes mesmo da inspeção técnica.',m:'5 min de leitura'},
    {cat:'Venda Inteligente',t:'Como precificar seu carro para vender rápido',d:'O equilíbrio entre valor de mercado e velocidade de venda — sem deixar dinheiro na mesa.',m:'6 min de leitura'},
    {cat:'Mercado Automotivo',t:'Seminovos em 2026: o que muda para quem compra',d:'Tendências de preço, oferta e os modelos que mais valorizam neste ano.',m:'4 min de leitura'},
    {cat:'Veículos Premium',t:'Vale a pena importado? Os custos que ninguém conta',d:'Peças, manutenção e desvalorização: o checklist antes de investir em um premium.',m:'7 min de leitura'},
    {cat:'Manutenção',t:'Quilometragem adulterada: como descobrir',d:'Os métodos técnicos e documentais que revelam a verdade sobre o uso do veículo.',m:'5 min de leitura'},
    {cat:'Compra Segura',t:'Vistoria cautelar x inspeção técnica: qual escolher?',d:'Entenda a diferença e descubra qual análise o seu caso realmente precisa.',m:'6 min de leitura'}
  ];
  $('#blog-grid').innerHTML=posts.map(p=>`
    <article class="post" data-reveal>
      <div class="ph post__img"><span class="ph__tag">[ imagem do artigo ]</span></div>
      <div class="post__body">
        <span class="post__cat">${p.cat}</span>
        <h3>${p.t}</h3>
        <p>${p.d}</p>
        <div class="post__meta">${p.m} · 360 Consultoria</div>
      </div>
    </article>`).join('');

  /* ---- FAQ ---- */
  const faq=[
    {q:'Vale a pena contratar uma consultoria automotiva?',a:'Sim. Um único problema oculto — leilão, sinistro ou reparo estrutural — costuma custar muito mais do que a consultoria. Você decide com base em dados técnicos e documentais, não na palavra do vendedor.'},
    {q:'Quanto custa o serviço?',a:'O valor varia conforme o tipo de análise (pré-compra, cautelar ou Premium 360°) e a localização do veículo. Fale com a gente pelo WhatsApp para um orçamento rápido e sem compromisso.'},
    {q:'Quanto tempo leva uma avaliação?',a:'A maioria das análises presenciais é concluída no mesmo dia, e o relatório completo é entregue em até 24 horas. Consultas documentais costumam ser ainda mais rápidas.'},
    {q:'Vocês atendem fora de Goiânia?',a:'A análise presencial cobre Goiânia e toda a região metropolitana. Para análise documental e consulta de histórico, atendemos em todo o Brasil.'},
    {q:'Vocês avaliam carros de leilão?',a:'Sim. Inclusive identificamos veículos com passagem por leilão que estão sendo anunciados como se nunca tivessem passado — uma das fraudes mais comuns do mercado.'},
    {q:'A 360 faz a negociação por mim?',a:'Fazemos. Com o laudo técnico em mãos, apoiamos a negociação de preço e condições a seu favor, até o fechamento seguro do negócio.'}
  ];
  $('#faq-list').innerHTML=faq.map(f=>`
    <div class="qa">
      <button class="qa__q">${f.q}<span class="qa__ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg></span></button>
      <div class="qa__a"><p>${f.a}</p></div>
    </div>`).join('');

  // re-observe newly injected reveal elements
  if(window.__reobserve) window.__reobserve();
})();
