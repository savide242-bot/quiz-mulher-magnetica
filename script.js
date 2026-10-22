// ========================
// PERGUNTAS (copiadas da página de referência, adaptadas PT-PT)
// ========================
const questions = [
  // Q1 — IDADE
  {
    question: "Para começar, diz-me: Qual a tua idade?",
    options: [
      { text: "18-29 anos",  feedback: "" },
      { text: "30–39 anos",  feedback: "" },
      { text: "40–49 anos",  feedback: "" },
      { text: "50+",         feedback: "" }
    ]
  },

  // Q2 — OBJECTIVO PRINCIPAL
  {
    question: "Responde com sinceridade…\nQual é o teu principal objectivo?",
    options: [
      {
        text: "Atrair o homem certo",
        feedback: "Entendi… Então não é simplesmente sobre ter alguém.\n\nQueres conseguir despertar o interesse do homem que realmente desejas."
      },
      {
        text: "Deixá-lo obcecado",
        feedback: "Entendi… Então não é simplesmente sobre ter alguém.\n\nQueres que ele não consiga parar de pensar em ti — e isso é totalmente possível."
      },
      {
        text: "Casar-se",
        feedback: "Entendi… Para ele dar esse passo, precisa sentir que tu és a única opção — e há uma forma de activar isso nele."
      },
      {
        text: "Reacender a paixão",
        feedback: "Entendi… Reacender a paixão é mais simples do que parece quando activamos os gatilhos certos na mente dele."
      }
    ]
  },

  // Q3 — STATUS DE RELACIONAMENTO
  {
    question: "E hoje…\nQual é o teu estado de relacionamento?",
    options: [
      { text: "Solteira",                    feedback: "" },
      { text: "É complicado",                feedback: "" },
      { text: "Encontro casual / namorando", feedback: "" },
      { text: "Casada / relacionamento sério", feedback: "" }
    ]
  },

  // Q4 — VIDA AMOROSA
  {
    question: "Como te sentes em relação à tua vida amorosa neste momento?",
    options: [
      {
        text: "Estou confortável com ela",
        feedback: "Mas podemos sempre melhorar e criar uma ligação ainda mais profunda."
      },
      {
        text: "Gostaria de me sentir mais confiante",
        feedback: "Entendi…\n\nPrecisas de saber se estás a agir correctamente… se ele está realmente interessado… ou qual deve ser o teu próximo passo."
      },
      {
        text: "Não me sinto amada como gostaria",
        feedback: "Entendo. E isso muda completamente quando activamos o instinto de perseguição dele."
      }
    ]
  },

  // Q5 — FREQUÊNCIA DÁ MAIS DO QUE RECEBE
  {
    question: "Pensando nas tuas experiências amorosas…\n\nCom que frequência sentes que ofereces mais do que recebes?",
    options: [
      {
        text: "Muito frequentemente",
        feedback: "Isso é exaustivo. Mas podes inverter esse jogo e fazê-lo investir mais na relação."
      },
      {
        text: "Às vezes",
        feedback: "Entendo. O ideal é que ele esteja sempre focado em agradar-te e conquistar-te."
      },
      {
        text: "Quase nunca",
        feedback: "Óptimo. E com as técnicas certas, manterás essa dinâmica a teu favor para sempre."
      }
    ]
  },

  // Q6 — DESAFIOS (multi-select)
  {
    question: "Quais destes desafios sentes na tua vida amorosa?\n(podes escolher mais de um)",
    multiSelect: true,
    multiSelectFeedback: "Isso acaba levando para uma sensação parecida: não estás a receber do homem a resposta emocional que gostarias.\n\nSeja atenção… desejo… saudade… iniciativa… ou simplesmente sentir que és importante para ele…\n\nMas 8 em cada 10 mulheres notam mudanças já nos primeiros dias quando aprendem a activar o gatilho da dopamina nele…\n\nPois é o único jeito de o deixar completamente louco por ti.",
    options: [
      { text: "Valorizo mais ele do que a mim própria" },
      { text: "Sou rejeitada" },
      { text: "Não consigo atrair o homem certo" },
      { text: "Não me sinto amada" },
      { text: "Sinto que a paixão acabou" }
    ]
  },

  // Q7 — ÚLTIMA VEZ AMADA
  {
    question: "Qual foi a última vez que te sentiste realmente amada e valorizada numa relação?",
    options: [
      {
        text: "Menos de 1 ano atrás",
        feedback: "Entendi… E manter essa sensação é o segredo para uma relação duradoura."
      },
      {
        text: "Entre 1 e 2 anos atrás",
        feedback: "Entendi… E essa sensação pesa. Porque não é só querer ter alguém — é querer sentir que existe alguém do outro lado."
      },
      {
        text: "Há mais de 3 anos atrás",
        feedback: "Entendi… E essa sensação pesa. Porque não é só querer ter alguém. É querer sentir que existe alguém do outro lado que também te escolhe, valoriza e deseja."
      },
      {
        text: "Nunca",
        feedback: "Entendi… E essa sensação pesa muito. Porque não é só querer ter alguém. É querer sentir que existe alguém do outro lado que também te escolhe, valoriza e deseja — e isso é absolutamente possível para ti."
      }
    ]
  },

  // Q8 — CONTROLO / INFLUÊNCIA
  {
    question: "Gostavas de ter mais influência sobre os homens?",
    options: [
      {
        text: "Claro que sim",
        feedback: "Faz ele escolher-te todos os dias! Quando activas os gatilhos de dopamina nele, ele começa a pensar em ti o tempo todo, querer realizar os teus desejos e permanecer completamente comprometido."
      },
      {
        text: "Sim, mas com condições",
        feedback: "Ter influência não é manipular — é saber exactamente como o cérebro dele funciona para que ele te escolha todos os dias."
      }
    ]
  },

  // Q9 — HOMEM IDEAL
  {
    question: "Pensando no homem ideal para ti…\n\nQual destas qualidades é a mais importante?",
    options: [
      {
        text: "Gentil",
        feedback: "Faz ele escolher-te todos os dias!\n\nQuando activas os gatilhos de dopamina nele, ele começa a pensar em ti o tempo todo, querer realizar os teus desejos e permanecer completamente comprometido."
      },
      {
        text: "Fiel",
        feedback: "Faz ele escolher-te todos os dias!\n\nQuando activas os gatilhos de dopamina nele, ele começa a pensar em ti o tempo todo, querer realizar os teus desejos e permanecer completamente comprometido."
      },
      {
        text: "Carinhoso",
        feedback: "Faz ele escolher-te todos os dias!\n\nQuando activas os gatilhos de dopamina nele, ele começa a pensar em ti o tempo todo, querer realizar os teus desejos e permanecer completamente comprometido."
      },
      {
        text: "Que me apoie",
        feedback: "Faz ele escolher-te todos os dias!\n\nQuando activas os gatilhos de dopamina nele, ele começa a pensar em ti o tempo todo, querer realizar os teus desejos e permanecer completamente comprometido."
      },
      {
        text: "Voltado para a família",
        feedback: "Faz ele escolher-te todos os dias!\n\nQuando activas os gatilhos de dopamina nele, ele começa a pensar em ti o tempo todo, querer realizar os teus desejos e permanecer completamente comprometido."
      }
    ]
  }
];

