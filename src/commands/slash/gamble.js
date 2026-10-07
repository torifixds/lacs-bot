const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const User = require('../../models/User');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('gamble')
    .setDescription('Juega a los dados y gana o pierde coins')
    .addNumberOption(option =>
      option.setName('cantidad').setDescription('Cantidad de coins').setRequired(true).setMinValue(1)
    ),
  async execute(interaction) {
    const amount = interaction.options.getNumber('cantidad');
    const user = await User.findOne({ discordId: interaction.user.id });

    if (!user) return interaction.reply({
      content: '❌ Primero debes registrarte con `/register`.',
      ephemeral: true
    });

    if (user.balance < amount) return interaction.reply({
      content: '❌ No tienes suficientes coins.',
      ephemeral: true
    });

    const roll = Math.floor(Math.random() * 100);
    const won = roll > 50;

    if (won) {
      user.balance += amount;
      await user.save();
      const embed = new EmbedBuilder()
        .setTitle('🎲 ¡Ganaste!')
        .setDescription(`Tiraste ${roll}. +**${amount}** coins.`)
        .setColor('#2ecc71');
      interaction.reply({ embeds: [embed], ephemeral: true });
    } else {
      user.balance -= amount;
      await user.save();
      const embed = new EmbedBuilder()
        .setTitle('🎲 Perdiste')
        .setDescription(`Tiraste ${roll}. -**${amount}** coins.`)
        .setColor('#e74c3c');
      interaction.reply({ embeds: [embed], ephemeral: true });
    }
  }
};
