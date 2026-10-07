const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const User = require('../../models/User');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('addxp')
    .setDescription('[ADMIN] Agrega XP a un usuario')
    .addUserOption(option =>
      option.setName('usuario').setDescription('Usuario').setRequired(true)
    )
    .addNumberOption(option =>
      option.setName('cantidad').setDescription('Cantidad de XP').setRequired(true).setMinValue(1)
    ),
  async execute(interaction) {
    if (!interaction.member.permissions.has('Administrator')) {
      return interaction.reply({
        content: '❌ Solo administradores pueden usar este comando.',
        ephemeral: true
      });
    }

    const member = interaction.options.getUser('usuario');
    const xp = interaction.options.getNumber('cantidad');

    const user = await User.findOneAndUpdate(
      { discordId: member.id },
      { $inc: { xp } },
      { new: true, upsert: true }
    );

    if (user.xp >= user.level * 100) {
      user.level += 1;
      user.xp = 0;
      await user.save();

      const embed = new EmbedBuilder()
        .setTitle('🎉 ¡Subida de Nivel!')
        .setDescription(`**${member.username}** subió a nivel **${user.level}**!`)
        .setColor('#f39c12');

      interaction.reply({ embeds: [embed], ephemeral: true });
    } else {
      const embed = new EmbedBuilder()
        .setTitle('✅ XP Agregado')
        .setDescription(`Agregaste **${xp}** XP a **${member.username}**. XP actual: ${user.xp}/${user.level * 100}`)
        .setColor('#2ecc71');

      interaction.reply({ embeds: [embed], ephemeral: true });
    }
  }
};
