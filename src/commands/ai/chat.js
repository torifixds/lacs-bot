const { generateAiReply } = require('../../services/aiService');

module.exports = {
  name: 'ai',
  description: 'Habla con la IA del bot',
  aliases: ['chatgpt', 'ia'],
  async execute(message, args) {
    const prompt = args.join(' ');
    if (!prompt) return message.reply('Escribe tu pregunta: `!ai <mensaje>`');

    message.reply('🤖 Estoy pensando...');
    const response = await generateAiReply(prompt);
    message.reply(response);
  }
};
