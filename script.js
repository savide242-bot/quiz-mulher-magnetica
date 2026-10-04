// Lógica do Quiz com Feedback Dinâmico e Profundo para CADA opção
const questions = [
    {
        question: "Para começar, me diga: Qual a sua idade?",
        options: [
            { text: "18-29 anos", feedback: "Ótimo. <br><br>Nessa idade a sua energia atrativa está no pico, mas o grande erro é desperdiçá-la investindo emocionalmente em homens indisponíveis. Vamos canalizar isso a seu favor." },
            { text: "30-39 anos", feedback: "Excelente. <br><br>Você está na fase em que não tem mais paciência para joguinhos. Você quer um homem maduro e de alto valor, e é exatamente isso que a clareza emocional atrai." },
            { text: "40-49 anos", feedback: "Perfeito. <br><br>Uma mulher da sua idade tem um magnetismo poderoso e uma maturidade que assusta garotos, mas que é absolutamente irresistível para homens de verdade." },
            { text: "50 anos ou mais", feedback: "Maravilha. <br><br>Você tem a sabedoria da vida a seu favor. Chegou a hora de viver um romance leve, onde você é cuidada e priorizada como sempre mereceu." }
        ]
    },
    {
        question: "Me responde com sinceridade… Qual é o seu principal objetivo?",
        options: [
            { text: "Deixá-lo obcecado por mim", feedback: "Entendi... <br><br>Então você quer sentir que existe desejo do outro lado também. Que ele pense em você, procure você e demonstre claramente que está interessado." },
            { text: "Fazer ele me assumir", feedback: "Entendo perfeitamente.<br><br>A incerteza machuca. Você quer que ele tenha orgulho de estar ao seu lado e mostre ao mundo que você é a única escolha dele. E existe uma chave no cérebro masculino para destravar isso." },
            { text: "Atrair um homem de alto valor", feedback: "Faz todo sentido.<br><br>Você cansou de ser a provedora emocional em relações medianas. Você quer alguém que agregue à sua vida, que proteja e cuide de você." }
        ]
    },
    {
        question: "E hoje... Qual é o seu status de relacionamento?",
        options: [
            { text: "Solteira", feedback: "Estar solteira é a melhor fase para calibrar os seus <strong>Gatilhos de Dopamina</strong>. Você vai começar do zero, sem os vícios das relações passadas." },
            { text: "Ficando / Enrolada", feedback: "Essa é a famosa 'zona cinzenta'. <br><br>Ele tem os benefícios de estar com você, sem assumir o compromisso. Vamos inverter esse jogo rapidamente." },
            { text: "Namorando / Casada", feedback: "Com o tempo, a dopamina cai e a relação esfria. <br><br>O que você vai aprender vai reacender a faísca e fazer ele olhar para você como no início do relacionamento." },
            { text: "Divorciada", feedback: "Um recomeço. <br><br>Você já aprendeu o que não quer, agora vamos aplicar a psicologia comportamental para você atrair apenas o que merece." }
        ]
    },
    {
        question: "Como você se sente sobre sua vida amorosa no momento?",
        options: [
            { text: "Não me sinto amada da maneira que gostaria", feedback: "Entendi... E essa sensação pesa. Porque não é só querer ter alguém. <br><br>É querer sentir que existe alguém do outro lado que também escolhe, valoriza e deseja você." },
            { text: "Sinto que eu me esforço mais do que ele", feedback: "Isso é muito desgastante... <br><br>Relações desequilibradas esgotam a sua energia feminina. Você acaba assumindo o papel masculino da relação (o de perseguir), e isso faz ele se acomodar." },
            { text: "Ansiosa, confusa e insegura", feedback: "A confusão acontece quando a comunicação não é clara. <br><br>Um homem que te deixa confusa não ativou a certeza em você. Essa montanha-russa emocional gera um ciclo de dependência." }
        ]
    },
    {
        question: "Pensando nas suas experiências amorosas... Com que frequência você sente que oferece mais do que recebe?",
        options: [
            { text: "Sempre ou Quase sempre", feedback: "Você tem um coração enorme, mas entregar tudo sem fazer o homem investir na relação destrói a atração dele. <br><br>Homens valorizam aquilo que eles 'conquistam'." },
            { text: "Às vezes", feedback: "Saber equilibrar o quanto você dá e o quanto você recebe é o segredo das mulheres magnéticas. Quando você recua um pouco, ele avança." },
            { text: "Raramente", feedback: "Ótimo, você sabe se preservar. <br><br>Agora precisamos apenas ajustar os gatilhos para que, quando você entregar, o impacto emocional nele seja devastador." }
        ]
    },
    {
        question: "Quais desses desafios você sente na sua vida amorosa?",
        options: [
            { text: "Sou rejeitada ou deixada de lado", feedback: "Isso acaba levando para uma sensação parecida: você não está recebendo do homem a resposta emocional que gostaria. Seja atenção... desejo... saudade... iniciativa... <br><br>Mas 8 em cada 10 mulheres notam mudanças já nos primeiros dias quando aprendem a ativar o gatilho da dopamina nele... Pois é o único jeito de deixá-lo completamente louco por você." },
            { text: "Eles somem do nada (Ghosting)", feedback: "O 'Ghosting' acontece quando a previsibilidade toma conta. <br><br>O cérebro dele não viu mais 'desafio', a dopamina caiu e ele perdeu o foco. Vamos aprender a manter esse pico ativo." },
            { text: "Falta de prioridade e comprometimento", feedback: "Ninguém prioriza o que está sempre disponível.<br><br>Quando você se torna um 'prêmio' no subconsciente dele através da dopamina, o comprometimento passa a ser ideia DELE, não sua." }
        ]
    },
    {
        question: "Você gostaria de ter mais controle emocional sobre os homens?",
        options: [
            { text: "Claro que sim", feedback: "Ter controle não é ser manipuladora. É não ser refém das atitudes deles. <br><br>Quando você dita o ritmo emocional da relação, ele passa a te seguir." },
            { text: "Sim", feedback: "A mulher magnética não implora por atenção, ela inspira atenção. O controle emocional é a sua maior arma." },
            { text: "Gostaria de entender melhor", feedback: "O controle vem através do conhecimento.<br><br>Entender como o cérebro masculino processa a atração tira de você toda a culpa e a ansiedade." }
        ]
    },
    {
        question: "Pensando no homem ideal para você... Qual dessas qualidades é a mais importante?",
        options: [
            { text: "Fiel e Comprometido", feedback: "Faça ele te escolher todos os dias! <br><br>Quando você ativa os gatilhos de dopamina nele, ele começa a pensar em você o tempo todo, querer realizar seus desejos e permanecer completamente comprometido." },
            { text: "Protetor e Cuidadoso", feedback: "Para que um homem queira proteger você, ele precisa sentir que encontrou algo precioso. <br><br>A dopamina faz ele enxergar você como uma joia rara." },
            { text: "Carinhoso e Atencioso", feedback: "A atenção masculina segue onde o foco dele está. <br><br>Com as técnicas certas, o foco dele sairá do futebol, dos amigos ou do videogame, e irá direto para você." }
        ]
    },
    {
        question: "Quão bem você acha que entende a mente dos homens?",
        options: [
            { text: "Muitas vezes não faço ideia do que ele está pensando", feedback: "E essa falta de clareza costuma gerar muita confusão e ansiedade. <br><br>Porque quando você não entende o comportamento... qualquer silêncio, mensagem ou mudança parece carregar algum significado oculto." },
            { text: "Acho que entendo mais ou menos", feedback: "O que a maioria das mulheres sabe sobre os homens é baseado em filmes ou conselhos de amigas. <br><br>Mas a neurociência mostra que eles funcionam de uma maneira muito mais primitiva e visual." },
            { text: "Não entendo nada", feedback: "Não se preocupe. A mente masculina é incrivelmente simples quando você descobre quais botões apertar. <br><br>E é exatamente isso que eu vou te mostrar." }
        ]
    },
    {
        question: "Você sabia que ativar a 'Dopamina' no cérebro dele pode fazer com que ele sinta sua falta intensamente?",
        options: [
            { text: "Quero entender como funciona", feedback: "Estudos científicos revelam que a dopamina - o hormônio do desejo, alimenta a excitação dele. <br><br>Ao ativar os gatilhos de dopamina, ele vai desejar sua atenção e aprofundar a conexão como nunca." },
            { text: "Eu não fazia ideia disso", feedback: "Isso é neurociência aplicada a relacionamentos. <br><br>A dopamina cria um circuito de 'recompensa' no cérebro dele. Sempre que ele pensar em você, sentirá uma necessidade física de estar perto." },
            { text: "Já ouvi falar, mas não sei aplicar", feedback: "A teoria não funciona sem a prática. <br><br>Existem mensagens de texto específicas, palavras e silêncios calculados que disparam essa química imediatamente." }
        ]
    },
    {
        question: "Quais dessas estratégias você mais gostaria de aprender? (pode escolher mais de uma)",
        options: [
            { text: "Como fazer ele sentir saudades de mim", feedback: "Ótima escolha. A saudade é o primeiro passo para o desejo verdadeiro e intenso." },
            { text: "Como fazer ele se apegar a mim", feedback: "O apego emocional é o que garante que ele fique obcecado por você a longo prazo." },
            { text: "Como fazer ele ser mais proativo comigo", feedback: "Fazer ele tomar a iniciativa vai devolver todo o poder para as suas mãos." },
            { text: "Como entender melhor o que ele está pensando", feedback: "Ler a mente dele é a chave principal para antecipar e guiar os passos da relação." }
        ]
    },
    {
        question: "Quão pronta você está para transformar sua vida amorosa?",
        options: [
            { text: "Estou totalmente preparada!", feedback: "" },
            { text: "Sinto-me confiante", feedback: "" },
            { text: "Preciso de mais preparação", feedback: "" }
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
        // Ao invés de ir pro quiz direto, vai pra VSL
        switchScreen(elements.home, elements.vslScreen);
    });
}