// ========================
// MENSAGENS FINAIS
// ========================
const finalMessages = [
  "Muitas das mulheres que estavam numa situação semelhante à tua… seguiram o Plano Mulher Magnética e deixaram o homem obcecado por elas — em menos de 14 dias!",
  "<img src='depoimento1.jpg' style='width:100%;max-width:250px;border-radius:8px;display:block;'>",
  "<img src='depoimento2.jpg' style='width:100%;max-width:250px;border-radius:8px;display:block;'>",
  "<img src='depoimento3.jpg' style='width:100%;max-width:250px;border-radius:8px;display:block;'>",
  "Como viste…<br><br>Mulheres que aplicam o Plano Mulher Magnética aprendem a usar o gatilho de dopamina da forma certa… e com isso deixam qualquer homem louco por elas — sem precisar de implorar atenção.",
  "Muitas relatam que, quando aplicam o plano…",
  "Eles próprios voltam a procurá-las, demonstrando mais interesse, saudade e vontade de se aproximar."
];

// ========================
// ESTADO
// ========================
let currentQuestionIndex = 0;

// ========================
// ELEMENTOS DOM
// ========================
const chatArea        = document.getElementById('chat-area');
const optionsPanel    = document.getElementById('options-panel');
const waStatus        = document.getElementById('wa-status');
const progressBar     = document.getElementById('progress-bar');
const finalScreen     = document.getElementById('final-screen');
const finalChatBody   = document.getElementById('final-chat-body');
const finalChatFooter = document.getElementById('final-chat-footer');
const finalStatus     = document.getElementById('final-status');

