const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const User = require('../../models/User');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('register')
    .setDescription('Registra tu perfil en el bot'),
  async execute(interaction) {
    const existing = await User.findOne({ discordId: interaction.user.id });

    if (existing && existing.registered) {
      return interaction.reply({
        content: '✅ Ya estás registrado.',
        ephemeral: true
      });
    }

    const user = await User.findOneAndUpdate(
      { discordId: interaction.user.id },
      {
        discordId: interaction.user.id,
        username: interaction.user.tag,
        balance: 150,
        registered: true,
        verified: false,
        inventory: []
      },
      { upsert: true, new: true }
    );

    const embed = new EmbedBuilder()
      .setTitle('✅ Registro completado')
      .setDescription(`Bienvenido ${user.username}. Recibiste 150 coins.`)
      .setColor('#2ecc71');

    interaction.reply({ embeds: [embed] });
  }
};