if (elements.vslContinueBtn) {
    elements.vslContinueBtn.addEventListener('click', () => {
        // Da VSL vai pro Quiz
        switchScreen(elements.vslScreen, elements.quiz);
        currentQuestionIndex = 0;
        loadQuestion();
        
        // Pausar o vídeo VTurb se necessário quando sair da tela, 
        // mas como a tela só fica oculta, o ifram pode continuar tocando.
        // Opcional: remover o iframe para parar o áudio, ou recarregar
        const vturbIframe = document.getElementById('ifr_6ac292261507090c7e943773');
        if(vturbIframe) {
            vturbIframe.innerHTML = ''; 
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
    }, 400); // Tempo para o fade-out
}

function loadQuestion() {
    const currentQ = questions[currentQuestionIndex];
    
    // Atualiza texto e anima
    elements.questionText.style.opacity = 0;
    setTimeout(() => {
        elements.questionText.innerHTML = currentQ.question;
        elements.questionText.style.opacity = 1;
        elements.questionText.style.transition = 'opacity 0.5s ease';
    }, 200);

    elements.optionsContainer.innerHTML = '';
    
    // Progresso
    const progress = ((currentQuestionIndex) / questions.length) * 100;
    elements.progressBar.style.width = `${progress}%`;
    elements.questionCounter.textContent = `${currentQuestionIndex + 1} / ${questions.length}`;

    // Carrega opções com animação em cascata
    currentQ.options.forEach((option, index) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.innerHTML = option.text;
        
        // Setup animação de entrada
        btn.style.opacity = '0';
        btn.style.transform = 'translateY(10px)';
        btn.style.transition = 'all 0.4s ease';
        
        btn.addEventListener('click', () => handleAnswer(option));
        elements.optionsContainer.appendChild(btn);

        setTimeout(() => {
            btn.style.opacity = '1';
            btn.style.transform = 'translateY(0)';
        }, 100 + (index * 100)); // cascata
    });
}

