const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const User = require('../../models/User');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('transfer')
    .setDescription('Transfiere coins a otro usuario')
    .addUserOption(option =>
      option.setName('usuario').setDescription('Usuario a transferir').setRequired(true)
    )
    .addNumberOption(option =>
      option.setName('cantidad').setDescription('Cantidad de coins').setRequired(true).setMinValue(1)
    ),
  async execute(interaction) {
    const recipient = interaction.options.getUser('usuario');
    const amount = interaction.options.getNumber('cantidad');

    const sender = await User.findOne({ discordId: interaction.user.id });
    const receiver = await User.findOne({ discordId: recipient.id });

    if (!sender || !receiver) return interaction.reply({
      content: '❌ Uno de los usuarios no está registrado.',
      ephemeral: true
    });

    if (sender.balance < amount) return interaction.reply({
      content: '❌ No tienes suficientes coins.',
      ephemeral: true
    });

    sender.balance -= amount;
    receiver.balance += amount;

    await sender.save();
    await receiver.save();

    const embed = new EmbedBuilder()
      .setTitle('✅ Transferencia completada')
      .setDescription(`Transferiste **${amount}** coins a **${recipient.username}**.`)
      .setColor('#2ecc71');

    interaction.reply({ embeds: [embed], ephemeral: true });
  }
};
