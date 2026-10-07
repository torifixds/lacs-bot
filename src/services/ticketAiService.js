const User = require('../models/User');
const { generateAiReply } = require('./aiService');

const ticketContexts = new Map();

async function handleTicketMessage(message, ticketChannelId) {
  if (!ticketContexts.has(ticketChannelId)) {
    ticketContexts.set(ticketChannelId, []);
  }

  const context = ticketContexts.get(ticketChannelId);
  context.push({ role: 'user', content: message.content });

  if (context.length > 10) context.shift();

  const prompt = `Eres un agente de soporte técnico amable y profesional para Lacs Bot. Responde brevemente y sé útil.\n\nPregunta: ${message.content}`;
  const aiResponse = await generateAiReply(prompt);

  return aiResponse;
}

module.exports = { handleTicketMessage, ticketContexts };
