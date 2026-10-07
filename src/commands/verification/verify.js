const User = require('../../models/User');
const { getRobloxUserByName } = require('../../services/robloxService');

module.exports = {
  name: 'verify',
  description: 'Verifica la cuenta de Roblox del usuario',
  async execute(message) {
    const user = await User.findOne({ discordId: message.author.id });

    if (!user || !user.registered) {
      return message.reply('❌ Primero debes registrarte con `!register`.');
    }

    message.reply('Escribe tu nombre de Roblox para validarte.');

    const filter = (msg) => msg.author.id === message.author.id;
    const collector = message.channel.createMessageCollector({ filter, time: 60000, max: 1 });

    collector.on('collect', async (msg) => {
      const robloxName = msg.content.trim();
      const robloxUser = await getRobloxUserByName(robloxName);

      if (!robloxUser) {
        return message.reply('❌ No encontré ese usuario de Roblox.');
      }

      await User.findOneAndUpdate(
        { discordId: message.author.id },
        {
          robloxUsername: robloxUser.name,
          robloxId: robloxUser.id,
          verified: true
        },
        { new: true }
      );

      const nickname = `${robloxUser.name} | ${message.author.username}`;
      if (message.member.manageable) {
        await message.member.setNickname(nickname).catch(() => {});
      }

      message.reply(`✅ Verificación completada. Roblox: **${robloxUser.name}**`);
    });
  }
};
