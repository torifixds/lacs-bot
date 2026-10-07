const User = require('../models/User');

module.exports = {
  name: 'help',
  description: 'Muestra ayuda del bot',
  aliases: ['ayuda', 'h'],
  async execute(message) {
    const embed = {
      color: 0x3498db,
      title: 'Lacs Bot - Ayuda',
      description: 'Comandos principales:',
      fields: [
        { name: '!register', value: 'Registra tu perfil', inline: false },
        { name: '!verify', value: 'Verifica tu cuenta de Roblox', inline: false },
        { name: '!balance', value: 'Muestra tu balance', inline: false },
        { name: '!daily', value: 'Reclama tu premio diario', inline: false },
        { name: '!work', value: 'Trabaja para ganar coins', inline: false },
        { name: '!shop', value: 'Mira el mercado', inline: false },
        { name: '!ticket', value: 'Abre un ticket de soporte', inline: false },
        { name: '!ai <mensaje>', value: 'Habla con la IA', inline: false }
      ]
    };

    message.reply({ embeds: [embed] });
  }
};
