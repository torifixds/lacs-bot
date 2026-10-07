const mongoose = require('mongoose');
const { logger } = require('./utils/logger');

async function connectDB() {
  const uri = process.env.MONGO_URI;

  if (!uri) {
    throw new Error('Falta MONGO_URI en el entorno.');
  }

  mongoose.set('strictQuery', true);

  await mongoose.connect(uri, {
    serverSelectionTimeoutMS: 10000
  });

  logger.info('MongoDB conectado correctamente');
  return mongoose;
}

module.exports = connectDB;
