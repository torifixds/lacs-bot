const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const User = require('../../models/User');
const { getRobloxUserByName } = require('../../services/robloxService');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('verify')
    .setDescription('Verifica tu cuenta de Roblox')
    .addStringOption(option =>
      option
        .setName('roblox_username')
        .setDescription('Tu nombre de usuario de Roblox')
        .setRequired(true)
    ),
  async execute(interaction) {
    const robloxName = interaction.options.getString('roblox_username');
    const user = await User.findOne({ discordId: interaction.user.id });

    if (!user || !user.registered) {
      return interaction.reply({
        content: '❌ Primero debes registrarte con `/register`.',
        ephemeral: true
      });
    }

    await interaction.deferReply({ ephemeral: true });

    const robloxUser = await getRobloxUserByName(robloxName);

    if (!robloxUser) {
      return interaction.editReply('❌ No encontré ese usuario de Roblox.');
    }

    await User.findOneAndUpdate(
      { discordId: interaction.user.id },
      {
        robloxUsername: robloxUser.name,
        robloxId: robloxUser.id,
        verified: true
      },
      { new: true }
    );

    const nickname = `${robloxUser.name} | ${interaction.user.username}`;
    if (interaction.member.manageable) {
      await interaction.member.setNickname(nickname).catch(() => {});
    }

    const embed = new EmbedBuilder()
      .setTitle('✅ Verificación completada')
      .setDescription(`Tu cuenta de Roblox ha sido vinculada: **${robloxUser.name}**`)
      .setColor('#2ecc71');

    interaction.editReply({ embeds: [embed] });
  }
};
