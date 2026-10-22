// ================================================================
// FLUXO COMPLETO â€” chat contÃ­nuo, sem mudar de ecrÃ£
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

// Delay de digitaÃ§Ã£o: mais lento e mais realista
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

// Envia array de bolhas sequencialmente (sem botÃµes)
function showBubbles(bubbles, cb) {
  let i = 0;
  function next() {
    if (i >= bubbles.length) { cb && cb(); return; }
    sendOne(bubbles[i++], next);
  }
  next();
}

// BotÃ£o Ãºnico que vira bolha verde
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

// OpÃ§Ãµes pill verdes com feedback opcional
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
  confirm.textContent = 'Continuar âž”';
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

  // 0 â€” Headline dopamina
  function() {
    sendOne('Use nele o <strong>"gatilho de dopamina"</strong> para <strong>aumentar a atracÃ§Ã£o dele em ti,</strong> e fazer ele <strong>sentir a tua falta.</strong>\n\nClica abaixo, faz o <strong>teste grÃ¡tis de 1 minuto</strong> e aprende...', () => {
      showButton('ðŸ‘‰ COMEÃ‡AR TESTE GRÃTIS', next);
    });
  },

  // 1 â€” Intro do doutor
  function() {
    sendOne('OlÃ¡, sou o Dr. AntÃ³nio Figueiredo, <strong>especialista em psicologia de relacionamentos</strong> hÃ¡ mais de 15 anos.\n\nJÃ¡ ajudei <strong>mais de 1000 mulheres</strong> a <strong>fazer o homem certo ficar obcecado por elas</strong> com este mÃ©todo.\n\nResponde-me algumas <strong>perguntas rÃ¡pidas</strong> para eu entender o teu caso e poder ensinar-te tambÃ©m!', () => {
      showButton('Continuar', next);
    });
  },

  // 2 â€” Q1: Idade
  function() {
    sendOne('Para comeÃ§ar, diz-me: Qual a tua idade?', () => {
      showOptions([
        { text: '18-29 anos', feedback: '' },
        { text: '30â€“39 anos', feedback: '' },
        { text: '40â€“49 anos', feedback: '' },
        { text: '50+',        feedback: '' }
      ], next);
    });
  },

  // 3 â€” Q2: Objectivo
  function() {
    sendOne('Responde com sinceridade...\nQual Ã© o teu principal objectivo?', () => {
      showOptions([
        { text: 'Atrair o homem certo',
          feedback: 'Entendi...\n\nEntÃ£o nÃ£o Ã© simplesmente sobre ter alguÃ©m.\n\nQueres conseguir despertar o interesse do homem que realmente desejas.' },
        { text: 'DeixÃ¡-lo obcecado',
          feedback: 'Entendi...\n\nEntÃ£o nÃ£o Ã© simplesmente sobre ter alguÃ©m.\n\nQueres que ele nÃ£o consiga parar de pensar em ti e isso Ã© totalmente possÃ­vel.' },
        { text: 'Casar-se',
          feedback: 'Entendi...\n\nPara ele dar esse passo, precisa sentir que tu Ã©s a Ãºnica opÃ§Ã£o e hÃ¡ uma forma de activar isso nele.' },
        { text: 'Reacender a paixÃ£o',
          feedback: 'Entendi...\n\nEntÃ£o em algum momento jÃ¡ existiu uma ligaÃ§Ã£o mais forte...\n\ne hoje gostavas de sentir aquela intensidade de novo.' }
      ], next);
    });
  },

  // 4 â€” Q3: Estado de relacionamento
  function() {
    sendOne('E hoje...\nQual Ã© o teu estado de relacionamento?', () => {
      showOptions([
        { text: 'Solteira',                      feedback: '' },
        { text: 'Ã‰ complicado',                   feedback: '' },
        { text: 'Encontro casual / namorando',    feedback: '' },
        { text: 'Casada / relacionamento sÃ©rio',  feedback: '' }
      ], next);
    });
  },

  // 5 â€” Q4: Vida amorosa
  function() {
    sendOne('Como te sentes em relaÃ§Ã£o Ã  tua vida amorosa neste momento?', () => {
      showOptions([
        { text: 'Estou confortÃ¡vel com ela',
          feedback: 'Mas podemos sempre melhorar e criar uma ligaÃ§Ã£o ainda mais profunda.' },
        { text: 'Gostaria de me sentir mais confiante',
          feedback: 'Entendi...\n\nPrecisas de saber se estÃ¡s a agir correctamente... se ele estÃ¡ realmente interessado... ou qual deve ser o teu prÃ³ximo passo.' },
        { text: 'NÃ£o me sinto amada como gostaria',
          feedback: 'Entendo. E isso muda completamente quando activamos o instinto de perseguiÃ§Ã£o dele.' }
      ], next);
    });
  },

  // 6 â€” Q5: FrequÃªncia
  function() {
    sendOne('Pensando nas tuas experiÃªncias amorosas...\n\nCom que frequÃªncia sentes que ofereces mais do que recebes?', () => {
      showOptions([
        { text: 'Muito frequentemente', feedback: '' },
        { text: 'Ã€s vezes',             feedback: '' },
        { text: 'Quase nunca',          feedback: '' }
      ], next);
    });
  },

  // 7 â€” Q6: Desafios (multi-select)
  function() {
    sendOne('Quais destes desafios sentes na tua vida amorosa?\n(podes escolher mais de um)', () => {
      showMultiSelect(
        ['Valorizo mais ele do que a mim prÃ³pria','Sou rejeitada','NÃ£o consigo atrair o homem certo','NÃ£o me sinto amada','Sinto que a paixÃ£o acabou'],
        ['Isso acaba levando para uma sensaÃ§Ã£o parecida: nÃ£o estÃ¡s a receber do homem a resposta emocional que gostarias.\n\nSeja atenÃ§Ã£o... desejo... saudade... iniciativa... ou simplesmente sentir que Ã©s importante para ele...',
         'Mas <strong>8 em cada 10 mulheres</strong> notam mudanÃ§as jÃ¡ nos primeiros dias quando aprendem a activar o gatilho da dopamina nele...\n\nPois Ã© o Ãºnico jeito de o deixar completamente louco por ti.'],
        next
      );
    });
  },

  // 8 â€” Q7: Ãšltima vez amada
  function() {
    sendOne('Qual foi a Ãºltima vez que te sentiste realmente amada e valorizada numa relaÃ§Ã£o?', () => {
      showOptions([
        { text: 'Menos de 1 ano atrÃ¡s',     feedback: '' },
        { text: 'Entre 1 e 2 anos atrÃ¡s',   feedback: '' },
        { text: 'HÃ¡ mais de 3 anos atrÃ¡s',  feedback: '' },
        { text: 'Nunca',                     feedback: '' }
      ], next);
    });
  },

  // 9 â€” Q8: InfluÃªncia
  function() {
    sendOne('Gostavas de ter mais influÃªncia sobre os homens?', () => {
      showOptions([
        { text: 'Claro que sim',          feedback: '' },
        { text: 'Sim, mas com condiÃ§Ãµes', feedback: '' }
      ], next);
    });
  },

  // 10 â€” Q9: Homem ideal
  function() {
    const fb = 'Faz ele escolher-te todos os dias!\n\nQuando activas os gatilhos de dopamina nele, ele comeÃ§a a pensar em ti o tempo todo, querer realizar os teus desejos e permanecer completamente comprometido.';
    sendOne('Pensando no homem ideal para ti...\n\nQual destas qualidades Ã© a mais importante?', () => {
      showOptions([
        { text: 'Gentil',                 feedback: fb, afterButton: 'Continuar' },
        { text: 'Fiel',                   feedback: fb, afterButton: 'Continuar' },
        { text: 'Carinhoso',              feedback: fb, afterButton: 'Continuar' },
        { text: 'Que me apoie',           feedback: fb, afterButton: 'Continuar' },
        { text: 'Voltado para a famÃ­lia', feedback: fb, afterButton: 'Continuar' }
      ], next);
    });
  },

  // 11 â€” Q10: Entendes os homens
  function() {
    sendOne('QuÃ£o bem achas que entendes os homens?', () => {
      showOptions([
        { text: 'Muitas vezes nÃ£o faÃ§o ideia do que ele estÃ¡ a pensar',
          feedback: 'E essa falta de clareza costuma gerar muita confusÃ£o e ansiedade.\n\nPorque quando nÃ£o entendes o comportamento...\n\nqualquer silÃªncio, mensagem ou mudanÃ§a parece carregar algum significado oculto.' },
        { text: 'Ã€s vezes Ã© difÃ­cil entender o que ele estÃ¡ a pensar',
          feedback: 'E essa falta de clareza costuma gerar muita confusÃ£o e ansiedade.\n\nPorque quando nÃ£o entendes o comportamento...\n\nqualquer silÃªncio, mensagem ou mudanÃ§a parece carregar algum significado oculto.' },
        { text: 'Muito bem, quase leio a mente deles',
          feedback: 'Mesmo entendendo alguma coisa, hÃ¡ sempre camadas mais profundas na mente dele que podem surpreender-te.' }
      ], next);
    });
  },

  // 12 â€” Dopamina: pergunta
  function() {
    sendOne('Sabias que aumentar a dopamina dele pode fazer com que ele sinta a tua falta?', () => {
      showOptions([
        { text: 'NÃ£o sabia',                    feedback: '' },
        { text: 'Quero entender como funciona', feedback: '' }
      ], next);
    });
  },

  // 13 â€” CiÃªncia (2 mensagens max) + recompensas
  function() {
    sendOne('Estudos cientÃ­ficos revelam que a dopamina, o hormÃ´nio do desejo, alimenta a excitaÃ§Ã£o dele.\n\nAo activar os gatilhos de dopamina, ele vai desejar a tua atenÃ§Ã£o e aprofundar a ligaÃ§Ã£o.', () => {
      sendOne('Sabias que pequenas recompensas podem mantÃª-lo a pensar em ti?', () => {
        showOptions([
          { text: 'Sim',                  feedback: '' },
          { text: 'NÃ£o sabia',            feedback: '' },
          { text: 'Quero entender como',  feedback: '' }
        ], next);
      });
    });
  },

  // 14 â€” Q11: EstratÃ©gias (multi-select)
  function() {
    sendOne('Quais destas estratÃ©gias gostavas mais de aprender?\n(podes escolher mais de uma)', () => {
      showMultiSelect(
        ['Como fazer ele sentir saudades de mim','Como fazer ele apegar-se a mim','Como fazer ele ser mais proactivo comigo','Como perceber melhor o que ele estÃ¡ a pensar'],
        [],
        next
      );
    });
  },

  // 15 â€” Q12: QuÃ£o pronta
  function() {
    sendOne('QuÃ£o pronta estÃ¡s para transformar a tua vida amorosa?', () => {
      showOptions([
        { text: 'Estou totalmente pronta!',    feedback: '' },
        { text: 'Preciso de mais preparaÃ§Ã£o',  feedback: '' },
        { text: 'Tenho algumas dÃºvidas',        feedback: '' }
      ], next);
    });
  },

  // 16 â€” 94% + comprometimento
  function() {
    sendOne('<strong>94% das mulheres</strong> que usam estes gatilhos de dopamina despertaram atracÃ§Ã£o e comprometimento em apenas algumas semanas!', () => {
      sendOne('Se existisse um plano passo a passo de 14 dias\n\nmostrando exactamente o que fazer para despertar mais atracÃ§Ã£o, interesse, ligaÃ§Ã£o e saudade no homem que desejas...\n\ncomprometerias a seguir?', () => {
        showOptions([
          { text: 'Sim, eu comprometo-me',            feedback: '' },
          { text: 'Sim, quero entender cada detalhe', feedback: '' }
        ], next);
      });
    });
  },

  // 17 â€” AnÃ¡lise: grupo 1 (3 msgs) + Continuar
  function() {
    showBubbles([
      'âš ï¸ <strong>AnÃ¡lise concluÃ­da.</strong>\n\nPelas tuas respostas, identifiquei o teu perfil e tens um potencial muito alto.',
      'Mas deixa-me revelar algo:\nO problema nÃ£o Ã© falta de sorte com os homens...\n\nÃ‰ que algumas atitudes podem tornar a ligaÃ§Ã£o previsÃ­vel e diminuir a curiosidade e o desejo dele por ti.',
      'A boa notÃ­cia?\n\nEssa dinÃ¢mica pode mudar no teu caso.\n\nActivando os <strong>Gatilhos de Dopamina Masculina</strong>... que ajudam a aumentar a dopamina no cÃ©rebro dele, despertando mais expectativa, curiosidade e desejo nas interacÃ§Ãµes contigo!'
    ], () => showButton('Continuar', next));
  },

  // 18 â€” AnÃ¡lise: grupo 2 (3 msgs) + Continuar
  function() {
    showBubbles([
      'Seguindo acÃ§Ãµes simples e tÃ©cnicas poderosas comprovadas cientificamente.',
      'Por isso, a soluÃ§Ã£o ideal para ti Ã© o:\n\nðŸ”¥ <strong>Plano Mulher MagnÃ©tica</strong>\n\nUm passo a passo de 14 dias, onde aprendes a activar os Gatilhos de Dopamina nele.\n\nVais saber exactamente o que fazer e quando fazer, para aumentar a atracÃ§Ã£o nele, e deixÃ¡-lo louco por ti!',
      'E o melhor: sem precisares de te humilhar, implorar ou manipular.'
    ], () => showButton('Continuar', next));
  },

  // 19 â€” BenefÃ­cios + Continuar
  function() {
    sendOne('VÃª alguns dos benefÃ­cios que vais ter com o Plano Mulher MagnÃ©tica:\n\nâœ… Fazer ele sentir a tua falta\nâœ… Aumentar a atracÃ§Ã£o dele por ti\nâœ… Fazer ele pensar em ti como nunca\nâœ… Fazer ele querer procurar-te e tomar iniciativa\nâœ… Aumentar o desejo e a ligaÃ§Ã£o\nâœ… Fazer ele querer ficar cada vez mais perto de ti\nâœ… Tornares-te a Ãºnica opÃ§Ã£o\nâœ… Tornares-te inesquecÃ­vel', () => {
      showButton('Continuar', next);
    });
  },

  // 20 â€” 94% + depoimentos (grupo 1: texto + 3 imagens)
  function() {
    showBubbles([
      '<strong>94% das mulheres</strong> que estavam numa situaÃ§Ã£o semelhante Ã  tua...\n\nseguiram o Plano Mulher MagnÃ©tica e deixaram o homem obcecado por elas, em menos de 14 dias!',
      '<img src="depoimento1.jpg" style="width:100%;max-width:250px;border-radius:8px;display:block;">',
      '<img src="depoimento2.jpg" style="width:100%;max-width:250px;border-radius:8px;display:block;">',
      '<img src="depoimento3.jpg" style="width:100%;max-width:250px;border-radius:8px;display:block;">'
    ], () => showButton('Continuar', next));
  },

  // 21 â€” 94% + depoimentos (grupo 2: texto final + botÃ£o)
  function() {
    showBubbles([
      'Como viste...\n\nMulheres que aplicam o Plano Mulher MagnÃ©tica aprendem a usar o gatilho de dopamina da forma certa...\n\ne com isso deixam qualquer homem louco por elas, sem precisar de implorar atenÃ§Ã£o.',
      'Muitas relatam que, quando aplicam o plano...\n\nEles prÃ³prios voltam a procurÃ¡-las, demonstrando mais interesse, saudade e vontade de se aproximar.'
    ], () => showButton('Sim, eu quero esses resultados!', next));
  },

  // 22 â€” ParabÃ©ns + plano pronto + Continuar
  function() {
    showBubbles([
      'Ã“timo! ParabÃ©ns por esta decisÃ£o.\n\nVais tambÃ©m ter Ã³ptimos resultados com o Plano Mulher MagnÃ©tica!',
      'E agora o teu plano personalizado de 14 dias jÃ¡ estÃ¡ pronto!',
      'De acordo com as tuas respostas, assim vÃ£o ser os teus resultados:'
    ], () => showButton('Continuar', next));
  },

  // 23 â€” Timeline (4 dias + 9 dias + 14 dias + pergunta) + botÃ£o
  function() {
    showBubbles([
      'ðŸ”´ <strong>Hoje:</strong>\nEle nÃ£o demonstra tanto interesse em ti',
      'ðŸŸ  <strong>Em 4 dias:</strong>\nEle comeÃ§a a pensar em ti',
      'ðŸŸ¡ <strong>Em 9 dias:</strong>\nSente a tua falta e uma atracÃ§Ã£o incontrolÃ¡vel por ti',
      'ðŸŸ¢ <strong>Em 14 dias:</strong>\nEle estÃ¡ mais presente, totalmente interessado e a tomar iniciativas para ficar perto de ti'
    ], () => showButton('Continuar', next));
  },

  // 24 â€” Pergunta final + botÃ£o
  function() {
    sendOne('EstÃ¡s pronta para te tornares uma Mulher MagnÃ©tica, fazer ele sentir a tua falta e deixÃ¡-lo louco por ti?', () => {
      showButton('Sim, eu quero isso!', next);
    });
  },

  // 25 â€” O que recebes + botÃ£o
  function() {
    sendOne('ðŸ“‹ <strong>O QUE RECEBES HOJE:</strong>\n\nâœ… Plano Mulher MagnÃ©tica\nâœ… Truques para disparar dopamina e fazÃª-lo sentir saudades\nâœ… MÃ©todos para aumentar a atracÃ§Ã£o e lealdade dele\nâœ… Dicas de especialistas para elevar os hormÃ´nios do amor dele\nâœ… EstratÃ©gias para deixÃ¡-lo obcecado por ti\nâœ… TÃ©cnicas poderosas para magnetizÃ¡-lo\nâœ… Como aplicar o plano mesmo estando longe dele\nâœ… Acesso imediato\nâœ… Acesso vitalÃ­cio ao plano', () => {
      sendOne('âœ… Milhares de alunas aplicaram, e conseguiram resultados incrÃ­veis!', () => {
        showButton('Quero o meu plano!', next);
      });
    });
  },

  // 26 â€” BÃ³nus 1, 2, 3 + Continuar
  function() {
    showBubbles([
      'Ok! E alÃ©m do teu plano...\n\nVou dar-te mais <strong>4 bÃ³nus exclusivos</strong> hoje...',
      'ðŸŽ <strong>BÃ“NUS 1, Guia dos 7 Erros Que Fazem Ele Perder o Interesse</strong>\n\nDescobre os principais erros que podem diminuir a atracÃ§Ã£o e fazer um homem afastar-se... e o que fazer em vez disso.\n\nDe <s>19,90â‚¬</s> por: <strong>GRÃTIS</strong>',
      'ðŸŽ <strong>BÃ“NUS 2, Como Ler os Sinais de Interesse Dele</strong>\n\nAprende a identificar quando um homem estÃ¡ realmente interessado... e reconhece os sinais que mostram quando Ã© hora de te aproximar ou dar espaÃ§o.\n\nDe <s>29,90â‚¬</s> por: <strong>GRÃTIS</strong>',
      'ðŸŽ <strong>BÃ“NUS 3, Manual da Mulher InesquecÃ­vel</strong>\n\nMelhora a aparÃªncia e autoestima, para ele ficar ainda mais louco de desejo por ti.\n\nDe <s>27,90â‚¬</s> por: <strong>GRÃTIS</strong>'
    ], () => showButton('Continuar', next));
  },

  // 27 â€” Lista completa + preÃ§o + Continuar
  function() {
    showBubbles([
      '<strong>QUANTO CUSTA TUDO ISSO?</strong>\n\nâœ… Plano Mulher MagnÃ©tica\nâœ… Aplicativo com desafios, checklist, aulas\nâœ… Truques para activar dopamina\nâœ… MÃ©todos para aumentar a atracÃ§Ã£o e lealdade\nâœ… EstratÃ©gias para deixÃ¡-lo obcecado\nâœ… TÃ©cnicas para magnetizÃ¡-lo\nâœ… Como aplicar o plano mesmo Ã  distÃ¢ncia\nâœ… Guia dos 7 erros\nâœ… Como ler os sinais de interesse\nâœ… Manual da Mulher InesquecÃ­vel\nâœ… Acesso imediato e vitalÃ­cio',
      'Tudo isso acima de: <s>197â‚¬</s>\n\n<strong>HOJE por apenas: 4,24â‚¬</strong>\n\nSim, menos que o preÃ§o de um cafÃ©.\n\nComo a minha missÃ£o Ã© ajudar...\n\nðŸ”¥ Hoje, vou liberar apenas 5 vagas por esse valor promocional! â°'
    ], () => showButton('Continuar', next));
  },

  // 28 â€” Garantia + texto final + CTA
  function() {
    showBubbles([
      'âœ… E ainda, tens <strong>30 dias de garantia de reembolso.</strong>\n\nSe por qualquer motivo achares que o plano nÃ£o Ã© para ti, basta solicitar o reembolso que devolvo 100% do teu investimento.\n\nSimples assim. O risco Ã© todo meu. O teu risco Ã© zero.',
      'EntÃ£o, se realmente queres aumentar a atracÃ§Ã£o dele, fazÃª-lo sentir a tua falta e sempre ter vontade de te procurar...\n\nClica no botÃ£o abaixo e garante a tua vaga no Plano Mulher MagnÃ©tica com todos os bÃ³nus! ðŸ‘‡'
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
  link.textContent = 'SIM, QUERO TER ELE LOUCO POR MIM! ðŸ”¥';

  const priceBox = document.createElement('div');
  priceBox.className = 'price-box';
  priceBox.innerHTML = `<span class="price-main">4,24 â‚¬</span><span class="price-vat">IVA IncluÃ­do (0,24 â‚¬)</span>`;

  const guarantee = document.createElement('p');
  guarantee.className = 'guarantee-txt';
  guarantee.textContent = 'ðŸ›¡ï¸ Garantia de 30 dias Â· Pagamento 100% seguro';

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
