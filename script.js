// ================================================================
// FLUXO COMPLETO — chat contínuo, sem mudar de ecrã
// ================================================================

// ========================
// ELEMENTOS DOM
// ========================
const chatArea        = document.getElementById('chat-area');
const optionsPanel    = document.getElementById('options-panel');
const waStatus        = document.getElementById('wa-status');
const progressBar     = document.getElementById('progress-bar');

// ========================
// UTILS
// ========================
function getTime() {
  const n = new Date();
  return `${String(n.getHours()).padStart(2,'0')}:${String(n.getMinutes()).padStart(2,'0')}`;
}
function scrollBottom() {
  chatArea.scrollTop = chatArea.scrollHeight;
}
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
function typingDelay(text) {
  const len = text.replace(/<[^>]*>/g, '').replace(/\n/g, '').length;
  return Math.min(Math.max(len * 18, 900), 2800);
}

// ========================
// ENGINE DE PASSOS
// ========================
let currentStep = 0;

// Mostrar uma sequência de bolhas do doutor, depois executar callback
function showBubbles(bubbles, cb, i) {
  i = i || 0;
  if (i >= bubbles.length) { if (cb) cb(); return; }
  showTyping();
  const delay = bubbles[i].includes('<img') ? 1200 : typingDelay(bubbles[i]);
  setTimeout(() => {
    removeTyping();
    addBubbleIn(bubbles[i]);
    setTimeout(() => showBubbles(bubbles, cb, i + 1), 600);
  }, delay);
}

// Mostrar botão único no painel (torna-se bolha verde ao clicar)
function showButton(text, cb) {
  optionsPanel.innerHTML = '';
  const btn = document.createElement('button');
  btn.className = 'btn-start-chat';
  btn.textContent = text;
  btn.addEventListener('click', () => {
    addBubbleOut(text);
    optionsPanel.innerHTML = '';
    setTimeout(cb, 400);
  });
  optionsPanel.appendChild(btn);
}

// Mostrar opções de resposta (botões pill verdes)
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
        showTyping();
        setTimeout(() => {
          removeTyping();
          addBubbleIn(opt.feedback);
          if (opt.afterButton) {
            setTimeout(() => showButton(opt.afterButton, cb), 700);
          } else {
            setTimeout(cb, 700);
          }
        }, typingDelay(opt.feedback));
      } else {
        setTimeout(cb, 400);
      }
    });
    optionsPanel.appendChild(btn);
  });
}

// Mostrar pergunta de múltipla escolha (checkboxes)
function showMultiSelect(options, feedbackBubbles, cb) {
  optionsPanel.innerHTML = '';
  options.forEach(text => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.textContent = text;
    btn.addEventListener('click', () => btn.classList.toggle('selected'));
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
      setTimeout(cb, 400);
    }
  });
  optionsPanel.appendChild(confirm);

  // Mostrar/ocultar botão confirmar
  optionsPanel.querySelectorAll('.option-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const count = optionsPanel.querySelectorAll('.option-btn.selected').length;
      confirm.style.display = count > 0 ? 'block' : 'none';
    });
  });
}

// Progresso
function updateProgress(step, total) {
  if (progressBar) progressBar.style.width = (step / total * 100) + '%';
}

// ========================
// DEFINIÇÃO DO FLUXO
// ========================
// Cada "passo" é executado em sequência.
// next() avança para o próximo passo.

function next() {
  currentStep++;
  updateProgress(currentStep, 22);
  if (currentStep < flowDefs.length) flowDefs[currentStep]();
}

