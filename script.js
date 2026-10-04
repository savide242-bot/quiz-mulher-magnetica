// Lógica do Quiz
const questions = [
    {
        question: "Me responde com sinceridade… Qual é o seu principal objetivo?",
        options: [
            { text: "Atrair o homem certo", feedback: "Entendi... E isso é totalmente possível quando você sabe como a mente dele funciona." },
            { text: "Deixá-lo obcecado", feedback: "Entendi... Quando você ativa os gatilhos certos, é exatamente isso que acontece." },
            { text: "Casar-se", feedback: "Entendi... E para ele dar esse passo, ele precisa sentir que você é a única opção." },
            { text: "Reacender a paixão", feedback: "Entendi... E reacender a paixão é mais simples do que parece quando ativamos a dopamina." }
        ]
    },
    {
        question: "Como você se sente sobre sua vida amorosa no momento?",
        options: [
            { text: "Estou confortável com ela", feedback: "Mas sempre podemos melhorar e criar uma conexão ainda mais profunda." },
            { text: "Gostaria de me sentir mais confiante", feedback: "A confiança natural surge quando você domina a dinâmica da atração a seu favor." },
            { text: "Não me sinto amada da maneira que gostaria", feedback: "Entendo. E isso muda completamente quando ativamos o instinto de perseguição dele." }
        ]
    },
    {
        question: "Pensando nas suas experiências amorosas... Com que frequência você sente que oferece mais do que recebe?",
        options: [
            { text: "Muito frequentemente", feedback: "Isso é exaustivo. Mas você pode inverter esse jogo e fazer ele investir mais na relação." },
            { text: "Às vezes", feedback: "Entendo. O ideal é que ele esteja sempre focado em te agradar e te conquistar." },
            { text: "Quase nunca", feedback: "Ótimo. E com as técnicas certas, você manterá essa dinâmica a seu favor para sempre." }
        ]
    },
    {
        question: "Quais desses desafios você sente na sua vida amorosa? (pode escolher mais de um)",
        multiSelect: true,
        options: [
            { text: "Valorizo mais ele do que eu mesma", feedback: "" },
            { text: "Sou rejeitada", feedback: "" },
            { text: "Não consigo atrair o homem certo", feedback: "" },
            { text: "Não me sinto amada", feedback: "" },
            { text: "Sinto que a paixão acabou", feedback: "" }
        ]
    },
    {
        question: "Qual foi a última vez que você se sentiu realmente amada e valorizada em um relacionamento?",
        options: [
            { text: "Recentemente", feedback: "Entendi... E manter essa sensação é o segredo para um relacionamento duradouro." },
            { text: "Há muito tempo", feedback: "Entendi... E essa sensação pesa. Porque não é só querer ter alguém. É querer sentir que existe alguém do outro lado." },
            { text: "Nunca", feedback: "Entendi... E essa sensação pesa. Porque não é só querer ter alguém. É querer sentir que existe alguém do outro lado que também escolhe, valoriza e deseja você." }
        ]
    },
    {
        question: "Pensando no homem ideal para você...<br><br>Qual dessas qualidades é a mais importante?",
        options: [
            { text: "Gentil", feedback: "Uma ótima escolha. Mas para que ele demonstre isso consistentemente, o instinto de provedor dele precisa ser ativado." },
            { text: "Fiel", feedback: "A fidelidade é garantida quando ele não consegue pensar em mais nenhuma outra mulher além de você." },
            { text: "Carinhoso", feedback: "Homens se tornam naturalmente carinhosos quando os gatilhos emocionais certos são acionados." },
            { text: "Que me apoie", feedback: "O apoio incondicional vem quando ele te enxerga como a prioridade número 1 da vida dele." },
            { text: "Voltado para a família", feedback: "Um homem focado na família fará tudo para te proteger e estar ao seu lado." }
        ]
    },
    {
        question: "Você gostaria de ter mais controle sobre os homens?",
        options: [
            { text: "Claro que sim", feedback: "Faça ele te escolher todos os dias! Quando você ativa os gatilhos de dopamina nele, ele começa a pensar em você o tempo todo." },
            { text: "Não tenho certeza", feedback: "Ter controle não é manipular, é saber exatamente como o cérebro dele funciona para que ele escolha você todos os dias." },
            { text: "Não", feedback: "Mesmo que não queira controle, entender como a mente dele funciona evita que você se machuque no futuro." }
        ]
    },
    {
        question: "Quais dessas estratégias você mais gostaria de aprender?<br><br>(pode escolher mais de uma)",
        multiSelect: true,
        options: [
            { text: "Como fazer ele sentir saudades de mim", feedback: "" },
            { text: "Como fazer ele se apegar a mim", feedback: "" },
            { text: "Como fazer ele ser mais proativo comigo", feedback: "" },
            { text: "Como entender melhor o que ele está pensando", feedback: "" }
        ]
    }
];

