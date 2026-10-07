const Market = require('../../models/Market');
const User = require('../../models/User');

module.exports = {
  name: 'sell',
  description: 'Vende un objeto del inventario al mercado',
  async execute(message, args) {
    const itemName = args.join(' ');
    if (!itemName) return message.reply('Usa: `!sell <item>`');

    const user = await User.findOne({ discordId: message.author.id });
    if (!user) return message.reply('Primero debes registrarte con `!register`.');

    const index = user.inventory.findIndex(item => item.toLowerCase() === itemName.toLowerCase());
    if (index === -1) return message.reply('❌ No tienes ese item en tu inventario.');

    const item = user.inventory.splice(index, 1)[0];
    const price = Number(args[1]) || 100;

    await Market.create({
      item,
      price,
      sellerId: message.author.id,
      description: 'Venta de item del inventario'
    });

    await user.save();
    message.reply(`✅ Vendiste **${item}** por **${price}** coins en el mercado.`);
  }
};
