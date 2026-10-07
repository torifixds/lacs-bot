const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const Ticket = require('../../models/Ticket');
const config = require('../../config');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('close')
    .setDescription('Cierra un ticket'),
  async execute(interaction) {
    if (!interaction.channel.name.startsWith('ticket-')) {
      return interaction.reply({
        content: '❌ Este comando solo funciona en tickets.',
        ephemeral: true
      });
    }

    await Ticket.findOneAndUpdate(
      { channelId: interaction.channel.id },
      { status: 'closed' },
      { new: true }
    );

    const embed = new EmbedBuilder()
      .setTitle('✅ Ticket Cerrado')
      .setDescription('El ticket será eliminado en 5 segundos.')
      .setColor('#2ecc71');

    await interaction.reply({ embeds: [embed] });

    setTimeout(() => {
      interaction.channel.delete().catch(() => {});
    }, 5000);
  }
};
