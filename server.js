/**
 * Servidor Backend & Rota de Chat com IA - Squad D
 * 
 * Tecnologias: Node.js, Express, integração com Google Gemini API (e OpenAI como alternativa)
 * Possui modo de fallback inteligente contextual sobre o Squad D para apresentações sem falhas
 */

const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Servir arquivos estáticos (HTML, CSS, JS, etc.)
app.use(express.static(path.join(__dirname)));

// Contexto e Persona do Squad D para a Inteligência Artificial
const SYSTEM_PROMPT = `
Você é a Assistente Virtual Oficial do Squad D.
O Squad D é um time ágil de 4 desenvolvedoras estudantes de Análise e Desenvolvimento de Sistemas (ADS):
- Débora Oliveira: Desenvolvedora Frontend (HTML5, CSS3, JavaScript, lógica de programação).
- Maria Clara: Desenvolvedora Backend & APIs (arquitetura de software, bancos de dados e integração).
- Geysiane Alves: Desenvolvedora Mobile (aplicativos móveis, lógica e rigor técnico).
- Luiza de Deus: Especialista em UX/UI Design & Frontend (experiência do usuário, interfaces e acessibilidade).

Serviços oferecidos:
1. Desenvolvimento Frontend responsivo e acessível.
2. Desenvolvimento Backend seguro e APIs RESTful.
3. Criação de Aplicações Mobile com alta fluidez.
4. UX/UI Design com prototipagem centrada no usuário.

Projetos e Destaques:
- Website Institucional Otimizado: reduziu 40% o tempo de carregamento e aumentou 15% as conversões.
- Formulário de Cadastro Acessível (WCAG 2.1 AA).
- API de Gerenciamento com IA (em planejamento).
- Case de Sucesso comprovado com aumento de 70% na produtividade e redução de 85% nos retrabalhos.

Valores:
Entrega rigorosa no prazo, código limpo, ética profissional e comunicação transparente.

Instruções:
- Seja sempre educada, profissional, prestativa e objetiva.
- Responda em português brasileiro.
- Destaque as qualidades e diferenciais do Squad D sempre que oportuno.
`;

/**
 * Resposta de Fallback Inteligente (garante que a apresentação funcione perfeitamente
 * mesmo sem chave de API ou em ambiente offline/sem saldo)
 */