let currentQuestionIndex = 0;

// Elementos DOM
const elements = {
    home: document.getElementById('home-screen'),
    quiz: document.getElementById('quiz-screen'),
    feedback: document.getElementById('feedback-screen'),
    processing: document.getElementById('processing-screen'),
    plans: document.getElementById('plans-screen'),
    startBtn: document.getElementById('start-btn'),
    questionText: document.getElementById('question-text'),
    optionsContainer: document.getElementById('options-container'),
    progressBar: document.getElementById('progress-bar'),
    questionCounter: document.getElementById('question-counter'),
    feedbackText: document.getElementById('feedback-text'),
    continueBtn: document.getElementById('continue-btn'),
    chatStatus: document.getElementById('chat-status'),
    vslScreen: document.getElementById('vsl-screen'),
    vslContinueBtn: document.getElementById('vsl-continue-btn'),
    finalChatScreen: document.getElementById('final-chat-screen'),
    finalChatBody: document.getElementById('final-chat-body'),
    finalChatFooter: document.getElementById('final-chat-footer'),
    finalChatStatus: document.getElementById('final-chat-status'),
    showPlansBtn: document.getElementById('show-plans-btn')
};

// Listeners
if (elements.startBtn) {
    elements.startBtn.addEventListener('click', () => {
        switchScreen(elements.home, elements.vslScreen);
        
        // Injeta o vídeo APÓS a transição de tela, pois o VTurb precisa que a div esteja visível para calcular o tamanho
        setTimeout(() => {
            const vturbContainer = document.getElementById('vturb-container');
            if (vturbContainer && vturbContainer.innerHTML.trim() === '') {
                vturbContainer.innerHTML = `<vturb-smartplayer id="vid-6ac292261507090c7e943773" style="display: block; margin: 0 auto; width: 100%; max-width: 400px;"><div class="vturb-player-placeholder" style="position: relative; width: 100%; padding: 133.33333333333331% 0 0; z-index: 0; background-color: black;"></div></vturb-smartplayer>`;
                const s = document.createElement("script"); 
                s.src = "https://scripts.converteai.net/a19f7970-0b17-43af-b7c5-eca98859e657/players/6ac292261507090c7e943773/v4/player.js";
                s.async = true;
                document.head.appendChild(s);
            }
        }, 500);
    });
}

if (elements.vslContinueBtn) {
    elements.vslContinueBtn.addEventListener('click', () => {
        switchScreen(elements.vslScreen, elements.quiz);
        currentQuestionIndex = 0;
        loadQuestion();
        
        // Remove o vídeo para parar o áudio e a reprodução em segundo plano
        const vturbContainer = document.getElementById('vturb-container');
        if(vturbContainer) {
            vturbContainer.innerHTML = ''; 
        }
    });
}

elements.continueBtn.addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        switchScreen(elements.feedback, elements.quiz);
        loadQuestion();
    } else {
        finishQuiz();
    }
});