const flowDefs = [

  // PASSO 0: Boas-vindas (executado no load)
  function step0() {
    showTyping();
    setTimeout(() => {
      removeTyping();
      addBubbleIn(
        'Use nele o <strong>"gatilho de dopamina"</strong> para <strong>aumentar a atracção dele em ti,</strong> e fazer ele <strong>sentir a tua falta.</strong>\n\nClica abaixo, faz o <strong>teste grátis de 1 minuto</strong> e aprende…'
      );
      showButton('👉 COMEÇAR TESTE GRÁTIS', next);
    }, 1800);
  },

  // PASSO 1: Introdução do doutor
  function step1() {
    showBubbles([
      'Olá, sou o Dr. António Figueiredo — <strong>especialista em psicologia de relacionamentos</strong> há mais de 15 anos.\n\nJá ajudei <strong>mais de 7.600 mulheres</strong> a <strong>fazer o homem certo ficar obcecado por elas</strong> com este método.\n\nResponde-me algumas <strong>perguntas rápidas</strong> para eu entender o teu caso e poder ensinar-te também!'
    ], () => showButton('Continuar', next));
  },

  // PASSO 2: Q1 — Idade
  function step2() {
    showBubbles(['Para começar, diz-me: Qual a tua idade?'], () => {
      showOptions([
        { text: '18-29 anos', feedback: '' },
        { text: '30–39 anos', feedback: '' },
        { text: '40–49 anos', feedback: '' },
        { text: '50+',        feedback: '' }
      ], next);
    });
  },

  // PASSO 3: Q2 — Objectivo principal
  function step3() {
    showBubbles(['Responde com sinceridade…\nQual é o teu principal objectivo?'], () => {
      showOptions([
        { text: 'Atrair o homem certo',
          feedback: 'Entendi…\n\nEntão não é simplesmente sobre ter alguém.\n\nQueres conseguir despertar o interesse do homem que realmente desejas.' },
        { text: 'Deixá-lo obcecado',
          feedback: 'Entendi…\n\nEntão não é simplesmente sobre ter alguém.\n\nQueres que ele não consiga parar de pensar em ti — e isso é totalmente possível.' },
        { text: 'Casar-se',
          feedback: 'Entendi…\n\nPara ele dar esse passo, precisa sentir que tu és a única opção — e há uma forma de activar isso nele.' },
        { text: 'Reacender a paixão',
          feedback: 'Entendi…\n\nEntão em algum momento já existiu uma ligação mais forte…\n\ne hoje gostavas de sentir aquela intensidade de novo.' }
      ], next);
    });
  },

  // PASSO 4: Q3 — Estado de relacionamento
  function step4() {
    showBubbles(['E hoje…\nQual é o teu estado de relacionamento?'], () => {
      showOptions([
        { text: 'Solteira',                      feedback: '' },
        { text: 'É complicado',                   feedback: '' },
        { text: 'Encontro casual / namorando',    feedback: '' },
        { text: 'Casada / relacionamento sério',  feedback: '' }
      ], next);
    });
  },

  // PASSO 5: Q4 — Vida amorosa
  function step5() {
    showBubbles(['Como te sentes em relação à tua vida amorosa neste momento?'], () => {
      showOptions([
        { text: 'Estou confortável com ela',
          feedback: 'Mas podemos sempre melhorar e criar uma ligação ainda mais profunda.' },
        { text: 'Gostaria de me sentir mais confiante',
          feedback: 'Entendi…\n\nPrecisas de saber se estás a agir correctamente… se ele está realmente interessado… ou qual deve ser o teu próximo passo.' },
        { text: 'Não me sinto amada como gostaria',
          feedback: 'Entendo. E isso muda completamente quando activamos o instinto de perseguição dele.' }
      ], next);
    });
  },

  // PASSO 6: Q5 — Frequência
  function step6() {
    showBubbles(['Pensando nas tuas experiências amorosas…\n\nCom que frequência sentes que ofereces mais do que recebes?'], () => {
      showOptions([
        { text: 'Muito frequentemente', feedback: '' },
        { text: 'Às vezes',             feedback: '' },
        { text: 'Quase nunca',          feedback: '' }
      ], next);
    });
  },

  // PASSO 7: Q6 — Desafios (multi-select)
  function step7() {
    showBubbles(['Quais destes desafios sentes na tua vida amorosa?\n(podes escolher mais de um)'], () => {
      showMultiSelect(
        [
          'Valorizo mais ele do que a mim própria',
          'Sou rejeitada',
          'Não consigo atrair o homem certo',
          'Não me sinto amada',
          'Sinto que a paixão acabou'
        ],
        [
          'Isso acaba levando para uma sensação parecida: não estás a receber do homem a resposta emocional que gostarias.\n\nSeja atenção… desejo… saudade… iniciativa… ou simplesmente sentir que és importante para ele…',
          'Mas <strong>8 em cada 10 mulheres</strong> notam mudanças já nos primeiros dias quando aprendem a activar o gatilho da dopamina nele…\n\nPois é o único jeito de o deixar completamente louco por ti.'
        ],
        next
      );
    });
  },

  // PASSO 8: Q7 — Última vez amada
  function step8() {
    showBubbles(['Qual foi a última vez que te sentiste realmente amada e valorizada numa relação?'], () => {
      showOptions([
        { text: 'Menos de 1 ano atrás',     feedback: '' },
        { text: 'Entre 1 e 2 anos atrás',   feedback: '' },
        { text: 'Há mais de 3 anos atrás',  feedback: '' },
        { text: 'Nunca',                     feedback: '' }
      ], next);
    });
  },

  // PASSO 9: Q8 — Influência / controlo
  function step9() {
    showBubbles(['Gostavas de ter mais influência sobre os homens?'], () => {
      showOptions([
        { text: 'Claro que sim',         feedback: '' },
        { text: 'Sim, mas com condições', feedback: '' }
      ], next);
    });
  },

  // PASSO 10: Q9 — Homem ideal → feedback → Continuar
  function step10() {
    const feedbackText = 'Faz ele escolher-te todos os dias!\n\nQuando activas os gatilhos de dopamina nele, ele começa a pensar em ti o tempo todo, querer realizar os teus desejos e permanecer completamente comprometido.';
    showBubbles(['Pensando no homem ideal para ti…\n\nQual destas qualidades é a mais importante?'], () => {
      showOptions([
        { text: 'Gentil',                 feedback: feedbackText, afterButton: 'Continuar' },
        { text: 'Fiel',                   feedback: feedbackText, afterButton: 'Continuar' },
        { text: 'Carinhoso',              feedback: feedbackText, afterButton: 'Continuar' },
        { text: 'Que me apoie',           feedback: feedbackText, afterButton: 'Continuar' },
        { text: 'Voltado para a família', feedback: feedbackText, afterButton: 'Continuar' }
      ], next);
    });
  },

  // PASSO 11: Q10 — Quão bem entendes os homens
  function step11() {
    showBubbles(['Quão bem achas que entendes os homens?'], () => {
      showOptions([
        { text: 'Muitas vezes não faço ideia do que ele está a pensar',
          feedback: 'E essa falta de clareza costuma gerar muita confusão e ansiedade.\n\nPorque quando não entendes o comportamento…\n\nqualquer silêncio, mensagem ou mudança parece carregar algum significado oculto.' },
        { text: 'Entendo alguma coisa, mas não o suficiente',
          feedback: 'E essa falta de clareza costuma gerar muita confusão e ansiedade.\n\nPorque quando não entendes o comportamento…\n\nqualquer silêncio, mensagem ou mudança parece carregar algum significado oculto.' },
        { text: 'Geralmente consigo perceber o que ele sente',
          feedback: 'Mesmo entendendo alguma coisa, há sempre camadas mais profundas na mente dele que podem surpreender-te.' }
      ], next);
    });
  },

  // PASSO 12: Info dopamina — botão único
  function step12() {
    showBubbles([
      'Sabias que aumentar a dopamina dele pode fazer com que ele sinta a tua falta?'
    ], () => showButton('Quero entender como funciona', next));
  },

  // PASSO 13: Ciência + próxima info
  function step13() {
    showBubbles([
      'Estudos científicos revelam que a dopamina — o hormônio do desejo, alimenta a excitação dele.\n\nAo activar os gatilhos de dopamina, ele vai desejar a tua atenção e aprofundar a ligação.',
      'Sabias que pequenas recompensas podem mantê-lo a pensar em ti?'
    ], () => showButton('Quero entender como', next));
  },

  // PASSO 14: Q11 — Estratégias (multi-select)
  function step14() {
    showBubbles(['Quais destas estratégias gostavas mais de aprender?\n(podes escolher mais de uma)'], () => {
      showMultiSelect(
        [
          'Como fazer ele sentir saudades de mim',
          'Como fazer ele apegar-se a mim',
          'Como fazer ele ser mais proactivo comigo',
          'Como perceber melhor o que ele está a pensar'
        ],
        [],
        next
      );
    });
  },

  // PASSO 15: Q12 — Quão pronta estás
  function step15() {
    showBubbles(['Quão pronta estás para transformar a tua vida amorosa?'], () => {
      showOptions([
        { text: 'Estou totalmente pronta!', feedback: '' },
        { text: 'Preciso de mais preparação', feedback: '' },
        { text: 'Tenho algumas dúvidas',   feedback: '' }
      ], next);
    });
  },

  // PASSO 16: 94% + pergunta de comprometimento
  function step16() {
    showBubbles([
      '<strong>94% das mulheres</strong> que usam estes gatilhos de dopamina despertaram atracção e comprometimento em apenas algumas semanas!',
      'Se existisse um plano passo a passo de 14 dias\n\nmostrando exactamente o que fazer para despertar mais atracção, interesse, ligação e saudade no homem que desejas…\n\ncomprometerias a seguir?'
    ], () => showButton('Sim, mas quero entender cada detalhe', next));
  },

  // PASSO 17: Análise + solução + Continuar
  function step17() {
    showBubbles([
      '⚠️ <strong>Análise concluída.</strong>\n\nPelas tuas respostas, identifiquei o teu perfil e tens um potencial muito alto.',
      'Mas deixa-me revelar algo:\nO problema não é falta de sorte com os homens…\n\nÉ que algumas atitudes podem tornar a ligação previsível e diminuir a curiosidade e o desejo dele por ti.',
      'A boa notícia?\n\nEssa dinâmica pode mudar no teu caso.\n\nActivando os <strong>Gatilhos de Dopamina Masculina</strong>…\n\nque ajudam a aumentar a dopamina no cérebro dele, despertando mais expectativa, curiosidade e desejo nas interacções contigo!',
      'Seguindo acções simples e técnicas poderosas comprovadas cientificamente.',
      'Por isso, a solução ideal para ti é o:\n\n🔥 <strong>Plano Mulher Magnética</strong>\n\nUm passo a passo de 14 dias, onde aprendes a activar os Gatilhos de Dopamina nele.\n\nVais saber exactamente o que fazer e quando fazer, para aumentar a atracção nele, e deixá-lo louco por ti!',
      'E o melhor: sem precisares de te humilhar, implorar ou manipular.'
    ], () => showButton('Continuar', next));
  },

  // PASSO 18: Benefícios + Continuar
  function step18() {
    showBubbles([
      'Vê alguns dos benefícios que vais ter com o Plano Mulher Magnética:\n\n✅ Fazer ele sentir a tua falta\n✅ Aumentar a atracção dele por ti\n✅ Fazer ele pensar em ti como nunca\n✅ Fazer ele querer procurar-te e tomar iniciativa\n✅ Aumentar o desejo e a ligação\n✅ Fazer ele querer ficar cada vez mais perto de ti\n✅ Tornares-te a única opção\n✅ Tornares-te inesquecível'
    ], () => showButton('Continuar', next));
  },

  // PASSO 19: 94% + depoimentos + mais + botão
  function step19() {
    showBubbles([
      '<strong>94% das mulheres</strong> que estavam numa situação semelhante à tua…\n\nseguiram o Plano Mulher Magnética e deixaram o homem obcecado por elas — em menos de 14 dias!',
      '<img src="depoimento1.jpg" style="width:100%;max-width:250px;border-radius:8px;display:block;">',
      '<img src="depoimento2.jpg" style="width:100%;max-width:250px;border-radius:8px;display:block;">',
      '<img src="depoimento3.jpg" style="width:100%;max-width:250px;border-radius:8px;display:block;">',
      'Como viste…\n\nMulheres que aplicam o Plano Mulher Magnética aprendem a usar o gatilho de dopamina da forma certa…\n\ne com isso deixam qualquer homem louco por elas — sem precisar de implorar atenção.',
      'Muitas relatam que, quando aplicam o plano…\n\nEles próprios voltam a procurá-las, demonstrando mais interesse, saudade e vontade de se aproximar.'
    ], () => showButton('Sim, eu quero esses resultados!', next));
  },

  // PASSO 20: Parabéns + timeline + botão
  function step20() {
    showBubbles([
      'Ótimo! Parabéns por esta decisão.\n\nVais também ter óptimos resultados com o Plano Mulher Magnética!',
      'E agora o teu plano personalizado de 14 dias já está pronto!',
      'De acordo com as tuas respostas, assim vão ser os teus resultados:',
      '🔴 <strong>Hoje:</strong>\nEle não demonstra tanto interesse em ti',
      '🟠 <strong>Em 4 dias:</strong>\nEle começa a pensar em ti',
      '🟡 <strong>Em 9 dias:</strong>\nSente a tua falta e uma atracção incontrolável por ti',
      '🟢 <strong>Em 14 dias:</strong>\nEle está mais presente, totalmente interessado e a tomar iniciativas para ficar perto de ti',
      'Estás pronta para te tornares uma Mulher Magnética, fazer ele sentir a tua falta e deixá-lo louco por ti?'
    ], () => showButton('Sim, eu quero isso!', next));
  },

  // PASSO 21: O que recebes + CTA final no painel
  function step21() {
    showBubbles([
      '📋 <strong>O QUE RECEBES HOJE:</strong>\n\n✅ Plano Mulher Magnética\n✅ Truques para disparar dopamina e fazê-lo sentir saudades\n✅ Métodos para aumentar a atracção e lealdade dele\n✅ Dicas de especialistas para elevar os hormônios do amor dele\n✅ Estratégias para deixá-lo obcecado por ti\n✅ Técnicas poderosas para magnetizá-la\n✅ Como aplicar o plano mesmo estando longe dele\n✅ Acesso imediato\n✅ Acesso vitalício ao plano',
      '✅ Milhares de alunas aplicaram, e conseguiram resultados incríveis!',
      '✅ E ainda, tens <strong>30 dias de garantia de reembolso</strong>.\n\nSe por qualquer motivo achares que o plano não é para ti, basta solicitar o reembolso que devolvo 100% do teu investimento.\n\nSimples assim. O risco é todo meu. O teu risco é zero.',
      'Então, se realmente queres aumentar a atracção dele, fazê-lo sentir a tua falta e sempre ter vontade de te procurar…\n\nClica no botão abaixo e garante a tua vaga no Plano Mulher Magnética! 👇'
    ], showFinalCTA);
  }

];

// ========================
// CTA FINAL (no painel inferior)
// ========================
function showFinalCTA() {
  if (progressBar) progressBar.style.width = '100%';
  optionsPanel.innerHTML = '';
  optionsPanel.style.flexDirection = 'column';
  optionsPanel.style.gap = '10px';

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
  setTimeout(() => flowDefs[0](), 600);
});
