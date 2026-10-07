const User = require('../../models/User');

module.exports = {
  name: 'trivia',
  description: 'Juega trivia y gana coins',
  async execute(message, args) {
    const trivias = [
      { q: '¿Cuál es la capital de Francia?', a: 'paris' },
      { q: '¿Cuál es el planeta más grande del sistema solar?', a: 'jupiter' },
      { q: '¿En qué año llegó el hombre a la luna?', a: '1969' },
      { q: '¿Cuál es el país más poblado del mundo?', a: 'china' }
    ];

    const trivia = trivias[Math.floor(Math.random() * trivias.length)];
    message.reply(`❓ ${trivia.q}\n\nResponde en 30 segundos...`);

    const filter = m => m.author.id === message.author.id;
    const collector = message.channel.createMessageCollector({ filter, time: 30000, max: 1 });

    collector.on('collect', async (msg) => {
      const correct = msg.content.toLowerCase().includes(trivia.a.toLowerCase());
      if (correct) {
        const user = await User.findOne({ discordId: message.author.id });
        if (user) {
          user.balance += 50;
          await user.save();
          message.reply('✅ ¡Correcto! +50 coins.');
        }
      } else {
        message.reply(`❌ Incorrecto. La respuesta era: **${trivia.a}**.`);
      }
    });
  }
};
