const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('clear')
    .setDescription('Elimina mensajes del canal')
    .addNumberOption(option =>
      option.setName('cantidad').setDescription('Cantidad de mensajes').setRequired(true).setMinValue(1).setMaxValue(100)
    ),
  async execute(interaction) {
    if (!interaction.member.permissions.has('ManageMessages')) {
      return interaction.reply({
        content: '❌ No tienes permisos para eliminar mensajes.',
        ephemeral: true
      });
    }

    const amount = interaction.options.getNumber('cantidad');

    try {
      const deleted = await interaction.channel.bulkDelete(amount, true);
      interaction.reply({
        content: `✅ Se eliminaron ${deleted.size} mensajes.`,
        ephemeral: true
      });
    } catch (error) {
      interaction.reply({
        content: '❌ Error al eliminar mensajes.',
        ephemeral: true
      });
    }
  }
};