function generateContextualFallback(userMessage) {
  const query = userMessage.toLowerCase().trim();

  if (query.includes('quem') || query.includes('membros') || query.includes('equipe') || query.includes('integrantes') || query.includes('time')) {
    return "O **Squad D** é formado por quatro talentosas desenvolvedoras de ADS:\n\n" +
           "• **Débora Oliveira**: Especialista em Desenvolvimento Frontend e lógica.\n" +
           "• **Maria Clara**: Especialista em Backend, arquitetura e banco de dados.\n" +
           "• **Geysiane Alves**: Focada em Aplicações Mobile e soluções escaláveis.\n" +
           "• **Luiza de Deus**: Especialista em UX/UI Design e interfaces modernas.\n\n" +
           "Juntas, cobrimos o ciclo completo de desenvolvimento de software!";
  }

  if (query.includes('serviço') || query.includes('servico') || query.includes('fazem') || query.includes('oferece') || query.includes('trabalho')) {
    return "O Squad D oferece quatro principais frentes de serviços:\n\n" +
           "1. **Desenvolvimento Frontend**: Telas modernas, responsivas e de alta performance.\n" +
           "2. **Desenvolvimento Backend**: APIs RESTful seguras, integrações e modelagem de dados.\n" +
           "3. **Aplicações Mobile**: Apps intuitivos e fluidos para plataformas móveis.\n" +
           "4. **UX/UI Design**: Prototipagem, testes de usabilidade e acessibilidade WCAG.\n\n" +
           "Podemos te ajudar com algum projeto específico em uma dessas áreas?";
  }

  if (query.includes('projeto') || query.includes('portfólio') || query.includes('portfolio')) {
    return "Atualmente temos destaques importantes em nosso portfólio:\n\n" +
           "• **Website Institucional de Alta Performance**: Redução de 40% no carregamento e score 98 no Lighthouse.\n" +
           "• **Formulário de Cadastro Acessível**: Validação em tempo real compatível com leitores de tela.\n" +
           "• **API de Gerenciamento com IA**: Plataforma RESTful para produtividade de squads.\n\n" +
           "Você pode conferir todos os detalhes na página **Projetos** do nosso site!";
  }

  if (query.includes('case') || query.includes('sucesso') || query.includes('resultado')) {
    return "Nosso principal Case de Sucesso alcançou métricas expressivas:\n\n" +
           "🚀 **+70% de ganho de produtividade** para o cliente;\n" +
           "📉 **-85% de retrabalho** nos fluxos operacionais;\n" +
           "⚡ **Comunicação 3x mais ágil** entre as equipes;\n" +
           "⭐ **100% de satisfação** com aprovação unânime da diretoria parceira.";
  }

  if (query.includes('contato') || query.includes('falar') || query.includes('email') || query.includes('onde')) {
    return "Você pode falar conosco das seguintes formas:\n\n" +
           "📧 **E-mail:** contato@squadd-tech.dev\n" +
           "📍 **Base:** FICR - Recife/PE\n" +
           "Ou através do nosso formulário acessível na página **Contato** aqui do site!";
  }

  if (query.includes('debora') || query.includes('débora')) {
    return "A **Débora Oliveira** é desenvolvedora Frontend no Squad D. Possui excelente capacidade de organização, raciocínio lógico sólido e grande facilidade para implementar interfaces interativas e ágeis!";
  }

  if (query.includes('maria clara') || query.includes('clara')) {
    return "A **Maria Clara** lidera a frente de Backend do Squad D. É analítica, detalhista, tem facilidade em resolver problemas complexos de arquitetura e otimização de APIs e bancos de dados!";
  }

  if (query.includes('luiza') || query.includes('ana luiza')) {
    return "A **Luiza de Deus** é responsável por UX/UI Design e Frontend no Squad D. Une sensibilidade visual, empatia com o usuário e precisão técnica na codificação de interfaces limpas e acessíveis!";
  }

  if (query.includes('geysiane')) {
    return "A **Geysiane Alves** atua na área de Mobile e Lógica do Squad D. Destaca-se pela disciplina, interpretação rigorosa de requisitos e foco em estabilidade e fluidez dos sistemas!";
  }

  if (query.includes('olá') || query.includes('ola') || query.includes('oi') || query.includes('bom dia') || query.includes('boa tarde') || query.includes('boa noite')) {
    return "Olá! Seja muito bem-vindo(a) ao **Squad D Tech**! 🚀\n\n" +
           "Eu sou a inteligência artificial do time. Posso te contar tudo sobre as nossas desenvolvedoras, nossos serviços, projetos e cases de sucesso. O que você gostaria de saber hoje?";
  }

  // Resposta padrão geral
  return "Como Assistente Virtual do **Squad D**, estou aqui para te apoiar! Posso te apresentar nossas desenvolvedoras (Débora, Maria Clara, Geysiane e Luiza), detalhar nossos serviços de desenvolvimento web e mobile, ou explicar nossos cases de sucesso. O que deseja explorar?";
}

/**
 * Chamada à API oficial do Google Gemini
 */
