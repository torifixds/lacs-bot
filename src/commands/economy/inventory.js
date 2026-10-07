const User = require('../../models/User');

module.exports = {
  name: 'inventory',
  description: 'Muestra tu inventario',
  async execute(message) {
    const user = await User.findOne({ discordId: message.author.id });
    if (!user) return message.reply('Primero debes registrarte con `!register`.');

    const inventory = user.inventory.length ? user.inventory.join(', ') : 'Vacío';
    message.reply(`🎒 Inventario: ${inventory}`);
  }
};
