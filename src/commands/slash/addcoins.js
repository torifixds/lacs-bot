const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const User = require('../../models/User');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('addcoins')
    .setDescription('[ADMIN] Da coins a un usuario')
    .addUserOption(option =>
      option.setName('usuario').setDescription('Usuario a dar coins').setRequired(true)
    )
    .addNumberOption(option =>
      option.setName('cantidad').setDescription('Cantidad de coins').setRequired(true).setMinValue(1)
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
      { $inc: { balance: amount } },
      { new: true, upsert: true }
    );

    const embed = new EmbedBuilder()
      .setTitle('✅ Coins Agregados')
      .setDescription(`Diste **${amount}** coins a **${member.username}**. Nuevo saldo: ${user.balance}`)
      .setColor('#2ecc71');

    interaction.reply({ embeds: [embed], ephemeral: true });
  }
};
