const User = require('../../models/User');

module.exports = {
  name: 'profile',
  aliases: ['perfil', 'stats'],
  description: 'Muestra tu perfil',
  async execute(message) {
    const user = await User.findOne({ discordId: message.author.id });
    if (!user) return message.reply('Primero regístrate con `!register`.');

    const embed = {
      color: 0x3498db,
      title: `👤 Perfil de ${user.username}`,
      fields: [
        { name: '💰 Coins', value: `${user.balance}`, inline: true },
        { name: '🏦 Banco', value: `${user.bank}`, inline: true },
        { name: '⭐ Nivel', value: `${user.level}`, inline: true },
        { name: '📊 XP', value: `${user.xp}`, inline: true },
        { name: '🎮 Roblox', value: user.robloxUsername || '❌ No verificado', inline: true },
        { name: '✅ Estado', value: user.verified ? '✅ Verificado' : '❌ No verificado', inline: true },
        { name: '🎒 Inventario', value: user.inventory.length > 0 ? user.inventory.slice(0, 5).join(', ') : 'Vacío', inline: false }
      ]
    };

    message.reply({ embeds: [embed] });
  }
};
