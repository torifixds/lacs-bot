const User = require('../../models/User');

module.exports = {
  name: 'balance',
  description: 'Muestra el balance del usuario',
  async execute(message) {
    const user = await User.findOne({ discordId: message.author.id }) || await User.create({
      discordId: message.author.id,
      username: message.author.tag,
      balance: 0,
      inventory: []
    });

    message.reply(`💰 Tu saldo es: **${user.balance}** coins.`);
  }
};
