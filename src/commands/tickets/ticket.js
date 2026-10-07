const { createTicket, closeTicket } = require('../../services/ticketService');

module.exports = {
  name: 'ticket',
  description: 'Abre un ticket de soporte',
  async execute(message, args) {
    const topic = args.join(' ') || 'Sin asunto';

    const ticketName = `ticket-${message.author.id}`;
    const channel = await message.guild.channels.create({
      name: ticketName,
      type: 0,
      permissionOverwrites: [
        { id: message.guild.id, deny: ['ViewChannel'] },
        { id: message.author.id, allow: ['ViewChannel', 'SendMessages', 'ReadMessageHistory'] }
      ]
    });

    await createTicket({
      guildId: message.guild.id,
      channelId: channel.id,
      creatorId: message.author.id,
      topic
    });

    await channel.send(`🎫 Ticket abierto por <@${message.author.id}>\nTema: **${topic}**\nEscribe aquí tu problema y un staff te atenderá.`);
    message.reply(`✅ Ticket abierto: ${channel}`);
  }
};
