const config = require('../config');

module.exports = {
  name: 'messageCreate',
  async execute(message, client) {
    if (message.author.bot || !message.guild) return;
    if (!message.content.startsWith(config.prefix)) return;

    const args = message.content.slice(config.prefix.length).trim().split(/\s+/);
    const commandName = args.shift()?.toLowerCase();
    if (!commandName) return;

    const command = client.commands.get(commandName)
      || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

    if (!command) return;

    if (command.ownerOnly && message.author.id !== config.ownerId) {
      return message.reply('❌ Este comando solo puede usarlo el dueño del bot.');
    }

    if (command.staffOnly) {
      const hasStaffRole = message.member.roles.cache.some(role =>
        config.staffRoles.some(name => name.toLowerCase() === role.name.toLowerCase())
      );

      if (!hasStaffRole) {
        return message.reply('❌ No tienes permisos para usar este comando.');
      }
    }

    try {
      await command.execute(message, args, client);
    } catch (error) {
      console.error(`Error ejecutando ${command.name}:`, error);
      message.reply('❌ Hubo un error ejecutando ese comando.');
    }
  }
};
