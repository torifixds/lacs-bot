const User = require('../models/User');
const { logger } = require('../utils/logger');

module.exports = {
  name: 'guildMemberAdd',
  async execute(member) {
    try {
      const existing = await User.findOne({ discordId: member.id });

      if (!existing) {
        await User.create({
          discordId: member.id,
          username: member.user.tag,
          balance: 100,
          registered: false,
          verified: false,
          inventory: []
        });
      }

      const welcomeChannel = member.guild.channels.cache.get('WELCOME_CHANNEL_ID');
      if (welcomeChannel && welcomeChannel.isTextBased()) {
        welcomeChannel.send(`¡Bienvenido/a ${member.user}! Usa !register para registrarte y !verify para verificarte con Roblox.`);
      }

      logger.info(`Nuevo miembro: ${member.user.tag}`);
    } catch (error) {
      console.error('Error en guildMemberAdd:', error);
    }
  }
};
