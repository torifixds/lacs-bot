const User = require('../models/User');

module.exports = {
  name: 'leaderboard',
  aliases: ['top', 'ranking'],
  description: 'Muestra el ranking de usuarios',
  async execute(message, args) {
    const topUsers = await User.find().sort({ balance: -1 }).limit(10);

    if (!topUsers.length) {
      return message.reply('No hay usuarios registrados aún.');
    }

    const list = topUsers
      .map((u, i) => `${i + 1}. **${u.username}** - ${u.balance} coins`)
      .join('\n');

    message.reply(`🏆 Top 10 Ranking:\n${list}`);
  }
};
