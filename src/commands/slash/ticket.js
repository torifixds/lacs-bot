const { SlashCommandBuilder, ChannelType, EmbedBuilder } = require('discord.js');
const Ticket = require('../../models/Ticket');
const { createTicket } = require('../../services/ticketService');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ticket')
    .setDescription('Abre un ticket de soporte')
    .addStringOption(option =>
      option.setName('motivo').setDescription('Motivo del ticket').setRequired(true)
    ),
  async execute(interaction) {
    const topic = interaction.options.getString('motivo');

    const ticketName = `ticket-${interaction.user.id}`;
    const channel = await interaction.guild.channels.create({
      name: ticketName,
      type: ChannelType.GuildText,
      permissionOverwrites: [
        { id: interaction.guild.id, deny: ['ViewChannel'] },
        { id: interaction.user.id, allow: ['ViewChannel', 'SendMessages', 'ReadMessageHistory'] }
      ]
    });

    await createTicket({
      guildId: interaction.guild.id,
      channelId: channel.id,
      creatorId: interaction.user.id,
      topic
    });

    const embed = new EmbedBuilder()
      .setTitle('🎫 Ticket Abierto')
      .setDescription(`**Tema:** ${topic}\n\nEscribe aquí tu problema y un staff te atenderá pronto.`)
      .setColor('#3498db');

    await channel.send({ embeds: [embed] });
    interaction.reply({
      content: `✅ Ticket abierto: ${channel}`,
      ephemeral: true
    });
  }
};
