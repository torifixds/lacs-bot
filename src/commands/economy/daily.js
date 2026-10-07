const User = require('../../models/User');

module.exports = {
  name: 'daily',
  description: 'Reclama el premio diario',
  async execute(message) {
    const user = await User.findOne({ discordId: message.author.id });
    if (!user) return message.reply('Primero debes registrarte con `!register`.');

    const now = Date.now();
    const cooldown = 24 * 60 * 60 * 1000;

    if (user.dailyClaim && now - user.dailyClaim < cooldown) {
      return message.reply('❌ Ya reclamas tu diaro hoy. Inténtalo más tarde.');
    }

    user.balance += 200;
    user.dailyClaim = now;
    await user.save();

    message.reply('🎁 ¡Has reclamado tu recompensa diaria! +200 coins.');
  }
};
