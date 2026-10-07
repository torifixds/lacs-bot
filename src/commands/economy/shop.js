const Market = require('../../models/Market');

module.exports = {
  name: 'shop',
  description: 'Muestra el mercado del servidor',
  async execute(message) {
    const items = await Market.find();

    if (!items.length) {
      return message.reply('🛒 El mercado está vacío por ahora.');
    }

    const list = items.map(item => `- **${item.item}** | ${item.price} coins | Vendedor: <@${item.sellerId}>`).join('\n');
    message.reply(`🛒 Mercado actual:\n${list}`);
  }
};
