const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Muestra los comandos disponibles'),
  async execute(interaction) {
    const embed = new EmbedBuilder()
      .setTitle('📚 Ayuda - Comandos')
      .setColor('#3498db')
      .addFields(
        { name: '👤 Perfil', value: '`/register` `/verify` `/profile` `/leaderboard`', inline: false },
        { name: '💰 Economía', value: '`/balance` `/daily` `/work` `/transfer` `/deposit` `/withdraw` `/shop` `/buy` `/inventory` `/gamble`', inline: false },
        { name: '🤖 IA', value: '`/ai` - Habla con la inteligencia artificial', inline: false },
        { name: '🎫 Tickets', value: '`/ticket` `/close`', inline: false },
        { name: '⚙️ Admin', value: '`/ban` `/kick` `/clear` `/addcoins` `/setcoins` `/addxp` `/config`', inline: false }
      );

    interaction.reply({ embeds: [embed], ephemeral: true });
  }
};
