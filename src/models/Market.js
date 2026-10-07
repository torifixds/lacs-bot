const mongoose = require('mongoose');

const marketSchema = new mongoose.Schema({
  item: { type: String, required: true },
  price: { type: Number, required: true },
  sellerId: { type: String, required: true },
  description: { type: String, default: 'Sin descripción' }
}, { timestamps: true });

module.exports = mongoose.model('Market', marketSchema);