function handleAnswer(selectedOption) {
    // Se essa opção tiver feedback e não for vazio
    if (selectedOption.feedback && selectedOption.feedback.trim() !== "") {
        // Mostra digitando no cabeçalho do chat
        elements.chatStatus.textContent = 'Digitando...';
        elements.chatStatus.style.color = '#D81B60'; // Dá um destaque na cor enquanto digita
        
        // Esvazia o balão ou coloca um indicador sutil
        elements.feedbackText.innerHTML = '<span style="color:var(--text-muted);font-style:italic;">...</span>';
        switchScreen(elements.quiz, elements.feedback);
        
        // Simula tempo de digitação baseado no tamanho do texto
        setTimeout(() => {
            elements.chatStatus.textContent = 'Online';
            elements.chatStatus.style.color = 'var(--primary-color)';
            elements.feedbackText.innerHTML = selectedOption.feedback;
        }, 3000); // Demora 3 segundos para parecer mais realista
        
    } else {
        // Avança direto
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
    }, 1800); // Mais demorado, gera mais ansiedade boa
}

const finalMessages = [
    "⚠️ <b>Análise concluída.</b><br><br>Pelas suas respostas, eu identifiquei seu perfil e você tem um potencial muito alto.",
    "Mas deixa eu te revelar algo: O problema não é falta de sorte com homens...<br><br>É que algumas atitudes podem tornar a conexão previsível e diminuir a curiosidade e o desejo dele por você.",
    "A boa notícia?<br><br>Essa dinâmica pode mudar no seu caso.<br><br>Ativando os <b>Gatilhos de Dopamina Masculina...</b><br><br>que ajudam a aumentar a dopamina no cérebro dele, despertando mais <b>expectativa, curiosidade e desejo nas interações com você!</b>",
    "Seguindo ações simples e <b>técnicas poderosas comprovadas cientificamente.</b>",
    "Por isso, a solução ideal para você é o:<br><br>🔥 <b>Plano Mulher Magnética</b><br><br>Um passo a passo de 14 dias, onde você aprende a ativar os <b>Gatilhos de Dopamina</b> nele.<br><br>Vai saber exatamente o que fazer e quando fazer, para aumentar a atração nele, e deixá-lo louco por você!",
    "E o melhor: sem você precisar se humilhar, implorar ou manipular.",
    "Como você viu... Mulheres que aplicam o <b>Plano Mulher Magnética</b> aprendem usar o gatilho de dopamina da forma certa...<br><br>E com isso deixam qualquer homem louco por elas - sem precisar implorar por atenção.",
    "Muitas relatam que, quando aplicam o plano...<br><br>Eles mesmos passam a procurar novamente, demonstrando mais interesse, saudade e vontade de se aproximar.",
    "Veja alguns dos benefícios que você vai ter com o Plano Mulher Magnética:<br><br>✅ Fazer ele sentir sua falta<br>✅ Aumentar a atração dele por você<br>✅ Fazer ele pensar em você como nunca<br>✅ Fazer ele querer te procurar e tomar iniciativa<br>✅ Aumentar o desejo e a conexão<br>✅ Fazer ele querer ficar cada vez mais perto de você<br>✅ Se tornar a única opção<br>✅ Se tornar inesquecível"
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

        // Show typing
        elements.finalChatStatus.textContent = 'Digitando...';
        elements.finalChatStatus.style.color = '#D81B60';

        // Add typing indicator bubble
        const typingBubble = document.createElement('div');
        typingBubble.className = 'chat-bubble';
        typingBubble.id = 'temp-typing-bubble';
        typingBubble.innerHTML = '<p class="feedback-text"><span style="color:var(--text-muted);font-style:italic;">...</span></p>';
        elements.finalChatBody.appendChild(typingBubble);
        elements.finalChatBody.scrollTop = elements.finalChatBody.scrollHeight;

        const textLength = finalMessages[msgIndex].length;
        const delay = Math.min(Math.max(textLength * 30, 1500), 4000); // Dynamic typing time

        setTimeout(() => {
            // Remove typing bubble
            const tb = document.getElementById('temp-typing-bubble');
            if (tb) tb.remove();

            // Add real message
            const realBubble = document.createElement('div');
            realBubble.className = 'chat-bubble';
            realBubble.style.opacity = 0;
            realBubble.style.transform = 'translateY(10px)';
            realBubble.style.transition = 'all 0.3s ease';
            realBubble.innerHTML = `<p class="feedback-text">${finalMessages[msgIndex]}</p>`;
            elements.finalChatBody.appendChild(realBubble);
            
            // Trigger animation
            setTimeout(() => {
                realBubble.style.opacity = 1;
                realBubble.style.transform = 'translateY(0)';
            }, 50);

            elements.finalChatStatus.textContent = 'Online';
            elements.finalChatStatus.style.color = 'var(--primary-color)';
            
            elements.finalChatBody.scrollTop = elements.finalChatBody.scrollHeight;

            msgIndex++;
            setTimeout(sendNextMessage, 1000); // Wait 1 second before starting to type next message
        }, delay);
    }

    sendNextMessage();
}

if (elements.showPlansBtn) {
    elements.showPlansBtn.addEventListener('click', () => {
        switchScreen(elements.finalChatScreen, elements.plans);
    });
}
