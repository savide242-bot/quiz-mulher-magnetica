// ================================================================
// FLUXO COMPLETO — chat contínuo, sem mudar de ecrã
// MAX 4 mensagens seguidas, depois Continuar
// ================================================================

const chatArea     = document.getElementById('chat-area');
const optionsPanel = document.getElementById('options-panel');
const waStatus     = document.getElementById('wa-status');
const progressBar  = document.getElementById('progress-bar');

// ========================
// UTILS
// ========================
function getTime() {
  const n = new Date();
  return `${String(n.getHours()).padStart(2,'0')}:${String(n.getMinutes()).padStart(2,'0')}`;
}
function scrollBottom() { chatArea.scrollTop = chatArea.scrollHeight; }

function addBubbleIn(html) {
  const isImg = html.includes('<img');
  const div = document.createElement('div');
  div.className = 'bubble-in';
  if (isImg) {
    div.style.cssText = 'background:transparent;box-shadow:none;padding:0;';
    div.innerHTML = html;
  } else {
    div.innerHTML = html.replace(/\n/g, '<br>') + `<div class="bubble-time">${getTime()}</div>`;
  }
  chatArea.appendChild(div);
  scrollBottom();
}
function addBubbleOut(text) {
  const div = document.createElement('div');
  div.className = 'bubble-out';
  div.innerHTML = text.replace(/\n/g, '<br>') + `<div class="bubble-time">${getTime()}</div>`;
  chatArea.appendChild(div);
  scrollBottom();
}
function showTyping() {
  removeTyping();
  if (waStatus) waStatus.textContent = 'a digitar...';
  const div = document.createElement('div');
  div.id = 'typing-indicator';
  div.className = 'bubble-typing';
  div.innerHTML = `<div class="typing-dots"><span></span><span></span><span></span></div>`;
  chatArea.appendChild(div);
  scrollBottom();
}
function removeTyping() {
  const t = document.getElementById('typing-indicator');
  if (t) t.remove();
  if (waStatus) waStatus.textContent = 'online';
}

// Delay de digitação: mais lento e mais realista
function typingDelay(text) {
  const len = text.replace(/<[^>]*>/g, '').replace(/\n/g, '').length;
  return Math.min(Math.max(len * 28, 1800), 4000);
}

// ========================
// ENGINE
// ========================
let currentStep = 0;
const TOTAL_STEPS = 29;

function updateProgress() {
  if (progressBar) progressBar.style.width = (currentStep / TOTAL_STEPS * 100) + '%';
}

// Envia 1 bolha e chama cb depois
function sendOne(text, cb) {
  showTyping();
  const delay = text.includes('<img') ? 1400 : typingDelay(text);
  setTimeout(() => {
    removeTyping();
    addBubbleIn(text);
    setTimeout(cb, 1400); // pausa entre mensagens: 1.4s
  }, delay);
}

// Envia array de bolhas sequencialmente (sem botões)
function showBubbles(bubbles, cb) {
  let i = 0;
  function next() {
    if (i >= bubbles.length) { cb && cb(); return; }
    sendOne(bubbles[i++], next);
  }
  next();
}

// Botão único que vira bolha verde
function showButton(text, cb) {
  optionsPanel.innerHTML = '';
  const btn = document.createElement('button');
  btn.className = 'btn-start-chat';
  btn.textContent = text;
  btn.addEventListener('click', () => {
    addBubbleOut(text);
    optionsPanel.innerHTML = '';
    setTimeout(cb, 500);
  });
  optionsPanel.appendChild(btn);
}

// Opções pill verdes com feedback opcional
function showOptions(options, cb) {
  optionsPanel.innerHTML = '';
  options.forEach(opt => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.textContent = opt.text;
    btn.addEventListener('click', () => {
      optionsPanel.innerHTML = '';
      addBubbleOut(opt.text);
      if (opt.feedback && opt.feedback.trim()) {
        sendOne(opt.feedback, () => {
          if (opt.afterButton) showButton(opt.afterButton, cb);
          else cb();
        });
      } else {
        setTimeout(cb, 500);
      }
    });
    optionsPanel.appendChild(btn);
  });
}

