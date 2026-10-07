module.exports = {
  name: 'slowmode',
  description: 'Establece modo lento en el canal',
  staffOnly: true,
  async execute(message, args) {
    const seconds = Number(args[0]) || 5;
    await message.channel.setRateLimitPerUser(seconds);
    message.reply(`✅ Modo lento establecido a **${seconds}** segundos.`);
  }
};
