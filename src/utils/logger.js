const chalk = require('chalk');
const axios = require('axios');

const logger = {
  info: (msg) => console.log(chalk.cyan(`[INFO] ${msg}`)),
  warn: (msg) => console.log(chalk.yellow(`[WARN] ${msg}`)),
  error: (msg) => console.log(chalk.red(`[ERROR] ${msg}`)),
  success: (msg) => console.log(chalk.green(`[✓] ${msg}`))
};

module.exports = { logger };