// Multi-select com checkboxes
function showMultiSelect(options, feedbackBubbles, cb) {
  optionsPanel.innerHTML = '';
  options.forEach(text => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.textContent = text;
    btn.addEventListener('click', () => {
      btn.classList.toggle('selected');
      const count = optionsPanel.querySelectorAll('.option-btn.selected').length;
      const confirm = document.getElementById('multi-confirm-btn');
      if (confirm) confirm.style.display = count > 0 ? 'block' : 'none';
    });
    optionsPanel.appendChild(btn);
  });
  const confirm = document.createElement('button');
  confirm.id = 'multi-confirm-btn';
  confirm.className = 'confirm-btn';
  confirm.style.display = 'none';
  confirm.textContent = 'Continuar ➔';
  confirm.addEventListener('click', () => {
    const selected = [...optionsPanel.querySelectorAll('.option-btn.selected')].map(b => b.textContent);
    optionsPanel.innerHTML = '';
    addBubbleOut(selected.join(', '));
    if (feedbackBubbles && feedbackBubbles.length > 0) {
      showBubbles(feedbackBubbles, () => showButton('Continuar', cb));
    } else {
      setTimeout(cb, 500);
    }
  });
  optionsPanel.appendChild(confirm);
}

function next() {
  currentStep++;
  updateProgress();
  if (currentStep < flowDefs.length) flowDefs[currentStep]();
}