// ========================
// UTILS
// ========================
function getTime() {
  const n = new Date();
  return `${String(n.getHours()).padStart(2,'0')}:${String(n.getMinutes()).padStart(2,'0')}`;
}

function scrollBottom(el) {
  if (el) el.scrollTop = el.scrollHeight;
}

function addBubbleIn(container, html) {
  const isImg = html.includes('<img');
  const div = document.createElement('div');
  div.className = 'bubble-in';
  if (isImg) {
    div.style.background = 'transparent';
    div.style.boxShadow = 'none';
    div.style.padding = '0';
    div.innerHTML = html;
  } else {
    div.innerHTML = html.replace(/\n/g, '<br>') + `<div class="bubble-time">${getTime()}</div>`;
  }
  container.appendChild(div);
  scrollBottom(container);
}

function addBubbleOut(container, text) {
  const div = document.createElement('div');
  div.className = 'bubble-out';
  div.innerHTML = text + `<div class="bubble-time">${getTime()}</div>`;
  container.appendChild(div);
  scrollBottom(container);
}

function showTyping(container, statusEl) {
  removeTyping(container);
  if (statusEl) statusEl.textContent = 'a digitar...';
  const div = document.createElement('div');
  div.className = 'bubble-typing';
  div.id = 'typing-indicator';
  div.innerHTML = `<div class="typing-dots"><span></span><span></span><span></span></div>`;
  container.appendChild(div);
  scrollBottom(container);
}

function removeTyping(container) {
  const t = container.querySelector('#typing-indicator');
  if (t) t.remove();
}

// ========================
// INÍCIO — Mensagem de boas-vindas
// ========================
window.addEventListener('load', () => {
  setTimeout(() => {
    showTyping(chatArea, waStatus);
    setTimeout(() => {
      removeTyping(chatArea);
      if (waStatus) waStatus.textContent = 'online';
      addBubbleIn(chatArea,
        'Use nele o <strong>"gatilho de dopamina"</strong> para <strong>aumentar a atracção dele em ti,</strong> e fazer ele <strong>sentir a tua falta.</strong>\n\nClica abaixo, faz o <strong>teste grátis de 1 minuto</strong> e aprende…'
      );
      renderStartButton();
    }, 1800);
  }, 600);
});

function renderStartButton() {
  optionsPanel.innerHTML = '';
  const btn = document.createElement('button');
  btn.className = 'btn-start-chat';
  btn.textContent = 'Continuar';
  btn.addEventListener('click', startQuiz);
  optionsPanel.appendChild(btn);
}

// ========================
// INICIAR QUIZ
// ========================
function startQuiz() {
  addBubbleOut(chatArea, 'Continuar');
  optionsPanel.innerHTML = '';
  setTimeout(() => loadQuestion(), 500);
}

// ========================
// QUIZ
// ========================
function updateProgress() {
  if (progressBar) {
    progressBar.style.width = (currentQuestionIndex / questions.length * 100) + '%';
  }
}

