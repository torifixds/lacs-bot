const Ticket = require('../../models/Ticket');

module.exports = {
  name: 'close',
  aliases: ['cerrar'],
  description: 'Cierra un ticket',
  staffOnly: true,
  async execute(message) {
    if (!message.channel.name.startsWith('ticket-')) {
      return message.reply('❌ Este canal no es un ticket.');
    }

    await Ticket.findOneAndUpdate({ channelId: message.channel.id }, { status: 'closed' }, { new: true });
    message.reply('✅ Ticket cerrado. Se eliminará en 5 segundos.');

    setTimeout(() => {
      message.channel.delete().catch(() => {});
    }, 5000);
  }
};
