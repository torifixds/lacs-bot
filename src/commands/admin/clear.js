module.exports = {
  name: 'clear',
  description: 'Elimina mensajes de un canal',
  staffOnly: true,
  async execute(message, args) {
    const amount = Number(args[0]) || 10;
    const deleted = await message.channel.bulkDelete(Math.min(amount, 50), true);
    message.reply(`✅ Se eliminaron ${deleted.size} mensajes.`);
  }
};