// ========================
// FLUXO (max 3-4 mensagens por grupo)
// ========================
const flowDefs = [

  // 0 — Headline dopamina
  function() {
    sendOne('Use nele o <strong>"gatilho de dopamina"</strong> para <strong>aumentar a atracção dele em ti,</strong> e fazer ele <strong>sentir a tua falta.</strong>\n\nClica abaixo, faz o <strong>teste grátis de 1 minuto</strong> e aprende...', () => {
      showButton('👉 COMEÇAR TESTE GRÁTIS', next);
    });
  },

  // 1 — Intro do doutor
  function() {
    sendOne('Olá, sou o Dr. Carlos Manjate, <strong>especialista em psicologia de relacionamentos</strong> há mais de 15 anos.\n\nJá ajudei <strong>mais de 1000 mulheres</strong> a <strong>fazer o homem certo ficar obcecado por elas</strong> com este método.\n\nResponde-me algumas <strong>perguntas rápidas</strong> para eu entender o teu caso e poder ensinar-te também!', () => {
      showButton('Continuar', next);
    });
  },

  // 2 — Q1: Idade
  function() {
    sendOne('Para começar, diz-me: Qual a tua idade?', () => {
      showOptions([
        { text: '18-29 anos', feedback: '' },
        { text: '30–39 anos', feedback: '' },
        { text: '40–49 anos', feedback: '' },
        { text: '50+',        feedback: '' }
      ], next);
    });
  },

  // 3 — Q2: Objectivo
  function() {
    sendOne('Responde com sinceridade...\nQual é o teu principal objectivo?', () => {
      showOptions([
        { text: 'Atrair o homem certo',
          feedback: 'Entendi...\n\nEntão não é simplesmente sobre ter alguém.\n\nQueres conseguir despertar o interesse do homem que realmente desejas.' },
        { text: 'Deixá-lo obcecado',
          feedback: 'Entendi...\n\nEntão não é simplesmente sobre ter alguém.\n\nQueres que ele não consiga parar de pensar em ti e isso é totalmente possível.' },
        { text: 'Casar-se',
          feedback: 'Entendi...\n\nPara ele dar esse passo, precisa sentir que tu és a única opção e há uma forma de activar isso nele.' },
        { text: 'Reacender a paixão',
          feedback: 'Entendi...\n\nEntão em algum momento já existiu uma ligação mais forte...\n\ne hoje gostavas de sentir aquela intensidade de novo.' }
      ], next);
    });
  },

  // 4 — Q3: Estado de relacionamento
  function() {
    sendOne('E hoje...\nQual é o teu estado de relacionamento?', () => {
      showOptions([
        { text: 'Solteira',                      feedback: '' },
        { text: 'É complicado',                   feedback: '' },
        { text: 'Encontro casual / namorando',    feedback: '' },
        { text: 'Casada / relacionamento sério',  feedback: '' }
      ], next);
    });
  },

  // 5 — Q4: Vida amorosa
  function() {
    sendOne('Como te sentes em relação à tua vida amorosa neste momento?', () => {
      showOptions([
        { text: 'Estou confortável com ela',
          feedback: 'Mas podemos sempre melhorar e criar uma ligação ainda mais profunda.' },
        { text: 'Gostaria de me sentir mais confiante',
          feedback: 'Entendi...\n\nPrecisas de saber se estás a agir correctamente... se ele está realmente interessado... ou qual deve ser o teu próximo passo.' },
        { text: 'Não me sinto amada como gostaria',
          feedback: 'Entendo. E isso muda completamente quando activamos o instinto de perseguição dele.' }
      ], next);
    });
  },

  // 6 — Q5: Frequência
  function() {
    sendOne('Pensando nas tuas experiências amorosas...\n\nCom que frequência sentes que ofereces mais do que recebes?', () => {
      showOptions([
        { text: 'Muito frequentemente', feedback: '' },
        { text: 'Às vezes',             feedback: '' },
        { text: 'Quase nunca',          feedback: '' }
      ], next);
    });
  },

  // 7 — Q6: Desafios (multi-select)
  function() {
    sendOne('Quais destes desafios sentes na tua vida amorosa?\n(podes escolher mais de um)', () => {
      showMultiSelect(
        ['Valorizo mais ele do que a mim própria','Sou rejeitada','Não consigo atrair o homem certo','Não me sinto amada','Sinto que a paixão acabou'],
        ['Isso acaba levando para uma sensação parecida: não estás a receber do homem a resposta emocional que gostarias.\n\nSeja atenção... desejo... saudade... iniciativa... ou simplesmente sentir que és importante para ele...',
         'Mas <strong>8 em cada 10 mulheres</strong> notam mudanças já nos primeiros dias quando aprendem a activar o gatilho da dopamina nele...\n\nPois é o único jeito de o deixar completamente louco por ti.'],
        next
      );
    });
  },

  // 8 — Q7: Última vez amada
  function() {
    sendOne('Qual foi a última vez que te sentiste realmente amada e valorizada numa relação?', () => {
      showOptions([
        { text: 'Menos de 1 ano atrás',     feedback: '' },
        { text: 'Entre 1 e 2 anos atrás',   feedback: '' },
        { text: 'Há mais de 3 anos atrás',  feedback: '' },
        { text: 'Nunca',                     feedback: '' }
      ], next);
    });
  },

  // 9 — Q8: Influência
  function() {
    sendOne('Gostavas de ter mais influência sobre os homens?', () => {
      showOptions([
        { text: 'Claro que sim',          feedback: '' },
        { text: 'Sim, mas com condições', feedback: '' }
      ], next);
    });
  },

  // 10 — Q9: Homem ideal
  function() {
    const fb = 'Faz ele escolher-te todos os dias!\n\nQuando activas os gatilhos de dopamina nele, ele começa a pensar em ti o tempo todo, querer realizar os teus desejos e permanecer completamente comprometido.';
    sendOne('Pensando no homem ideal para ti...\n\nQual destas qualidades é a mais importante?', () => {
      showOptions([
        { text: 'Gentil',                 feedback: fb, afterButton: 'Continuar' },
        { text: 'Fiel',                   feedback: fb, afterButton: 'Continuar' },
        { text: 'Carinhoso',              feedback: fb, afterButton: 'Continuar' },
        { text: 'Que me apoie',           feedback: fb, afterButton: 'Continuar' },
        { text: 'Voltado para a família', feedback: fb, afterButton: 'Continuar' }
      ], next);
    });
  },

  // 11 — Q10: Entendes os homens
  function() {
    sendOne('Quão bem achas que entendes os homens?', () => {
      showOptions([
        { text: 'Muitas vezes não faço ideia do que ele está a pensar',
          feedback: 'E essa falta de clareza costuma gerar muita confusão e ansiedade.\n\nPorque quando não entendes o comportamento...\n\nqualquer silêncio, mensagem ou mudança parece carregar algum significado oculto.' },
        { text: 'Às vezes é difícil entender o que ele está a pensar',
          feedback: 'E essa falta de clareza costuma gerar muita confusão e ansiedade.\n\nPorque quando não entendes o comportamento...\n\nqualquer silêncio, mensagem ou mudança parece carregar algum significado oculto.' },
        { text: 'Muito bem, quase leio a mente deles',
          feedback: 'Mesmo entendendo alguma coisa, há sempre camadas mais profundas na mente dele que podem surpreender-te.' }
      ], next);
    });
  },

  // 12 — Dopamina: pergunta
  function() {
    sendOne('Sabias que aumentar a dopamina dele pode fazer com que ele sinta a tua falta?', () => {
      showOptions([
        { text: 'Não sabia',                    feedback: '' },
        { text: 'Quero entender como funciona', feedback: '' }
      ], next);
    });
  },

  // 13 — Ciência (2 mensagens max) + recompensas
  function() {
    sendOne('Estudos científicos revelam que a dopamina, o hormônio do desejo, alimenta a excitação dele.\n\nAo activar os gatilhos de dopamina, ele vai desejar a tua atenção e aprofundar a ligação.', () => {
      sendOne('Sabias que pequenas recompensas podem mantê-lo a pensar em ti?', () => {
        showOptions([
          { text: 'Sim',                  feedback: '' },
          { text: 'Não sabia',            feedback: '' },
          { text: 'Quero entender como',  feedback: '' }
        ], next);
      });
    });
  },

  // 14 — Q11: Estratégias (multi-select)
  function() {
    sendOne('Quais destas estratégias gostavas mais de aprender?\n(podes escolher mais de uma)', () => {
      showMultiSelect(
        ['Como fazer ele sentir saudades de mim','Como fazer ele apegar-se a mim','Como fazer ele ser mais proactivo comigo','Como perceber melhor o que ele está a pensar'],
        [],
        next
      );
    });
  },

  // 15 — Q12: Quão pronta
  function() {
    sendOne('Quão pronta estás para transformar a tua vida amorosa?', () => {
      showOptions([
        { text: 'Estou totalmente pronta!',    feedback: '' },
        { text: 'Preciso de mais preparação',  feedback: '' },
        { text: 'Tenho algumas dúvidas',        feedback: '' }
      ], next);
    });
  },

  // 16 — 94% + comprometimento
  function() {
    sendOne('<strong>94% das mulheres</strong> que usam estes gatilhos de dopamina despertaram atracção e comprometimento em apenas algumas semanas!', () => {
      sendOne('Se existisse um plano passo a passo de 14 dias\n\nmostrando exactamente o que fazer para despertar mais atracção, interesse, ligação e saudade no homem que desejas...\n\ncomprometerias a seguir?', () => {
        showOptions([
          { text: 'Sim, eu comprometo-me',            feedback: '' },
          { text: 'Sim, quero entender cada detalhe', feedback: '' }
        ], next);
      });
    });
  },

  // 17 — Análise: grupo 1 (3 msgs) + Continuar
  function() {
    showBubbles([
      '⚠️ <strong>Análise concluída.</strong>\n\nPelas tuas respostas, identifiquei o teu perfil e tens um potencial muito alto.',
      'Mas deixa-me revelar algo:\nO problema não é falta de sorte com os homens...\n\nÉ que algumas atitudes podem tornar a ligação previsível e diminuir a curiosidade e o desejo dele por ti.',
      'A boa notícia?\n\nEssa dinâmica pode mudar no teu caso.\n\nActivando os <strong>Gatilhos de Dopamina Masculina</strong>... que ajudam a aumentar a dopamina no cérebro dele, despertando mais expectativa, curiosidade e desejo nas interacções contigo!'
    ], () => showButton('Continuar', next));
  },

  // 18 — Análise: grupo 2 (3 msgs) + Continuar
  function() {
    showBubbles([
      'Seguindo acções simples e técnicas poderosas comprovadas cientificamente.',
      'Por isso, a solução ideal para ti é o:\n\n🔥 <strong>Plano Mulher Magnética</strong>\n\nUm passo a passo de 14 dias, onde aprendes a activar os Gatilhos de Dopamina nele.\n\nVais saber exactamente o que fazer e quando fazer, para aumentar a atracção nele, e deixá-lo louco por ti!',
      'E o melhor: sem precisares de te humilhar, implorar ou manipular.'
    ], () => showButton('Continuar', next));
  },

  // 19 — Benefícios + Continuar
  function() {
    sendOne('Vê alguns dos benefícios que vais ter com o Plano Mulher Magnética:\n\n✅ Fazer ele sentir a tua falta\n✅ Aumentar a atracção dele por ti\n✅ Fazer ele pensar em ti como nunca\n✅ Fazer ele querer procurar-te e tomar iniciativa\n✅ Aumentar o desejo e a ligação\n✅ Fazer ele querer ficar cada vez mais perto de ti\n✅ Tornares-te a única opção\n✅ Tornares-te inesquecível', () => {
      showButton('Continuar', next);
    });
  },

  // 20 — 94% + depoimentos (grupo 1: texto + 3 imagens)
  function() {
    showBubbles([
      '<strong>94% das mulheres</strong> que estavam numa situação semelhante à tua...\n\nseguiram o Plano Mulher Magnética e deixaram o homem obcecado por elas, em menos de 14 dias!',
      '<img src="depoimento1.jpg" style="width:100%;max-width:250px;border-radius:8px;display:block;">',
      '<img src="depoimento2.jpg" style="width:100%;max-width:250px;border-radius:8px;display:block;">',
      '<img src="depoimento3.jpg" style="width:100%;max-width:250px;border-radius:8px;display:block;">'
    ], () => showButton('Continuar', next));
  },

  // 21 — 94% + depoimentos (grupo 2: texto final + botão)
  function() {
    showBubbles([
      'Como viste...\n\nMulheres que aplicam o Plano Mulher Magnética aprendem a usar o gatilho de dopamina da forma certa...\n\ne com isso deixam qualquer homem louco por elas, sem precisar de implorar atenção.',
      'Muitas relatam que, quando aplicam o plano...\n\nEles próprios voltam a procurá-las, demonstrando mais interesse, saudade e vontade de se aproximar.'
    ], () => showButton('Sim, eu quero esses resultados!', next));
  },

  // 22 — Parabéns + plano pronto + Continuar
  function() {
    showBubbles([
      'Ótimo! Parabéns por esta decisão.\n\nVais também ter óptimos resultados com o Plano Mulher Magnética!',
      'E agora o teu plano personalizado de 14 dias já está pronto!',
      'De acordo com as tuas respostas, assim vão ser os teus resultados:'
    ], () => showButton('Continuar', next));
  },

  // 23 — Timeline (4 dias + 9 dias + 14 dias + pergunta) + botão
  function() {
    showBubbles([
      '🔴 <strong>Hoje:</strong>\nEle não demonstra tanto interesse em ti',
      '🟠 <strong>Em 4 dias:</strong>\nEle começa a pensar em ti',
      '🟡 <strong>Em 9 dias:</strong>\nSente a tua falta e uma atracção incontrolável por ti',
      '🟢 <strong>Em 14 dias:</strong>\nEle está mais presente, totalmente interessado e a tomar iniciativas para ficar perto de ti'
    ], () => showButton('Continuar', next));
  },

  // 24 — Pergunta final + botão
  function() {
    sendOne('Estás pronta para te tornares uma Mulher Magnética, fazer ele sentir a tua falta e deixá-lo louco por ti?', () => {
      showButton('Sim, eu quero isso!', next);
    });
  },

  // 25 — O que recebes + botão
  function() {
    sendOne('📋 <strong>O QUE RECEBES HOJE:</strong>\n\n✅ Plano Mulher Magnética\n✅ Truques para disparar dopamina e fazê-lo sentir saudades\n✅ Métodos para aumentar a atracção e lealdade dele\n✅ Dicas de especialistas para elevar os hormônios do amor dele\n✅ Estratégias para deixá-lo obcecado por ti\n✅ Técnicas poderosas para magnetizá-lo\n✅ Como aplicar o plano mesmo estando longe dele\n✅ Acesso imediato\n✅ Acesso vitalício ao plano', () => {
      sendOne('✅ Milhares de alunas aplicaram, e conseguiram resultados incríveis!', () => {
        showButton('Quero o meu plano!', next);
      });
    });
  },

  // 26 — Bónus 1, 2, 3 + Continuar
  function() {
    showBubbles([
      'Ok! E além do teu plano...\n\nVou dar-te mais <strong>4 bónus exclusivos</strong> hoje...',
      '🎁 <strong>BÓNUS 1, Guia dos 7 Erros Que Fazem Ele Perder o Interesse</strong>\n\nDescobre os principais erros que podem diminuir a atracção e fazer um homem afastar-se... e o que fazer em vez disso.\n\nDe <s>19,90€</s> por: <strong>GRÁTIS</strong>',
      '🎁 <strong>BÓNUS 2, Como Ler os Sinais de Interesse Dele</strong>\n\nAprende a identificar quando um homem está realmente interessado... e reconhece os sinais que mostram quando é hora de te aproximar ou dar espaço.\n\nDe <s>29,90€</s> por: <strong>GRÁTIS</strong>',
      '🎁 <strong>BÓNUS 3, Manual da Mulher Inesquecível</strong>\n\nMelhora a aparência e autoestima, para ele ficar ainda mais louco de desejo por ti.\n\nDe <s>27,90€</s> por: <strong>GRÁTIS</strong>'
    ], () => showButton('Continuar', next));
  },

  // 27 — Lista completa + preço + Continuar
  function() {
    showBubbles([
      '<strong>QUANTO CUSTA TUDO ISSO?</strong>\n\n✅ Plano Mulher Magnética\n✅ Aplicativo com desafios, checklist, aulas\n✅ Truques para activar dopamina\n✅ Métodos para aumentar a atracção e lealdade\n✅ Estratégias para deixá-lo obcecado\n✅ Técnicas para magnetizá-lo\n✅ Como aplicar o plano mesmo à distância\n✅ Guia dos 7 erros\n✅ Como ler os sinais de interesse\n✅ Manual da Mulher Inesquecível\n✅ Acesso imediato e vitalício',
      'Tudo isso acima de: <s>197€</s>\n\n<strong>HOJE por apenas: 4,24€</strong>\n\nSim, menos que o preço de um café.\n\nComo a minha missão é ajudar...\n\n🔥 Hoje, vou liberar apenas 5 vagas por esse valor promocional! ⏰'
    ], () => showButton('Continuar', next));
  },

  // 28 — Garantia + texto final + CTA
  function() {
    showBubbles([
      '✅ E ainda, tens <strong>30 dias de garantia de reembolso.</strong>\n\nSe por qualquer motivo achares que o plano não é para ti, basta solicitar o reembolso que devolvo 100% do teu investimento.\n\nSimples assim. O risco é todo meu. O teu risco é zero.',
      'Então, se realmente queres aumentar a atracção dele, fazê-lo sentir a tua falta e sempre ter vontade de te procurar...\n\nClica no botão abaixo e garante a tua vaga no Plano Mulher Magnética com todos os bónus! 👇'
    ], showFinalCTA);
  }

];

// ========================
// CTA FINAL
// ========================
function showFinalCTA() {
  if (progressBar) progressBar.style.width = '100%';
  optionsPanel.innerHTML = '';
  optionsPanel.classList.add('cta-mode');

  const link = document.createElement('a');
  link.href = 'https://pay.hotmart.com/P108134502G?off=vlywnk0c&checkoutMode=10&bid=1792620514757';
  link.className = 'cta-green pulse-anim';
  link.target = '_blank';
  link.textContent = 'SIM, QUERO TER ELE LOUCO POR MIM! 🔥';

  const priceBox = document.createElement('div');
  priceBox.className = 'price-box';
  priceBox.innerHTML = `<span class="price-main">4,24 €</span><span class="price-vat">IVA Incluído (0,24 €)</span>`;

  const guarantee = document.createElement('p');
  guarantee.className = 'guarantee-txt';
  guarantee.textContent = '🛡️ Garantia de 30 dias · Pagamento 100% seguro';

  optionsPanel.appendChild(link);
  optionsPanel.appendChild(priceBox);
  optionsPanel.appendChild(guarantee);
  scrollBottom();
}

// ========================
// ARRANQUE
// ========================
window.addEventListener('load', () => {
  setTimeout(() => flowDefs[0](), 800);
});
