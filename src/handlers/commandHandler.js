const fs = require('fs');
const path = require('path');
const { Collection } = require('discord.js');

class CommandHandler {
  constructor(client) {
    this.client = client;
    this.commands = new Collection();
  }

  load(dir) {
    const files = fs.readdirSync(dir, { withFileTypes: true });

    for (const file of files) {
      const fullPath = path.join(dir, file.name);

      if (file.isDirectory()) {
        this.load(fullPath);
        continue;
      }

      if (!file.name.endsWith('.js')) continue;

      const command = require(fullPath);
      if (!command?.name) continue;
      this.commands.set(command.name, command);
      this.client.commands.set(command.name, command);
    }
  }
}

module.exports = { CommandHandler };
