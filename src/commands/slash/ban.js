const { SlashCommandBuilder } = require('discord.js');
const config = require('../../config');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ban')
    .setDescription('Banea a un usuario')
    .addUserOption(option =>
      option.setName('usuario').setDescription('Usuario a banear').setRequired(true)
    )
    .addStringOption(option =>
      option.setName('motivo').setDescription('Motivo del ban').setRequired(false)
    ),
  async execute(interaction) {
    if (!interaction.member.permissions.has('BanMembers')) {
      return interaction.reply({
        content: '❌ No tienes permisos para banear.',
        ephemeral: true
      });
    }

    const member = interaction.options.getUser('usuario');
    const reason = interaction.options.getString('motivo') || 'Sin motivo';

    try {
      await interaction.guild.members.ban(member, { reason });
      interaction.reply({
        content: `✅ **${member.tag}** ha sido baneado. Motivo: ${reason}`,
        ephemeral: true
      });
    } catch (error) {
      interaction.reply({
        content: '❌ Error al banear al usuario.',
        ephemeral: true
      });
    }
  }
};
