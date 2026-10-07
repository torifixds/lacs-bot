module.exports = {
  name: 'mute',
  description: 'Silencia a un usuario',
  staffOnly: true,
  async execute(message, args) {
    const member = message.mentions.members.first();
    if (!member) return message.reply('Menciona a un usuario.');

    const muteRole = message.guild.roles.cache.find(r => r.name.toLowerCase() === 'muted');
    if (!muteRole) return message.reply('No existe el rol "Muted".');

    await member.roles.add(muteRole);
    message.reply(`🔇 ${member.user.tag} ha sido silenciado.`);
  }
};
