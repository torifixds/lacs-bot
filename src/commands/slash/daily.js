const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const User = require('../../models/User');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('daily')
    .setDescription('Reclama tu recompensa diaria'),
  async execute(interaction) {
    const user = await User.findOne({ discordId: interaction.user.id });
    if (!user) return interaction.reply({
      content: '❌ Primero debes registrarte con `/register`.',
      ephemeral: true
    });

    const now = Date.now();
    const cooldown = 24 * 60 * 60 * 1000;

    if (user.dailyClaim && now - user.dailyClaim < cooldown) {
      return interaction.reply({
        content: '❌ Ya reclamaste tu diario hoy. Intenta más tarde.',
        ephemeral: true
      });
    }

    user.balance += 200;
    user.dailyClaim = now;
    await user.save();

    const embed = new EmbedBuilder()
      .setTitle('🎁 Recompensa Diaria')
      .setDescription('¡Has reclamado tu recompensa diaria! +200 coins.')
      .setColor('#2ecc71');

    interaction.reply({ embeds: [embed], ephemeral: true });
  }
};
