const User = require('../../models/User');

module.exports = {
  name: 'resetuser',
  description: 'Resetea el perfil de un usuario',
  ownerOnly: true,
  async execute(message, args) {
    const member = message.mentions.users.first();
    if (!member) return message.reply('Menciona a un usuario.');

    await User.findOneAndUpdate(
      { discordId: member.id },
      {
        balance: 0,
        bank: 0,
        inventory: [],
        xp: 0,
        level: 1,
        verified: false
      },
      { upsert: true, new: true }
    );

    message.reply(`✅ Perfil de **${member.username}** fue reseteado.`);
  }
};
