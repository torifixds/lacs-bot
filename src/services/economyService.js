const User = require('../models/User');

async function getOrCreateUser(discordId, username) {
  let user = await User.findOne({ discordId });

  if (!user) {
    user = await User.create({
      discordId,
      username,
      balance: 100,
      bank: 0,
      inventory: [],
      registered: true,
      verified: false,
      xp: 0,
      level: 1
    });
  }

  return user;
}

async function addCoins(discordId, amount) {
  const user = await getOrCreateUser(discordId, 'unknown');
  user.balance += Number(amount || 0);
  await user.save();
  return user;
}

async function removeCoins(discordId, amount) {
  const user = await getOrCreateUser(discordId, 'unknown');
  user.balance = Math.max(0, user.balance - Number(amount || 0));
  await user.save();
  return user;
}

module.exports = { getOrCreateUser, addCoins, removeCoins };
