const Ticket = require('../../models/Ticket');

module.exports = {
  name: 'add',
  description: 'Agrega a alguien a un ticket',
  async execute(message, args) {
    if (!message.channel.name.startsWith('ticket-')) {
      return message.reply('Este comando solo funciona en tickets.');
    }

    const member = message.mentions.members.first();
    if (!member) return message.reply('Menciona a alguien.');

    await message.channel.permissionOverwrites.create(member, {
      ViewChannel: true,
      SendMessages: true
    });

    message.reply(`✅ ${member.user.tag} ha sido agregado al ticket.`);
  }
};
