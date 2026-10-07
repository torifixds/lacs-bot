const User = require('../../models/User');

module.exports = {
  name: 'setroblox',
  description: 'Establece tu nombre de Roblox manualmente',
  async execute(message, args) {
    const username = args[0];
    if (!username) return message.reply('Usa: `!setroblox <nombre>`');

    await User.findOneAndUpdate(
      { discordId: message.author.id },
      { robloxUsername: username },
      { upsert: true, new: true }
    );

    message.reply(`✅ Tu Roblox quedó registrado como **${username}**.`);
  }
};
