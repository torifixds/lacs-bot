const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  prefix: process.env.PREFIX || '!',
  ownerId: process.env.OWNER_ID || 'YOUR_DISCORD_ID',
  guildId: process.env.GUILD_ID || 'YOUR_GUILD_ID',
  staffRoles: ['Administrador', 'Moderador', 'Staff', 'Admin'],
  channels: {
    verification: process.env.VERIFICATION_CHANNEL_ID || 'VERIFICATION_CHANNEL_ID',
    tickets: process.env.TICKETS_CHANNEL_ID || 'TICKETS_CHANNEL_ID',
    logs: process.env.LOGS_CHANNEL_ID || 'LOGS_CHANNEL_ID',
    welcome: process.env.WELCOME_CHANNEL_ID || 'WELCOME_CHANNEL_ID'
  },
  api: {
    openai: process.env.OPENAI_API_KEY || '',
    roblox: process.env.ROBLOX_API_KEY || ''
  }
};
