const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const User = require('../../models/User');
const Market = require('../../models/Market');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('buy')
    .setDescription('Compra un item del mercado')
    .addStringOption(option =>
      option.setName('item').setDescription('Nombre del item').setRequired(true)
    ),
  async execute(interaction) {
    const itemName = interaction.options.getString('item');
    const item = await Market.findOne({ item: new RegExp(itemName, 'i') });

    if (!item) return interaction.reply({
      content: '❌ Ese item no existe en el mercado.',
      ephemeral: true
    });

    const user = await User.findOne({ discordId: interaction.user.id });
    if (!user) return interaction.reply({
      content: '❌ Primero debes registrarte con `/register`.',
      ephemeral: true
    });

    if (user.balance < item.price) return interaction.reply({
      content: '❌ No tienes suficientes coins.',
      ephemeral: true
    });

    user.balance -= item.price;
    user.inventory.push(item.item);
    await user.save();
    await Market.deleteOne({ _id: item._id });

    const embed = new EmbedBuilder()
      .setTitle('✅ Compra completada')
      .setDescription(`Compraste **${item.item}** por **${item.price}** coins.`)
      .setColor('#2ecc71');

    interaction.reply({ embeds: [embed], ephemeral: true });
  }
};
