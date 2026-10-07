module.exports = {
  name: 'ping',
  description: 'Comprueba la latencia del bot',
  async execute(message) {
    const sent = Date.now();
    message.reply('Pong!').then(() => {
      const elapsed = Date.now() - sent;
      message.channel.send(`Latencia: ${elapsed}ms`);
    });
  }
};