// Funções base
function switchScreen(hideElement, showElement) {
    hideElement.classList.remove('active');
    setTimeout(() => {
        showElement.classList.add('active');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 400); 
}

function loadQuestion() {
    const currentQ = questions[currentQuestionIndex];
    
    elements.questionText.style.opacity = 0;
    setTimeout(() => {
        elements.questionText.innerHTML = currentQ.question;
        elements.questionText.style.opacity = 1;
        elements.questionText.style.transition = 'opacity 0.5s ease';
    }, 200);

    elements.optionsContainer.innerHTML = '';
    
    const progress = ((currentQuestionIndex) / questions.length) * 100;
    elements.progressBar.style.width = `${progress}%`;
    elements.questionCounter.textContent = `${currentQuestionIndex + 1} / ${questions.length}`;

    if (currentQ.multiSelect) {
        currentQ.options.forEach((option, index) => {
            const btn = document.createElement('button');
            btn.className = 'option-btn';
            btn.innerHTML = option.text;
            btn.style.opacity = '0';
            btn.style.transform = 'translateY(10px)';
            btn.style.transition = 'all 0.4s ease';
            
            btn.addEventListener('click', () => {
                btn.classList.toggle('selected');
                const selectedCount = elements.optionsContainer.querySelectorAll('.option-btn.selected').length;
                let cBtn = document.getElementById('multi-confirm-btn');
                if (selectedCount > 0) {
                    if (!cBtn) {
                        cBtn = document.createElement('button');
                        cBtn.id = 'multi-confirm-btn';
                        cBtn.className = 'cta-button pulse-anim';
                        cBtn.style.marginTop = '20px';
                        cBtn.style.width = '100%';
                        cBtn.innerHTML = 'Continuar ➔';
                        cBtn.addEventListener('click', () => handleAnswer({ feedback: "" }));
                        elements.optionsContainer.appendChild(cBtn);
                    }
                } else if (cBtn) {
                    cBtn.remove();
                }
            });
            elements.optionsContainer.appendChild(btn);

            setTimeout(() => {
                btn.style.opacity = '1';
                btn.style.transform = 'translateY(0)';
            }, 100 + (index * 100));
        });
    } else {
        currentQ.options.forEach((option, index) => {
            const btn = document.createElement('button');
            btn.className = 'option-btn';
            btn.innerHTML = option.text;
            btn.style.opacity = '0';
            btn.style.transform = 'translateY(10px)';
            btn.style.transition = 'all 0.4s ease';
            
            btn.addEventListener('click', () => handleAnswer(option));
            elements.optionsContainer.appendChild(btn);

            setTimeout(() => {
                btn.style.opacity = '1';
                btn.style.transform = 'translateY(0)';
            }, 100 + (index * 100));
        });
    }
}

function handleAnswer(selectedOption) {
    if (selectedOption.feedback && selectedOption.feedback.trim() !== "") {
        elements.chatStatus.textContent = 'Digitando...';
        elements.chatStatus.style.color = '#D81B60'; 
        
        elements.feedbackText.innerHTML = '<span style="color:var(--text-muted);font-style:italic;">...</span>';
        switchScreen(elements.quiz, elements.feedback);
        
        setTimeout(() => {
            elements.chatStatus.textContent = 'Online';
            elements.chatStatus.style.color = 'var(--primary-color)';
            elements.feedbackText.innerHTML = selectedOption.feedback;
        }, 3000); 
        
    } else {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            loadQuestion();
        } else {
            finishQuiz();
        }
    }
}

function finishQuiz() {
    elements.progressBar.style.width = '100%';
    elements.quiz.classList.remove('active');
    elements.feedback.classList.remove('active');
    
    setTimeout(() => {
        elements.processing.classList.add('active');
        runProcessingLogic();
    }, 400);
}

