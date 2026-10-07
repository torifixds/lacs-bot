const User = require('../../models/User');

module.exports = {
  name: 'work',
  description: 'Trabaja para ganar coins',
  async execute(message) {
    const reward = Math.floor(Math.random() * 150) + 50;
    const user = await User.findOne({ discordId: message.author.id });

    if (!user) return message.reply('Primero debes registrarte con `!register`.');

    user.balance += reward;
    await user.save();

    message.reply(`💼 Trabajaste duro y ganaste **${reward}** coins.`);
  }
};
