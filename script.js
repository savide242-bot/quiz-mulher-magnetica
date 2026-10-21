// ========================
// PERGUNTAS
// ========================
const questions = [
  {
    question: "Responde com sinceridade… Qual é o teu principal objectivo?",
    options: [
      { text: "Atrair o homem certo",   feedback: "Entendi... E isso é totalmente possível quando sabes como a mente dele funciona." },
      { text: "Deixá-lo obcecado",      feedback: "Entendi... Quando activas os gatilhos certos, é exactamente isso que acontece." },
      { text: "Casar",                  feedback: "Entendi... E para ele dar esse passo, precisa sentir que tu és a única opção." },
      { text: "Reacender a paixão",     feedback: "Entendi... Reacender a paixão é mais simples do que parece quando activamos a dopamina." }
    ]
  },
  {
    question: "Como te sentes em relação à tua vida amorosa neste momento?",
    options: [
      { text: "Estou confortável com ela",             feedback: "Mas podemos sempre melhorar e criar uma ligação ainda mais profunda." },
      { text: "Gostaria de me sentir mais confiante",  feedback: "A confiança natural surge quando dominas a dinâmica da atracção a teu favor." },
      { text: "Não me sinto amada como gostaria",      feedback: "Entendo. E isso muda completamente quando activamos o instinto de perseguição dele." }
    ]
  },
  {
    question: "Pensando nas tuas experiências amorosas... Com que frequência sentes que dás mais do que recebes?",
    options: [
      { text: "Muito frequentemente", feedback: "Isso é exaustivo. Mas podes inverter esse jogo e fazê-lo investir mais na relação." },
      { text: "Às vezes",             feedback: "Entendo. O ideal é que ele esteja sempre focado em agradar-te e conquistar-te." },
      { text: "Quase nunca",          feedback: "Óptimo. E com as técnicas certas, manterás essa dinâmica a teu favor para sempre." }
    ]
  },
  {
    question: "Quais destes desafios sentes na tua vida amorosa?\n(podes escolher mais de um)",
    multiSelect: true,
    options: [
      { text: "Valorizo mais ele do que a mim própria", feedback: "" },
      { text: "Sou rejeitada",                          feedback: "" },
      { text: "Não consigo atrair o homem certo",       feedback: "" },
      { text: "Não me sinto amada",                     feedback: "" },
      { text: "Sinto que a paixão acabou",              feedback: "" }
    ]
  },
  {
    question: "Qual foi a última vez que te sentiste realmente amada e valorizada numa relação?",
    options: [
      { text: "Recentemente",   feedback: "Entendi... E manter essa sensação é o segredo para uma relação duradoura." },
      { text: "Há muito tempo", feedback: "Entendi... E essa sensação pesa. Porque não é só querer ter alguém — é querer sentir que existe alguém do outro lado." },
      { text: "Nunca",          feedback: "Entendi... E essa sensação pesa. Porque não é só querer ter alguém. É querer sentir que existe alguém do outro lado que também te escolhe, valoriza e deseja." }
    ]
  },
  {
    question: "Pensando no homem ideal para ti...\n\nQual destas qualidades é a mais importante?",
    options: [
      { text: "Gentil",                 feedback: "Uma óptima escolha. Mas para que ele o demonstre de forma consistente, o instinto de provedor dele precisa de ser activado." },
      { text: "Fiel",                   feedback: "A fidelidade é garantida quando ele não consegue pensar em mais nenhuma outra mulher além de ti." },
      { text: "Carinhoso",              feedback: "Os homens tornam-se naturalmente carinhosos quando os gatilhos emocionais certos são accionados." },
      { text: "Que me apoie",           feedback: "O apoio incondicional surge quando ele te vê como a prioridade número 1 da vida dele." },
      { text: "Voltado para a família", feedback: "Um homem focado na família fará tudo para te proteger e estar ao teu lado." }
    ]
  },
  {
    question: "Gostavas de ter mais influência sobre os homens?",
    options: [
      { text: "Claro que sim",         feedback: "Faz ele escolher-te todos os dias! Quando activas os gatilhos de dopamina nele, ele começa a pensar em ti o tempo todo." },
      { text: "Não tenho a certeza",   feedback: "Ter influência não é manipular — é saber exactamente como o cérebro dele funciona para que ele te escolha todos os dias." },
      { text: "Não",                   feedback: "Mesmo que não queiras influência, perceber como a mente dele funciona evita que te magoem no futuro." }
    ]
  },
  {
    question: "Quais destas estratégias gostavas mais de aprender?\n(podes escolher mais de uma)",
    multiSelect: true,
    options: [
      { text: "Como fazer ele sentir a minha falta",          feedback: "" },
      { text: "Como fazer ele apegar-se a mim",               feedback: "" },
      { text: "Como fazer ele ser mais proactivo comigo",     feedback: "" },
      { text: "Como perceber melhor o que ele está a pensar", feedback: "" }
    ]
  }
];

