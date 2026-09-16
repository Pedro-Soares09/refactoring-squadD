/**
 * Lógica do Chat Interativo com IA - Squad D
 * 
 * Suporta comunicação com a API backend (POST /api/chat)
 * e fallback autônomo caso aberto via Live Server / file:/// sem backend ativo.
 */

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('chat-form');
  const input = document.getElementById('chat-user-input');
  const sendBtn = document.getElementById('chat-send-btn');
  const messagesContainer = document.getElementById('chat-messages-container');
  const typingIndicator = document.getElementById('typing-indicator');
  const clearBtn = document.getElementById('btn-clear-chat');
  const statusText = document.getElementById('chat-status-text');
  const suggestionPills = document.querySelectorAll('.suggestion-pill');

  // Histórico local de mensagens para contexto da IA
  const conversationHistory = [];

  // Foco imediato no campo de entrada
  input.focus();

  // Verifica saúde do backend
  checkBackendHealth();

  async function checkBackendHealth() {
    try {
      const res = await fetch('/api/health');
      if (res.ok) {
        const data = await res.json();
        if (data.hasGeminiKey || data.provider === 'gemini') {
          statusText.textContent = `Online • Google Gemini (${data.model})`;
        } else if (data.hasOpenAiKey || data.provider === 'openai') {
          statusText.textContent = `Online • OpenAI (${data.model})`;
        } else {
          statusText.textContent = 'Online • Assistente Squad D';
        }
      }
    } catch {
      statusText.textContent = 'Online • Modo Local Autónomo';
    }
  }

  // Evento de Envio do Formulário
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const message = input.value.trim();
    if (!message) return;

    // Adiciona mensagem do usuário na tela
    appendMessage(message, 'user');
    conversationHistory.push({ role: 'user', content: message });
    input.value = '';
    input.disabled = true;
    sendBtn.disabled = true;

    // Exibe animação de "digitando..."
    showTyping(true);

    try {
      let botReply = '';

      // Tenta enviar para o backend
      try {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            message,
            history: conversationHistory
          })
        });

        if (response.ok) {
          const data = await response.json();
          botReply = data.reply;
        } else {
          throw new Error('Falha no status da API');
        }
      } catch {
        // Fallback no cliente caso o backend não esteja rodando (ex: aberto direto como arquivo local)
        botReply = getClientSideFallback(message);
      }

      // Simula um tempo natural de resposta se foi instantâneo
      await new Promise(r => setTimeout(r, 450));

      showTyping(false);
      appendMessage(botReply, 'bot');
      conversationHistory.push({ role: 'assistant', content: botReply });

    } catch (err) {
      showTyping(false);
      appendMessage('Desculpe, ocorreu um erro temporário ao processar sua mensagem. Por favor, tente novamente.', 'bot');
    } finally {
      input.disabled = false;
      sendBtn.disabled = false;
      input.focus();
    }
  });

  // Sugestões Rápidas (Pills)
  suggestionPills.forEach(pill => {
    pill.addEventListener('click', () => {
      const question = pill.getAttribute('data-question');
      if (question) {
        input.value = question;
        form.dispatchEvent(new Event('submit', { cancelable: true }));
      }
    });
  });

  // Limpar Chat
  clearBtn.addEventListener('click', () => {
    if (confirm('Deseja realmente limpar o histórico da conversa?')) {
      conversationHistory.length = 0;
      messagesContainer.innerHTML = `
        <div class="message bot">
          <div class="message-avatar">IA</div>
          <div class="message-bubble">
            Conversa reiniciada! Como posso te ajudar agora a respeito do <strong>Squad D</strong>?
            <div class="message-time">Agora</div>
          </div>
        </div>
      `;
    }
  });

  // Renderizar Mensagem na Lista
  function appendMessage(text, sender) {
    const messageEl = document.createElement('div');
    messageEl.classList.add('message', sender);

    const avatarEl = document.createElement('div');
    avatarEl.classList.add('message-avatar');
    avatarEl.textContent = sender === 'user' ? 'Você' : 'IA';

    const bubbleEl = document.createElement('div');
    bubbleEl.classList.add('message-bubble');

    // Formatação amigável de markdown básico (negrito, listas e quebras de linha)
    bubbleEl.innerHTML = formatMarkdown(text);

    const timeEl = document.createElement('div');
    timeEl.classList.add('message-time');
    const now = new Date();
    timeEl.textContent = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    bubbleEl.appendChild(timeEl);

    messageEl.appendChild(avatarEl);
    messageEl.appendChild(bubbleEl);

    messagesContainer.appendChild(messageEl);
    scrollToBottom();
  }

  function showTyping(show) {
    typingIndicator.style.display = show ? 'flex' : 'none';
    if (show) scrollToBottom();
  }

  function scrollToBottom() {
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  // Conversor leve de formatação básica
  function formatMarkdown(str) {
    if (!str) return '';
    let formatted = str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    // Negrito **texto**
    formatted = formatted.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    // Itálico *texto*
    formatted = formatted.replace(/\*(.*?)\*/g, '<em>$1</em>');
    
    // Quebras de linha
    formatted = formatted.replace(/\n/g, '<br>');

    return formatted;
  }

  // Motor Inteligente Contextual Client-Side (Fallback)
  function getClientSideFallback(userMessage) {
    const q = userMessage.toLowerCase();

    if (q.includes('quem') || q.includes('membros') || q.includes('equipe') || q.includes('integrantes') || q.includes('time')) {
      return "O **Squad D** é formado por quatro estudantes de Análise e Desenvolvimento de Sistemas (ADS):\n\n" +
             "• **Débora Oliveira**: Desenvolvimento Frontend e raciocínio lógico.\n" +
             "• **Maria Clara**: Backend, modelagem e integração de APIs.\n" +
             "• **Geysiane Alves**: Desenvolvimento Mobile e disciplina de entregas.\n" +
             "• **Luiza de Deus**: UX/UI Design, usabilidade e estilização.";
    }

    if (q.includes('serviço') || q.includes('servico') || q.includes('fazem') || q.includes('oferece')) {
      return "O Squad D é especializado em:\n\n" +
             "1. **Desenvolvimento Frontend** (interfaces modernas, acessíveis e responsivas);\n" +
             "2. **Desenvolvimento Backend & APIs** (sistemas seguros e integrados com IA);\n" +
             "3. **Aplicações Mobile** (apps fluidos e performáticos);\n" +
             "4. **UX/UI Design** (protótipos e experiência centrada no usuário).";
    }

    if (q.includes('case') || q.includes('sucesso') || q.includes('resultado')) {
      return "O Case de Sucesso do Squad D gerou resultados comprovados:\n\n" +
             "• **+70% de produtividade** nos fluxos da empresa parceira;\n" +
             "• **-85% de retrabalho** operacional;\n" +
             "• Comunicação interna 3x mais eficiente;\n" +
             "• 100% de satisfação da equipe e liderança.";
    }

    if (q.includes('projeto') || q.includes('portfolio') || q.includes('portfólio')) {
      return "Entre os projetos do Squad D, destacam-se:\n\n" +
             "• **Website Institucional**: Otimização com redução de 40% no carregamento e score 98 no Lighthouse.\n" +
             "• **Formulário Acessível**: Validação em tempo real seguindo diretrizes WCAG 2.1 AA.\n" +
             "• **API de Tarefas com IA**: Solução em planejamento para gestão ágil de times de tecnologia.";
    }

    if (q.includes('contato') || q.includes('falar') || q.includes('email') || q.includes('local')) {
      return "Você pode entrar em contato conosco pelo e-mail **contato@squadd-tech.dev** ou visitar a página de **Contato** do nosso portal para nos enviar uma mensagem diretamente!";
    }

    return "Olá! Sou a assistente de IA do **Squad D**. Posso responder dúvidas sobre as desenvolvedoras (Débora, Maria Clara, Geysiane e Luiza), detalhar nossos serviços ou falar sobre nossos cases e projetos. O que você gostaria de saber?";
  }
});
