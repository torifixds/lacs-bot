const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const User = require('../../models/User');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('balance')
    .setDescription('Muestra tu saldo actual'),
  async execute(interaction) {
    const user = await User.findOne({ discordId: interaction.user.id }) || await User.create({
      discordId: interaction.user.id,
      username: interaction.user.tag,
      balance: 0,
      inventory: []
    });

    const embed = new EmbedBuilder()
      .setTitle('💰 Tu Balance')
      .setDescription(`**Coins:** ${user.balance}\n**Banco:** ${user.bank}`)
      .setColor('#f1c40f');

    interaction.reply({ embeds: [embed], ephemeral: true });
  }
};
