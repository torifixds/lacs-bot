const User = require('../../models/User');

module.exports = {
  name: 'transfer',
  description: 'Transfiere coins a otro usuario',
  async execute(message, args) {
    const recipient = message.mentions.users.first();
    const amount = Number(args[1]);

    if (!recipient) return message.reply('Menciona a un usuario.');
    if (!amount || amount <= 0) return message.reply('Especifica una cantidad válida.');

    const sender = await User.findOne({ discordId: message.author.id });
    const receiver = await User.findOne({ discordId: recipient.id });

    if (!sender || !receiver) return message.reply('Uno de los usuarios no está registrado.');
    if (sender.balance < amount) return message.reply('No tienes suficientes coins.');

    sender.balance -= amount;
    receiver.balance += amount;

    await sender.save();
    await receiver.save();

    message.reply(`✅ Transferiste **${amount}** coins a **${recipient.username}**.`);
  }
};
