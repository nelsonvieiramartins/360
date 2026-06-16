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
    {ic:'<path d="M3 13l2-5a3 3 0 012.8-2h8.4A3 3 0 0119 8l2 5"/><path d="M5 13h14v5a1 1 0 01-1 1h-2a1 1 0 01-1-1v-1H9v1a1 1 0 01-1 1H6a1 1 0 01-1-1z"/><circle cx="7.5" cy="16" r="1"/><circle cx="16.5" cy="16" r="1"/>',t:'Consultoria para Compra',d:'Car hunter completo: encontramos, analisamos e negociamos o carro certo para você.'},
    {ic:'<path d="M16 3h5v5"/><path d="M21 3l-7 7"/><path d="M21 14v5a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h5"/>',t:'Consultoria para Venda',d:'Venda mais rápida e valorizada, com anúncio e documentação preparados por especialistas.'},
    {ic:'<circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/><path d="M11 8v6M8 11h6"/>',t:'Avaliação Pré-Compra',d:'Análise técnica presencial antes de fechar negócio. Você decide com dados, não com fé.'},
    {ic:'<path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6"/><path d="M9 13l2 2 4-4"/>',t:'Vistoria Cautelar',d:'Histórico documental completo: leilão, sinistro, débitos, restrições e procedência.'},
    {ic:'<path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z"/><circle cx="12" cy="11" r="2.5"/><path d="M12 13.5V16"/>',t:'Avaliação Premium 360°',d:'Laudo técnico completo: estrutura, mecânica, pintura, documentação e mercado.'},
    {ic:'<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2"/><path d="M3 12h18"/>',t:'Consultoria Empresarial',d:'Gestão e avaliação de frotas e veículos corporativos com relatórios padronizados.'}
  ];
  $('#svc-grid').innerHTML=svc.map(s=>`
    <article class="svc" data-reveal>
      <div class="svc__ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">${s.ic}</svg></div>
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