// ========================
// MENSAGENS FINAIS
// ========================
const finalMessages = [
  "Muitas das mulheres que estavam numa situação semelhante à tua... seguiram o Plano Mulher Magnética e deixaram o homem obcecado por elas — em menos de 14 dias!",
  "<img src='depoimento1.jpg' style='width:100%;max-width:250px;border-radius:8px;display:block;'>",
  "<img src='depoimento2.jpg' style='width:100%;max-width:250px;border-radius:8px;display:block;'>",
  "<img src='depoimento3.jpg' style='width:100%;max-width:250px;border-radius:8px;display:block;'>",
  "Como viste...<br><br>Mulheres que aplicam o Plano Mulher Magnética aprendem a usar o gatilho de dopamina da forma certa... e com isso deixam qualquer homem louco por elas — sem precisar de implorar atenção.",
  "Muitas relatam que, quando aplicam o plano...",
  "Eles próprios voltam a procurá-las, demonstrando mais interesse, saudade e vontade de se aproximar."
];

// ========================
// ESTADO
// ========================
let currentQuestionIndex = 0;

// ========================
// ELEMENTOS DOM
// ========================
const homeScreen       = document.getElementById('home-screen');
const quizScreen       = document.getElementById('quiz-screen');
const processingScreen = document.getElementById('processing-screen');
const finalChatScreen  = document.getElementById('final-chat-screen');

const startBtn         = document.getElementById('start-btn');
const chatArea         = document.getElementById('chat-scroll-area');
const optionsPanel     = document.getElementById('options-panel');
const waStatus         = document.getElementById('wa-status');
const progressBar      = document.getElementById('progress-bar');
const finalChatBody    = document.getElementById('final-chat-body');
const finalChatFooter  = document.getElementById('final-chat-footer');
const finalStatus      = document.getElementById('final-status');

// ========================
// UTILS
// ========================
function switchScreen(hide, show) {
  hide.classList.remove('active');
  setTimeout(() => {
    show.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, 300);
}

function getTime() {
  const n = new Date();
  return `${String(n.getHours()).padStart(2,'0')}:${String(n.getMinutes()).padStart(2,'0')}`;
}

function scrollBottom(el) {
  el.scrollTop = el.scrollHeight;
}

// Cria uma bolha RECEBIDA (doutor)
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
    div.innerHTML = html + `<div class="bubble-time">${getTime()}</div>`;
  }
  container.appendChild(div);
  scrollBottom(container);
}

// Cria uma bolha ENVIADA (utilizadora)
function addBubbleOut(container, text) {
  const div = document.createElement('div');
  div.className = 'bubble-out';
  div.innerHTML = text + `<div class="bubble-time">${getTime()}</div>`;
  container.appendChild(div);
  scrollBottom(container);
}

