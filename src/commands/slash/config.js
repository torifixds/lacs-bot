const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('config')
    .setDescription('[ADMIN] Ver configuración actual del bot'),
  async execute(interaction) {
    if (!interaction.member.permissions.has('Administrator')) {
      return interaction.reply({
        content: '❌ Solo administradores pueden usar este comando.',
        ephemeral: true
      });
    }

    const config = require('../../config');

    const embed = new EmbedBuilder()
      .setTitle('⚙️ Configuración del Bot')
      .setColor('#3498db')
      .addFields(
        { name: '📌 Prefijo', value: config.prefix, inline: true },
        { name: '🆔 Guild ID', value: config.guildId || 'No configurado', inline: true },
        { name: '👑 Owner ID', value: config.ownerId || 'No configurado', inline: true },
        { name: '📢 Canal de Verificación', value: `<#${config.channels.verification}>` || 'No configurado', inline: false },
        { name: '🎫 Canal de Tickets', value: `<#${config.channels.tickets}>` || 'No configurado', inline: false },
        { name: '📋 Canal de Logs', value: `<#${config.channels.logs}>` || 'No configurado', inline: false }
      );

    interaction.reply({ embeds: [embed], ephemeral: true });
  }
};
