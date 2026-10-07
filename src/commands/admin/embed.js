const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'embed',
  description: 'Crea un embed personalizado',
  ownerOnly: true,
  async execute(message, args) {
    if (!args.length) return message.reply('Uso: `!embed <título|descripción|color>`');

    const embed = new EmbedBuilder()
      .setTitle('Embed Personalizado')
      .setDescription(args.join(' '))
      .setColor('#3498db')
      .setTimestamp();

    message.reply({ embeds: [embed] });
  }
};
