const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const User = require('../../models/User');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('inventory')
    .setDescription('Muestra tu inventario'),
  async execute(interaction) {
    const user = await User.findOne({ discordId: interaction.user.id });

    if (!user) return interaction.reply({
      content: '❌ Primero debes registrarte con `/register`.',
      ephemeral: true
    });

    const inventory = user.inventory.length > 0 ? user.inventory.join(', ') : 'Vacío';
    
    const embed = new EmbedBuilder()
      .setTitle('🎒 Tu Inventario')
      .setDescription(inventory)
      .setColor('#e74c3c');

    interaction.reply({ embeds: [embed], ephemeral: true });
  }
};
