const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const User = require('../../models/User');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('profile')
    .setDescription('Muestra tu perfil')
    .addUserOption(option =>
      option.setName('user').setDescription('Usuario a consultar').setRequired(false)
    ),
  async execute(interaction) {
    const targetUser = interaction.options.getUser('user') || interaction.user;
    const user = await User.findOne({ discordId: targetUser.id });

    if (!user) {
      return interaction.reply({
        content: '❌ Este usuario no está registrado.',
        ephemeral: true
      });
    }

    const embed = new EmbedBuilder()
      .setTitle(`👤 Perfil de ${user.username}`)
      .setColor('#3498db')
      .addFields(
        { name: '💰 Coins', value: `${user.balance}`, inline: true },
        { name: '🏦 Banco', value: `${user.bank}`, inline: true },
        { name: '⭐ Nivel', value: `${user.level}`, inline: true },
        { name: '📊 XP', value: `${user.xp}`, inline: true },
        { name: '🎮 Roblox', value: user.robloxUsername || '❌ No verificado', inline: true },
        { name: '✅ Estado', value: user.verified ? '✅ Verificado' : '❌ No verificado', inline: true },
        { name: '🎒 Inventario', value: user.inventory.length > 0 ? user.inventory.slice(0, 5).join(', ') : 'Vacío', inline: false }
      );

    interaction.reply({ embeds: [embed] });
  }
};
