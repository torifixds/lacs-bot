const User = require('../../models/User');

module.exports = {
  name: 'register',
  description: 'Registra al usuario en la base de datos',
  async execute(message) {
    const existing = await User.findOne({ discordId: message.author.id });

    if (existing && existing.registered) {
      return message.reply('✅ Ya estás registrado.');
    }

    const user = await User.findOneAndUpdate(
      { discordId: message.author.id },
      {
        discordId: message.author.id,
        username: message.author.tag,
        balance: 150,
        registered: true,
        verified: false,
        inventory: []
      },
      { upsert: true, new: true }
    );

    message.reply(`✅ Registro completado. Bienvenido ${user.username}. Recibiste 150 coins.`);
  }
};