function loadQuestion() {
  const q = questions[currentQuestionIndex];
  updateProgress();
  optionsPanel.innerHTML = '';

  showTyping(chatArea, waStatus);

  const cleanText = q.question.replace(/<[^>]*>/g, '');
  const delay = Math.min(Math.max(cleanText.length * 18, 900), 2200);

  setTimeout(() => {
    removeTyping(chatArea);
    if (waStatus) waStatus.textContent = 'online';
    addBubbleIn(chatArea, q.question.replace(/\n/g, '<br>'));
    renderOptions(q);
  }, delay);
}

function renderOptions(q) {
  optionsPanel.innerHTML = '';

  if (q.multiSelect) {
    q.options.forEach(opt => {
      const btn = document.createElement('button');
      btn.className = 'option-btn';
      btn.textContent = opt.text;
      btn.addEventListener('click', () => {
        btn.classList.toggle('selected');
        syncConfirmBtn(q);
      });
      optionsPanel.appendChild(btn);
    });
  } else {
    q.options.forEach(opt => {
      const btn = document.createElement('button');
      btn.className = 'option-btn';
      btn.textContent = opt.text;
      btn.addEventListener('click', () => handleAnswer(opt));
      optionsPanel.appendChild(btn);
    });
  }
}

function syncConfirmBtn(q) {
  const count = optionsPanel.querySelectorAll('.option-btn.selected').length;
  let cb = document.getElementById('multi-confirm-btn');
  if (count > 0 && !cb) {
    cb = document.createElement('button');
    cb.id = 'multi-confirm-btn';
    cb.className = 'confirm-btn';
    cb.textContent = 'Continuar ➔';
    cb.addEventListener('click', () => {
      const selected = [...optionsPanel.querySelectorAll('.option-btn.selected')].map(b => b.textContent);
      handleAnswer({ text: selected.join(', '), feedback: q.multiSelectFeedback || '' });
    });
    optionsPanel.appendChild(cb);
  } else if (count === 0 && cb) {
    cb.remove();
  }
}

function handleAnswer(selectedOption) {
  optionsPanel.innerHTML = '';

  // Bolha verde (resposta da utilizadora)
  addBubbleOut(chatArea, selectedOption.text || 'Continuar');

  if (selectedOption.feedback && selectedOption.feedback.trim() !== '') {
    showTyping(chatArea, waStatus);
    const delay = Math.min(Math.max(selectedOption.feedback.replace(/<[^>]*>/g,'').length * 20, 1200), 3200);

    setTimeout(() => {
      removeTyping(chatArea);
      if (waStatus) waStatus.textContent = 'online';
      addBubbleIn(chatArea, selectedOption.feedback);
      setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) loadQuestion();
        else finishQuiz();
      }, 900);
    }, delay);

  } else {
    setTimeout(() => {
      currentQuestionIndex++;
      if (currentQuestionIndex < questions.length) loadQuestion();
      else finishQuiz();
    }, 500);
  }
}

// ========================
// FINALIZAR → ECRÃ FINAL
// ========================
function finishQuiz() {
  if (progressBar) progressBar.style.width = '100%';

  // Esconder chat principal, mostrar ecrã final
  document.querySelector('.app-container').style.display = 'none';
  finalScreen.style.display = 'flex';

  setTimeout(runFinalChat, 400);
}

// ========================
// CHAT FINAL
// ========================
function runFinalChat() {
  let idx = 0;

  function sendNext() {
    if (idx >= finalMessages.length) {
      if (finalStatus) finalStatus.textContent = 'online';
      finalChatFooter.style.display = 'flex';
      scrollBottom(finalChatBody);
      return;
    }
    showTyping(finalChatBody, finalStatus);
    const msg   = finalMessages[idx];
    const isImg = msg.includes('<img');
    const delay = isImg
      ? 1400
      : Math.min(Math.max(msg.replace(/<[^>]*>/g, '').length * 20, 1200), 4000);
    setTimeout(() => {
      removeTyping(finalChatBody);
      if (finalStatus) finalStatus.textContent = 'online';
      addBubbleIn(finalChatBody, msg);
      idx++;
      setTimeout(sendNext, 700);
    }, delay);
  }

  sendNext();
}