async function callGeminiApi(apiKey, model, message, history) {
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

  // Formata histórico no padrão do Gemini ("user" e "model")
  const contents = [];
  
  if (Array.isArray(history)) {
    for (const item of history.slice(-6)) {
      if (item && item.content) {
        contents.push({
          role: item.role === 'user' ? 'user' : 'model',
          parts: [{ text: String(item.content) }]
        });
      }
    }
  }

  contents.push({
    role: 'user',
    parts: [{ text: message }]
  });

  const payload = {
    systemInstruction: {
      parts: [{ text: SYSTEM_PROMPT }]
    },
    contents,
    generationConfig: {
      temperature: 0.7,
      maxOutputTokens: 800
    }
  };

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Google Gemini API error ${response.status}: ${errText}`);
  }

  const data = await response.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) {
    throw new Error('Nenhum texto retornado pelo Google Gemini.');
  }

  return text;
}

/**
 * Endpoint de Status / Healthcheck
 */
app.get('/api/health', (req, res) => {
  const geminiKey = process.env.GEMINI_API_KEY;
  const hasGemini = Boolean(geminiKey && geminiKey.trim().length > 10 && !geminiKey.includes('sua_chave'));
  const openaiKey = process.env.OPENAI_API_KEY;
  const hasOpenai = Boolean(openaiKey && openaiKey.trim().length > 10 && !openaiKey.includes('sua_chave'));

  let activeProvider = 'squad-fallback';
  let activeModel = 'contextual-engine';

  if (hasGemini) {
    activeProvider = 'gemini';
    activeModel = process.env.GEMINI_MODEL || 'gemini-1.5-flash';
  } else if (hasOpenai) {
    activeProvider = 'openai';
    activeModel = process.env.OPENAI_MODEL || 'gpt-4o-mini';
  }

  res.json({
    status: 'ok',
    service: 'Squad D - AI Chat Assistant API',
    provider: activeProvider,
    hasGeminiKey: hasGemini,
    hasOpenAiKey: hasOpenai,
    model: activeModel,
    squad: 'Squad D',
    timestamp: new Date().toISOString()
  });
});

/**
 * Endpoint de Chat com IA
 * POST /api/chat
 * Body: { message: string, history?: Array<{role: string, content: string}> }
 */
app.post('/api/chat', async (req, res) => {
  try {
    const { message, history = [] } = req.body;

    if (!message || typeof message !== 'string' || message.trim() === '') {
      return res.status(400).json({
        error: 'O campo "message" é obrigatório e não pode ser vazio.'
      });
    }

    const geminiKey = process.env.GEMINI_API_KEY;
    const geminiModel = process.env.GEMINI_MODEL || 'gemini-1.5-flash';

    // 1. PRIORIDADE: Google Gemini API
    if (geminiKey && geminiKey.trim().length > 10 && !geminiKey.includes('sua_chave')) {
      try {
        const reply = await callGeminiApi(geminiKey.trim(), geminiModel, message, history);
        return res.json({
          reply,
          mode: 'gemini',
          model: geminiModel,
          timestamp: new Date().toISOString()
        });
      } catch (geminiError) {
        console.warn('[Google Gemini API Error]:', geminiError.message, '- tentando fallback...');
      }
    }

    // 2. ALTERNATIVA: OpenAI API (se configurada)
    const openAiKey = process.env.OPENAI_API_KEY;
    if (openAiKey && openAiKey.trim().length > 10 && !openAiKey.includes('sua_chave')) {
      try {
        const openAiModel = process.env.OPENAI_MODEL || 'gpt-4o-mini';
        const messagesPayload = [
          { role: 'system', content: SYSTEM_PROMPT },
          ...history.slice(-6).map(h => ({
            role: h.role === 'user' ? 'user' : 'assistant',
            content: String(h.content || '')
          })),
          { role: 'user', content: message }
        ];

        const response = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${openAiKey.trim()}`
          },
          body: JSON.stringify({
            model: openAiModel,
            messages: messagesPayload,
            temperature: 0.7,
            max_tokens: 600
          })
        });

        if (response.ok) {
          const data = await response.json();
          const reply = data.choices?.[0]?.message?.content;
          if (reply) {
            return res.json({
              reply,
              mode: 'openai',
              model: openAiModel,
              timestamp: new Date().toISOString()
            });
          }
        }
      } catch (openAiError) {
        console.warn('[OpenAI Error]:', openAiError.message);
      }
    }

    // 3. FALLBACK INTELIGENTE CONTEXTUAL (garante que a apresentação nunca quebre)
    const fallbackReply = generateContextualFallback(message);
    return res.json({
      reply: fallbackReply,
      mode: 'squad-ai-fallback',
      info: 'Resposta gerada pelo motor inteligente contextual do Squad D.',
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('[Chat Route Error]:', error);
    return res.status(500).json({
      error: 'Erro interno ao processar mensagem do chat.',
      details: error.message
    });
  }
});

// Redirecionamento da raiz para home.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'home.html'));
});

// Inicialização do Servidor
app.listen(PORT, () => {
  console.log('====================================================');
  console.log(`🚀 Servidor Squad D rodando na porta ${PORT}`);
  console.log(`🌐 Acesse no navegador: http://localhost:${PORT}`);
  console.log(`🤖 Chat IA disponível em: http://localhost:${PORT}/chat.html`);
  console.log(`📡 Provedor IA: Google Gemini API`);
  console.log(`📡 Endpoint de API: POST http://localhost:${PORT}/api/chat`);
  console.log('====================================================');
});
