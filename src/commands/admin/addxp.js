const User = require('../../models/User');

module.exports = {
  name: 'addxp',
  description: 'Agrega XP a un usuario',
  staffOnly: true,
  async execute(message, args) {
    const member = message.mentions.users.first();
    const xp = Number(args[1]);

    if (!member || !xp) return message.reply('Usa: `!addxp @usuario <cantidad>`');

    const user = await User.findOneAndUpdate(
      { discordId: member.id },
      { $inc: { xp } },
      { new: true, upsert: true }
    );

    if (user.xp >= user.level * 100) {
      user.level += 1;
      user.xp = 0;
      await user.save();
      message.reply(`🎉 **${member.username}** subió a nivel **${user.level}**!`);
    } else {
      message.reply(`✅ Agregaste **${xp}** XP a **${member.username}**.`);
    }
  }
};
