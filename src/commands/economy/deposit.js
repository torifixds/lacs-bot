const User = require('../../models/User');

module.exports = {
  name: 'withdraw',
  description: 'Retira coins de tu banco',
  async execute(message, args) {
    const amount = Number(args[0]);
    if (!amount || amount <= 0) return message.reply('Especifica una cantidad válida.');

    const user = await User.findOne({ discordId: message.author.id });
    if (!user) return message.reply('Primero regístrate con `!register`.');

    if (user.bank < amount) return message.reply('No tienes suficientes coins en el banco.');

    user.bank -= amount;
    user.balance += amount;
    await user.save();

    message.reply(`✅ Retiraste **${amount}** coins del banco.`);
  }
};
