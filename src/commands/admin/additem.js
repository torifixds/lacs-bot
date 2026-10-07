const User = require('../../models/User');
const Market = require('../../models/Market');

module.exports = {
  name: 'additem',
  description: 'Agrega un item al mercado',
  staffOnly: true,
  async execute(message, args) {
    const itemName = args.slice(0, -1).join(' ');
    const price = Number(args[args.length - 1]);

    if (!itemName || !price) return message.reply('Usa: `!additem <nombre> <precio>`');

    await Market.create({
      item: itemName,
      price,
      sellerId: message.author.id,
      description: 'Item oficial del servidor'
    });

    message.reply(`✅ Item **${itemName}** agregado al mercado por **${price}** coins.`);
  }
};
