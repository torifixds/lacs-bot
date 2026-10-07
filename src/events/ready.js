const { EmbedBuilder } = require('discord.js');
const { logger } = require('../utils/logger');
const config = require('../config');

module.exports = {
  name: 'ready',
  once: true,
  async execute(client) {
    logger.success(`${client.user.tag} conectado y listo.`);

    client.user.setPresence({
      activities: [{ name: 'Lacs Bot | !help', type: 0 }],
      status: 'online'
    });

    const guild = client.guilds.cache.get(config.guildId);
    if (guild) {
      const embed = new EmbedBuilder()
        .setTitle('✅ Bot online')
        .setDescription(`El bot ${client.user.tag} ha sido iniciado correctamente.`)
        .setColor('#2ecc71');

      const logChannel = guild.channels.cache.get(config.channels.logs);
      if (logChannel && logChannel.isTextBased()) {
        logChannel.send({ embeds: [embed] }).catch(() => {});
      }
    }
  }
};
