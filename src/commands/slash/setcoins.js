const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const User = require('../../models/User');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('setcoins')
    .setDescription('[ADMIN] Establece los coins de un usuario')
    .addUserOption(option =>
      option.setName('usuario').setDescription('Usuario').setRequired(true)
    )
    .addNumberOption(option =>
      option.setName('cantidad').setDescription('Cantidad de coins').setRequired(true).setMinValue(0)
    ),
  async execute(interaction) {
    if (!interaction.member.permissions.has('Administrator')) {
      return interaction.reply({
        content: '❌ Solo administradores pueden usar este comando.',
        ephemeral: true
      });
    }

    const member = interaction.options.getUser('usuario');
    const amount = interaction.options.getNumber('cantidad');

    const user = await User.findOneAndUpdate(
      { discordId: member.id },
      { balance: amount },
      { new: true, upsert: true }
    );

    const embed = new EmbedBuilder()
      .setTitle('✅ Coins Actualizados')
      .setDescription(`Estableciste **${amount}** coins a **${member.username}**.`)
      .setColor('#2ecc71');

    interaction.reply({ embeds: [embed], ephemeral: true });
  }
};
