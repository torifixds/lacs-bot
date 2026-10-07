const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  discordId: { type: String, required: true, unique: true },
  username: { type: String, default: 'unknown' },
  robloxUsername: { type: String, default: null },
  robloxId: { type: Number, default: null },
  balance: { type: Number, default: 0 },
  bank: { type: Number, default: 0 },
  inventory: { type: [String], default: [] },
  xp: { type: Number, default: 0 },
  level: { type: Number, default: 1 },
  registered: { type: Boolean, default: false },
  verified: { type: Boolean, default: false },
  dailyClaim: { type: Number, default: 0 },
  role: { type: String, default: 'member' }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
