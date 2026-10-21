// =====================
// PERGUNTAS DO QUIZ
// =====================
const questions = [
    {
        question: "Responde com sinceridade… Qual é o teu principal objectivo?",
        options: [
            { text: "Atrair o homem certo",      feedback: "Entendi... E isso é totalmente possível quando sabes como a mente dele funciona." },
            { text: "Deixá-lo obcecado",          feedback: "Entendi... Quando activas os gatilhos certos, é exactamente isso que acontece." },
            { text: "Casar",                       feedback: "Entendi... E para ele dar esse passo, precisa sentir que tu és a única opção." },
            { text: "Reacender a paixão",          feedback: "Entendi... Reacender a paixão é mais simples do que parece quando activamos a dopamina." }
        ]
    },
    {
        question: "Como te sentes em relação à tua vida amorosa neste momento?",
        options: [
            { text: "Estou confortável com ela",              feedback: "Mas podemos sempre melhorar e criar uma ligação ainda mais profunda." },
            { text: "Gostaria de me sentir mais confiante",   feedback: "A confiança natural surge quando dominas a dinâmica da atracção a teu favor." },
            { text: "Não me sinto amada como gostaria",       feedback: "Entendo. E isso muda completamente quando activamos o instinto de perseguição dele." }
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
        question: "Quais destes desafios sentes na tua vida amorosa? (podes escolher mais de um)",
        multiSelect: true,
        options: [
            { text: "Valorizo mais ele do que a mim própria", feedback: "" },
            { text: "Sou rejeitada",                           feedback: "" },
            { text: "Não consigo atrair o homem certo",        feedback: "" },
            { text: "Não me sinto amada",                      feedback: "" },
            { text: "Sinto que a paixão acabou",               feedback: "" }
        ]
    },
    {
        question: "Qual foi a última vez que te sentiste realmente amada e valorizada numa relação?",
        options: [
            { text: "Recentemente",    feedback: "Entendi... E manter essa sensação é o segredo para uma relação duradoura." },
            { text: "Há muito tempo",  feedback: "Entendi... E essa sensação pesa. Porque não é só querer ter alguém — é querer sentir que existe alguém do outro lado." },
            { text: "Nunca",           feedback: "Entendi... E essa sensação pesa. Porque não é só querer ter alguém. É querer sentir que existe alguém do outro lado que também te escolhe, valoriza e deseja." }
        ]
    },
    {
        question: "Pensando no homem ideal para ti...\n\nQual destas qualidades é a mais importante?",
        options: [
            { text: "Gentil",                  feedback: "Uma óptima escolha. Mas para que ele o demonstre de forma consistente, o instinto de provedor dele precisa de ser activado." },
            { text: "Fiel",                    feedback: "A fidelidade é garantida quando ele não consegue pensar em mais nenhuma outra mulher além de ti." },
            { text: "Carinhoso",               feedback: "Os homens tornam-se naturalmente carinhosos quando os gatilhos emocionais certos são accionados." },
            { text: "Que me apoie",            feedback: "O apoio incondicional surge quando ele te vê como a prioridade número 1 da vida dele." },
            { text: "Voltado para a família",  feedback: "Um homem focado na família fará tudo para te proteger e estar ao teu lado." }
        ]
    },
    {
        question: "Gostavas de ter mais influência sobre os homens?",
        options: [
            { text: "Claro que sim",    feedback: "Faz ele escolher-te todos os dias! Quando activas os gatilhos de dopamina nele, ele começa a pensar em ti o tempo todo." },
            { text: "Não tenho a certeza", feedback: "Ter influência não é manipular — é saber exactamente como o cérebro dele funciona para que ele te escolha todos os dias." },
            { text: "Não",              feedback: "Mesmo que não queiras influência, perceber como a mente dele funciona evita que te magoem no futuro." }
        ]
    },
    {
        question: "Quais destas estratégias gostavas mais de aprender?\n\n(podes escolher mais de uma)",
        multiSelect: true,
        options: [
            { text: "Como fazer ele sentir a minha falta",             feedback: "" },
            { text: "Como fazer ele apegar-se a mim",                  feedback: "" },
            { text: "Como fazer ele ser mais proactivo comigo",        feedback: "" },
            { text: "Como perceber melhor o que ele está a pensar",    feedback: "" }
        ]
    }
];

// =====================
// MENSAGENS FINAIS
// =====================
const finalMessages = [
    "Muitas das mulheres que estavam numa situação semelhante à tua... seguiram o Plano Mulher Magnética e deixaram o homem obcecado por elas — em menos de 14 dias!",
    "<img src='depoimento1.jpg' style='width:100%;max-width:260px;border-radius:8px;display:block;'>",
    "<img src='depoimento2.jpg' style='width:100%;max-width:260px;border-radius:8px;display:block;'>",
    "<img src='depoimento3.jpg' style='width:100%;max-width:260px;border-radius:8px;display:block;'>",
    "Como viste...<br><br>Mulheres que aplicam o Plano Mulher Magnética aprendem a usar o gatilho de dopamina da forma certa... e com isso deixam qualquer homem louco por elas — sem precisar de implorar atenção.",
    "Muitas relatam que, quando aplicam o plano...",
    "Eles próprios voltam a procurá-las, demonstrando mais interesse, saudade e vontade de se aproximar."
];

// =====================
// ESTADO
// =====================
let currentQuestionIndex = 0;
let chatHistory = []; // guarda bolhas já criadas

// =====================
// ELEMENTOS DOM
// =====================
const homeScreen      = document.getElementById('home-screen');
const quizScreen      = document.getElementById('quiz-screen');
const processingScreen= document.getElementById('processing-screen');
const finalChatScreen = document.getElementById('final-chat-screen');

const startBtn        = document.getElementById('start-btn');
const waBody          = document.getElementById('wa-body');
const waOptionsArea   = document.getElementById('wa-options-area');
const waStatus        = document.getElementById('wa-status');
const progressBar     = document.getElementById('progress-bar');
const finalChatBody   = document.getElementById('final-chat-body');
const finalChatFooter = document.getElementById('final-chat-footer');
const finalChatStatus = document.getElementById('final-chat-status');

// =====================
// UTILITÁRIOS
// =====================
function switchScreen(hide, show) {
    hide.classList.remove('active');
    setTimeout(() => {
        show.classList.add('active');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 350);
}

function getTime() {
    const now = new Date();
    return `${now.getHours().toString().padStart(2,'0')}:${now.getMinutes().toString().padStart(2,'0')}`;
}

function addTypingBubble(container) {
    const div = document.createElement('div');
    div.className = 'bubble-typing';
    div.id = 'typing-indicator';
    div.innerHTML = `<div class="typing-dots"><span></span><span></span><span></span></div>`;
    container.appendChild(div);
    container.scrollTop = container.scrollHeight;
    return div;
}

function removeTypingBubble() {
    const tb = document.getElementById('typing-indicator');
    if (tb) tb.remove();
}

function addBubble(container, html, delay = 0) {
    return new Promise(resolve => {
        setTimeout(() => {
            removeTypingBubble();
            const div = document.createElement('div');
            div.className = 'bubble-in';
            const isImg = html.includes('<img');
            div.innerHTML = isImg
                ? html
                : `${html}<div class="bubble-time">${getTime()}</div>`;
            container.appendChild(div);
            container.scrollTop = container.scrollHeight;
            resolve();
        }, delay);
    });
}

// =====================
// QUIZ LOGIC
// =====================
startBtn.addEventListener('click', () => {
    switchScreen(homeScreen, quizScreen);
    setTimeout(() => {
        addDateDivider();
        loadQuestion();
    }, 400);
});

function addDateDivider() {
    const div = document.createElement('div');
    div.className = 'wa-date-divider';
    div.textContent = 'Hoje';
    waBody.appendChild(div);
}

function updateProgress() {
    const pct = (currentQuestionIndex / questions.length) * 100;
    progressBar.style.width = pct + '%';
}

function loadQuestion() {
    const q = questions[currentQuestionIndex];
    updateProgress();

    // Mostrar "a digitar..."
    waStatus.textContent = 'A digitar...';
    const typing = addTypingBubble(waBody);

    const textLen = q.question.length;
    const delay = Math.min(Math.max(textLen * 20, 1200), 2800);

    setTimeout(() => {
        removeTypingBubble();
        waStatus.textContent = 'Online';

        const bubble = document.createElement('div');
        bubble.className = 'bubble-in';
        bubble.innerHTML = q.question.replace(/\n/g, '<br>') + `<div class="bubble-time">${getTime()}</div>`;
        waBody.appendChild(bubble);
        waBody.scrollTop = waBody.scrollHeight;

        // Mostrar opções
        renderOptions(q);
    }, delay);
}

function renderOptions(q) {
    waOptionsArea.innerHTML = '';

    if (q.multiSelect) {
        q.options.forEach(opt => {
            const btn = document.createElement('button');
            btn.className = 'option-btn';
            btn.textContent = opt.text;
            btn.addEventListener('click', () => {
                btn.classList.toggle('selected');
                updateConfirmBtn();
            });
            waOptionsArea.appendChild(btn);
        });
    } else {
        q.options.forEach(opt => {
            const btn = document.createElement('button');
            btn.className = 'option-btn';
            btn.textContent = opt.text;
            btn.addEventListener('click', () => handleAnswer(opt));
            waOptionsArea.appendChild(btn);
        });
    }
}

function updateConfirmBtn() {
    const selected = waOptionsArea.querySelectorAll('.option-btn.selected').length;
    let confirmBtn = document.getElementById('multi-confirm-btn');

    if (selected > 0 && !confirmBtn) {
        confirmBtn = document.createElement('button');
        confirmBtn.id = 'multi-confirm-btn';
        confirmBtn.className = 'confirm-btn';
        confirmBtn.textContent = 'Continuar ➔';
        confirmBtn.addEventListener('click', () => handleAnswer({ feedback: '' }));
        waOptionsArea.appendChild(confirmBtn);
    } else if (selected === 0 && confirmBtn) {
        confirmBtn.remove();
    }
}

function handleAnswer(selectedOption) {
    // Mostrar resposta da utilizadora como bolha saída (direita) — simulado com text
    waOptionsArea.innerHTML = '';

    if (selectedOption.feedback && selectedOption.feedback.trim() !== '') {
        // Bolha de feedback da doutora
        waStatus.textContent = 'A digitar...';
        addTypingBubble(waBody);
        waBody.scrollTop = waBody.scrollHeight;

        setTimeout(() => {
            removeTypingBubble();
            waStatus.textContent = 'Online';

            const bubble = document.createElement('div');
            bubble.className = 'bubble-in';
            bubble.innerHTML = selectedOption.feedback + `<div class="bubble-time">${getTime()}</div>`;
            waBody.appendChild(bubble);
            waBody.scrollTop = waBody.scrollHeight;

            // Avançar para próxima pergunta após breve pausa
            setTimeout(() => {
                currentQuestionIndex++;
                if (currentQuestionIndex < questions.length) {
                    loadQuestion();
                } else {
                    finishQuiz();
                }
            }, 1200);
        }, 2200);

    } else {
        // Sem feedback (multiSelect) — avançar directo
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            loadQuestion();
        } else {
            finishQuiz();
        }
    }
}

// =====================
// FINISH / PROCESSING
// =====================
function finishQuiz() {
    progressBar.style.width = '100%';
    switchScreen(quizScreen, processingScreen);
    setTimeout(runProcessingLogic, 400);
}

function runProcessingLogic() {
    const steps = document.querySelectorAll('.step');
    let stepIndex = 0;

    const interval = setInterval(() => {
        if (stepIndex > 0) steps[stepIndex - 1].classList.remove('active');

        if (stepIndex < steps.length) {
            steps[stepIndex].classList.add('active');
            stepIndex++;
        } else {
            clearInterval(interval);
            setTimeout(() => {
                switchScreen(processingScreen, finalChatScreen);
                setTimeout(runFinalChat, 400);
            }, 1000);
        }
    }, 1800);
}

// =====================
// FINAL CHAT
// =====================
function runFinalChat() {
    let msgIndex = 0;

    function sendNext() {
        if (msgIndex >= finalMessages.length) {
            finalChatStatus.textContent = 'Online';
            finalChatFooter.style.display = 'flex';
            finalChatFooter.style.flexDirection = 'column';
            finalChatFooter.style.gap = '10px';
            finalChatBody.scrollTop = finalChatBody.scrollHeight;
            return;
        }

        finalChatStatus.textContent = 'A digitar...';
        addTypingBubble(finalChatBody);
        finalChatBody.scrollTop = finalChatBody.scrollHeight;

        const msg = finalMessages[msgIndex];
        const isImg = msg.includes('<img');
        const delay = isImg ? 1800 : Math.min(Math.max(msg.replace(/<[^>]*>/g,'').length * 25, 1500), 4000);

        setTimeout(() => {
            removeTypingBubble();
            finalChatStatus.textContent = 'Online';

            const bubble = document.createElement('div');
            bubble.className = 'bubble-in';
            if (isImg) {
                bubble.style.background = 'transparent';
                bubble.style.boxShadow = 'none';
                bubble.style.padding = '0';
                bubble.innerHTML = msg;
            } else {
                bubble.innerHTML = msg + `<div class="bubble-time">${getTime()}</div>`;
            }
            finalChatBody.appendChild(bubble);
            finalChatBody.scrollTop = finalChatBody.scrollHeight;

            msgIndex++;
            setTimeout(sendNext, 900);
        }, delay);
    }

    sendNext();
}
