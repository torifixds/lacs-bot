const User = require('../../models/User');
const Market = require('../../models/Market');

module.exports = {
  name: 'buy',
  description: 'Compra un item del mercado',
  async execute(message, args) {
    const itemName = args.join(' ');
    if (!itemName) return message.reply('Usa: `!buy <item>`');

    const item = await Market.findOne({ item: new RegExp(itemName, 'i') });
    if (!item) return message.reply('❌ Ese item no existe en el mercado.');

    const user = await User.findOne({ discordId: message.author.id });
    if (!user) return message.reply('Primero debes registrarte con `!register`.');

    if (user.balance < item.price) {
      return message.reply('❌ No tienes suficientes coins para comprar esto.');
    }

    user.balance -= item.price;
    user.inventory.push(item.item);
    await user.save();
    await Market.deleteOne({ _id: item._id });

    message.reply(`✅ Compraste **${item.item}** por **${item.price}** coins.`);
  }
};
