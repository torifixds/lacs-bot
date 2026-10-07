const User = require('../../models/User');

module.exports = {
  name: 'gamble',
  description: 'Juega a los dados y gana/pierde coins',
  async execute(message, args) {
    const amount = Number(args[0]);
    if (!amount || amount <= 0) return message.reply('Especifica una cantidad válida.');

    const user = await User.findOne({ discordId: message.author.id });
    if (!user) return message.reply('Primero regístrate con `!register`.');
    if (user.balance < amount) return message.reply('No tienes suficientes coins.');

    const roll = Math.floor(Math.random() * 100);
    const won = roll > 50;

    if (won) {
      user.balance += amount;
      await user.save();
      message.reply(`🎲 ¡Ganaste! Tiraste ${roll}. +**${amount}** coins.`);
    } else {
      user.balance -= amount;
      await user.save();
      message.reply(`🎲 Perdiste. Tiraste ${roll}. -**${amount}** coins.`);
    }
  }
};
