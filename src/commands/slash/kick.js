const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('kick')
    .setDescription('Expulsa a un usuario')
    .addUserOption(option =>
      option.setName('usuario').setDescription('Usuario a expulsar').setRequired(true)
    )
    .addStringOption(option =>
      option.setName('motivo').setDescription('Motivo de la expulsión').setRequired(false)
    ),
  async execute(interaction) {
    if (!interaction.member.permissions.has('KickMembers')) {
      return interaction.reply({
        content: '❌ No tienes permisos para expulsar.',
        ephemeral: true
      });
    }

    const member = interaction.options.getUser('usuario');
    const reason = interaction.options.getString('motivo') || 'Sin motivo';

    try {
      await interaction.guild.members.kick(member, reason);
      interaction.reply({
        content: `✅ **${member.tag}** ha sido expulsado. Motivo: ${reason}`,
        ephemeral: true
      });
    } catch (error) {
      interaction.reply({
        content: '❌ Error al expulsar al usuario.',
        ephemeral: true
      });
    }
  }
};
