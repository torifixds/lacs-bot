const { generateAiReply } = require('../../services/aiService');
const Ticket = require('../../models/Ticket');
const { handleTicketMessage } = require('../../services/ticketAiService');

module.exports = {
  name: 'ticketresponse',
  aliases: ['treply'],
  description: 'Responde con IA en un ticket',
  async execute(message, args) {
    if (!message.channel.name.startsWith('ticket-')) {
      return message.reply('Este comando solo funciona en tickets.');
    }

    const aiResponse = await handleTicketMessage(message, message.channel.id);
    message.reply(`🤖 ${aiResponse}`);
  }
};
