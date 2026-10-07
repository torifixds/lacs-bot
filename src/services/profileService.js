const User = require('../models/User');
const Market = require('../models/Market');

const leaderboard = async (limit = 10) => {
  return User.find().sort({ balance: -1 }).limit(limit);
};

const getProfileEmbed = async (discordId) => {
  const user = await User.findOne({ discordId });
  if (!user) return null;

  return {
    color: 0x3498db,
    title: `Perfil de ${user.username}`,
    fields: [
      { name: 'Coins', value: `${user.balance}`, inline: true },
      { name: 'Banco', value: `${user.bank}`, inline: true },
      { name: 'Nivel', value: `${user.level}`, inline: true },
      { name: 'XP', value: `${user.xp}`, inline: true },
      { name: 'Roblox', value: user.robloxUsername || 'No verificado', inline: true },
      { name: 'Estado', value: user.verified ? '✅ Verificado' : '❌ No verificado', inline: true },
      { name: 'Inventario', value: user.inventory.length > 0 ? user.inventory.slice(0, 5).join(', ') : 'Vacío', inline: false }
    ]
  };
};

module.exports = { leaderboard, getProfileEmbed };
