const User = require('../../models/User');

module.exports = {
  name: 'addcoins',
  description: 'Da coins a un usuario',
  staffOnly: true,
  async execute(message, args) {
    const member = message.mentions.users.first();
    const amount = Number(args[1]);

    if (!member) return message.reply('Menciona a un usuario.');
    if (!amount) return message.reply('Usa: `!addcoins @usuario <cantidad>`');

    const user = await User.findOneAndUpdate(
      { discordId: member.id },
      { $inc: { balance: amount } },
      { new: true, upsert: true }
    );

    message.reply(`✅ Diste **${amount}** coins a **${member.username}**.`);
  }
};
