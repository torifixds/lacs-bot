module.exports = {
  name: 'ban',
  description: 'Banea a un usuario',
  staffOnly: true,
  async execute(message, args) {
    const member = message.mentions.members.first();
    if (!member) return message.reply('Menciona a un usuario.');
    await member.ban({ reason: args.slice(1).join(' ') || 'Sin motivo' });
    message.reply(`✅ ${member.user.tag} ha sido baneado.`);
  }
};
