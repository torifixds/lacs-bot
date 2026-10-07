const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { generateAiReply } = require('../../services/aiService');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ai')
    .setDescription('Habla con la IA')
    .addStringOption(option =>
      option.setName('mensaje').setDescription('Tu mensaje para la IA').setRequired(true)
    ),
  async execute(interaction) {
    const prompt = interaction.options.getString('mensaje');

    await interaction.deferReply();

    const response = await generateAiReply(prompt);
    
    const embed = new EmbedBuilder()
      .setTitle('🤖 Respuesta de IA')
      .setDescription(response)
      .setColor('#3498db');

    interaction.editReply({ embeds: [embed] });
  }
};
