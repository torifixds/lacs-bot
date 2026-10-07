const User = require('../../models/User');

module.exports = {
  name: 'setlevel',
  description: 'Establece el nivel de un usuario',
  ownerOnly: true,
  async execute(message, args) {
    const member = message.mentions.users.first();
    const level = Number(args[1]);

    if (!member || !level) return message.reply('Usa: `!setlevel @usuario <nivel>`');

    await User.findOneAndUpdate(
      { discordId: member.id },
      { level },
      { upsert: true, new: true }
    );

    message.reply(`✅ Nivel de **${member.username}** establecido a **${level}**.`);
  }
};