function runProcessingLogic() {
    const steps = document.querySelectorAll('.step');
    let stepIndex = 0;

    const interval = setInterval(() => {
        if (stepIndex > 0) {
            steps[stepIndex - 1].classList.remove('active');
        }
        
        if (stepIndex < steps.length) {
            steps[stepIndex].classList.add('active');
            stepIndex++;
        } else {
            clearInterval(interval);
            setTimeout(() => {
                switchScreen(elements.processing, elements.finalChatScreen);
                runFinalChat();
            }, 1000);
        }
    }, 1800); 
}

const finalMessages = [
    "Muitas das mulheres que estavam em uma situação parecida com a sua... seguiram o Plano Mulher Magnética e deixaram o homem obcecado por elas - em menos de 14 dias!",
    "<img src='depoimento1.jpg' style='width:100%; max-width:300px; border-radius: 8px;'> ",
    "<img src='depoimento2.jpg' style='width:100%; max-width:300px; border-radius: 8px;'> ",
    "<img src='depoimento3.jpg' style='width:100%; max-width:300px; border-radius: 8px;'> ",
    "Como você viu...<br><br>Mulheres que aplicam o Plano Mulher Magnética aprendem usar o gatilho de dopamina da forma certa... E com isso deixam qualquer homem louco por elas - sem precisar implorar por atenção.",
    "Muitas relatam que, quando aplicam o plano...",
    "Eles mesmos passam a procurar novamente, demonstrando mais interesse, saudade e vontade de se aproximar."
];

function runFinalChat() {
    let msgIndex = 0;
    
    function sendNextMessage() {
        if (msgIndex >= finalMessages.length) {
            elements.finalChatStatus.textContent = 'Online';
            elements.finalChatStatus.style.color = 'var(--primary-color)';
            elements.finalChatFooter.style.display = 'block';
            window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
            return;
        }

        elements.finalChatStatus.textContent = 'Digitando...';
        elements.finalChatStatus.style.color = '#D81B60';

        const typingBubble = document.createElement('div');
        typingBubble.className = 'chat-bubble';
        typingBubble.id = 'temp-typing-bubble';
        typingBubble.innerHTML = '<p class="feedback-text"><span style="color:var(--text-muted);font-style:italic;">...</span></p>';
        elements.finalChatBody.appendChild(typingBubble);
        elements.finalChatBody.scrollTop = elements.finalChatBody.scrollHeight;

        const isImage = finalMessages[msgIndex].includes('<img');
        const textLength = finalMessages[msgIndex].length;
        const delay = isImage ? 2000 : Math.min(Math.max(textLength * 30, 1500), 4000);

        setTimeout(() => {
            const tb = document.getElementById('temp-typing-bubble');
            if (tb) tb.remove();

            const realBubble = document.createElement('div');
            realBubble.className = 'chat-bubble';
            realBubble.style.opacity = 0;
            realBubble.style.transform = 'translateY(10px)';
            realBubble.style.transition = 'all 0.3s ease';
            if (isImage) {
                realBubble.style.background = 'transparent';
                realBubble.style.boxShadow = 'none';
                realBubble.style.padding = '0';
            }
            realBubble.innerHTML = `<p class="feedback-text">${finalMessages[msgIndex]}</p>`;
            elements.finalChatBody.appendChild(realBubble);
            
            setTimeout(() => {
                realBubble.style.opacity = 1;
                realBubble.style.transform = 'translateY(0)';
            }, 50);

            elements.finalChatStatus.textContent = 'Online';
            elements.finalChatStatus.style.color = 'var(--primary-color)';
            
            elements.finalChatBody.scrollTop = elements.finalChatBody.scrollHeight;

            msgIndex++;
            setTimeout(sendNextMessage, 1000); 
        }, delay);
    }

    sendNextMessage();
}

if (elements.showPlansBtn) {
    elements.showPlansBtn.addEventListener('click', () => {
        switchScreen(elements.finalChatScreen, elements.plans);
    });
}
