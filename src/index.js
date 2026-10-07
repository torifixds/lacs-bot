const express = require('express');
const path = require('path');
const { Client, GatewayIntentBits, Collection } = require('discord.js');
const connectDB = require('./database');
const { CommandHandler } = require('./handlers/commandHandler');
const { logger } = require('./utils/logger');
const config = require('./config');

const app = express();
const port = Number(process.env.PORT || 3000);

app.get('/health', (_req, res) => {
  res.status(200).json({ ok: true, service: 'lacs-bot', time: new Date().toISOString() });
});

app.listen(port, () => {
  logger.info(`Servidor HTTP escuchando en el puerto ${port}`);
});

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

client.commands = new Collection();
const commandHandler = new CommandHandler(client);
commandHandler.load(path.join(__dirname, 'commands'));

const eventFiles = ['ready', 'guildMemberAdd', 'messageCreate'];

for (const file of eventFiles) {
  const event = require(`./events/${file}`);
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args, client));
  } else {
    client.on(event.name, (...args) => event.execute(...args, client));
  }
}

async function start() {
  try {
    await connectDB();
    logger.info('Conectado a MongoDB');
    await client.login(process.env.DISCORD_TOKEN);
  } catch (error) {
    logger.error('Error al iniciar el bot:', error);
    process.exit(1);
  }
}

start();

module.exports = { client, app };
