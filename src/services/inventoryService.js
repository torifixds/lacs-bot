const User = require('../models/User');

async function getInventory(discordId) {
  const user = await User.findOne({ discordId });
  return user?.inventory || [];
}

async function addItem(discordId, itemName) {
  const user = await User.findOne({ discordId });
  if (!user) return null;
  user.inventory.push(itemName);
  await user.save();
  return user;
}

module.exports = { getInventory, addItem };
