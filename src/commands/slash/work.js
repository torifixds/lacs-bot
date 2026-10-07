const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const User = require('../../models/User');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('work')
    .setDescription('Trabaja para ganar coins'),
  async execute(interaction) {
    const reward = Math.floor(Math.random() * 150) + 50;
    const user = await User.findOne({ discordId: interaction.user.id });

    if (!user) return interaction.reply({
      content: '❌ Primero debes registrarte con `/register`.',
      ephemeral: true
    });

    user.balance += reward;
    await user.save();

    const embed = new EmbedBuilder()
      .setTitle('💼 Trabajo completado')
      .setDescription(`Has trabajado duro y ganaste **${reward}** coins.`)
      .setColor('#3498db');

    interaction.reply({ embeds: [embed], ephemeral: true });
  }
};
