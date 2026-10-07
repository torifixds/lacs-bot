module.exports = {
  name: 'warn',
  description: 'Advertencia a un usuario',
  staffOnly: true,
  async execute(message, args) {
    const member = message.mentions.members.first();
    if (!member) return message.reply('Menciona a un usuario.');
    const reason = args.slice(1).join(' ') || 'Sin motivo';
    message.reply(`⚠️ ${member.user.tag} fue advertido por: **${reason}**`);
  }
};