// Mostra indicador "a digitar..."
function showTyping(container) {
  removeTyping(container);
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
// QUIZ
// ========================
startBtn.addEventListener('click', () => {
  switchScreen(homeScreen, quizScreen);
  setTimeout(loadQuestion, 350);
});

function updateProgress() {
  progressBar.style.width = (currentQuestionIndex / questions.length * 100) + '%';
}

function loadQuestion() {
  const q = questions[currentQuestionIndex];
  updateProgress();
  optionsPanel.innerHTML = '';

  // Doutor "a digitar..."
  waStatus.textContent = 'a digitar...';
  showTyping(chatArea);

  const delay = Math.min(Math.max(q.question.length * 18, 1000), 2500);

  setTimeout(() => {
    removeTyping(chatArea);
    waStatus.textContent = 'online';
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
        syncConfirmBtn();
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

function syncConfirmBtn() {
  const count = optionsPanel.querySelectorAll('.option-btn.selected').length;
  let cb = document.getElementById('multi-confirm-btn');
  if (count > 0 && !cb) {
    cb = document.createElement('button');
    cb.id = 'multi-confirm-btn';
    cb.className = 'confirm-btn';
    cb.textContent = 'Continuar ➔';
    cb.addEventListener('click', () => handleAnswer({ feedback: '' }));
    optionsPanel.appendChild(cb);
  } else if (count === 0 && cb) {
    cb.remove();
  }
}

function handleAnswer(selectedOption) {
  // Desactiva os botões e limpa o painel
  optionsPanel.innerHTML = '';

  // 1. Mostra a bolha da resposta da utilizadora (verde, direita)
  addBubbleOut(chatArea, selectedOption.text || '✔ Seleccionado');

  if (selectedOption.feedback && selectedOption.feedback.trim() !== '') {
    // 2. Doutor "a digitar..."
    waStatus.textContent = 'a digitar...';
    showTyping(chatArea);

    const delay = Math.min(Math.max(selectedOption.feedback.length * 22, 1200), 3000);

    setTimeout(() => {
      removeTyping(chatArea);
      waStatus.textContent = 'online';
      addBubbleIn(chatArea, selectedOption.feedback);

      // 3. Avança para próxima pergunta
      setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
          loadQuestion();
        } else {
          finishQuiz();
        }
      }, 900);
    }, delay);

  } else {
    // Sem feedback (multiSelect ou vazio) — avança directo
    setTimeout(() => {
      currentQuestionIndex++;
      if (currentQuestionIndex < questions.length) {
        loadQuestion();
      } else {
        finishQuiz();
      }
    }, 600);
  }
}

// ========================
// FINISH / PROCESSING
// ========================
function finishQuiz() {
  progressBar.style.width = '100%';
  switchScreen(quizScreen, processingScreen);
  setTimeout(runProcessing, 350);
}

function runProcessing() {
  const steps = document.querySelectorAll('.proc-step');
  let i = 0;

  const iv = setInterval(() => {
    if (i > 0) steps[i - 1].classList.remove('active');
    if (i < steps.length) {
      steps[i].classList.add('active');
      i++;
    } else {
      clearInterval(iv);
      setTimeout(() => {
        switchScreen(processingScreen, finalChatScreen);
        setTimeout(runFinalChat, 350);
      }, 1000);
    }
  }, 1600);
}

// ========================
// CHAT FINAL
// ========================
function runFinalChat() {
  let idx = 0;

  function sendNext() {
    if (idx >= finalMessages.length) {
      finalStatus.textContent = 'online';
      finalChatFooter.style.display = 'flex';
      finalChatFooter.style.flexDirection = 'column';
      finalChatFooter.style.gap = '10px';
      scrollBottom(finalChatBody);
      return;
    }

    finalStatus.textContent = 'a digitar...';
    showTyping(finalChatBody);

    const msg   = finalMessages[idx];
    const isImg = msg.includes('<img');
    const delay = isImg ? 1600 : Math.min(Math.max(msg.replace(/<[^>]*>/g, '').length * 22, 1400), 4000);

    setTimeout(() => {
      removeTyping(finalChatBody);
      finalStatus.textContent = 'online';
      addBubbleIn(finalChatBody, msg);
      idx++;
      setTimeout(sendNext, 800);
    }, delay);
  }

  sendNext();
}
