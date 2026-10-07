const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const User = require('../../models/User');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('leaderboard')
    .setDescription('Muestra el ranking de usuarios'),
  async execute(interaction) {
    const topUsers = await User.find().sort({ balance: -1 }).limit(10);

    if (!topUsers.length) {
      return interaction.reply({
        content: '❌ No hay usuarios registrados aún.',
        ephemeral: true
      });
    }

    const list = topUsers
      .map((u, i) => `${i + 1}. **${u.username}** - ${u.balance} coins`)
      .join('\n');

    const embed = new EmbedBuilder()
      .setTitle('🏆 Top 10 Ranking')
      .setDescription(list)
      .setColor('#f39c12');

    interaction.reply({ embeds: [embed] });
  }
};
