const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const User = require('../../models/User');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('shop')
    .setDescription('Ver el mercado del servidor'),
  async execute(interaction) {
    const Market = require('../../models/Market');
    const items = await Market.find().limit(10);

    if (!items.length) {
      return interaction.reply({
        content: '🛒 El mercado está vacío por ahora.',
        ephemeral: true
      });
    }

    const list = items.map((item, i) => `${i + 1}. **${item.item}** - ${item.price} coins`).join('\n');
    
    const embed = new EmbedBuilder()
      .setTitle('🛒 Mercado')
      .setDescription(list)
      .setColor('#9b59b6');

    interaction.reply({ embeds: [embed] });
  }
};
