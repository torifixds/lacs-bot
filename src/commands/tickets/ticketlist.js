const { ChannelType } = require('discord.js');
const Ticket = require('../../models/Ticket');

module.exports = {
  name: 'ticketlist',
  aliases: ['tickets'],
  description: 'Lista todos los tickets abiertos',
  staffOnly: true,
  async execute(message) {
    const tickets = await Ticket.find({ guildId: message.guild.id, status: 'open' });

    if (!tickets.length) {
      return message.reply('No hay tickets abiertos.');
    }

    const list = tickets.map(t => `- **${t.topic}** | <@${t.creatorId}> | Canal: <#${t.channelId}>`).join('\n');
    message.reply(`🎫 Tickets abiertos:\n${list}`);
  }
};
