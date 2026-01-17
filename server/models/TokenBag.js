const mongoose = require('mongoose');

const TokenBagSchema = new mongoose.Schema({
  bagId: { type: Number, required: true, unique: true }, // 32-bit Integer Hash
  ownerWallet: { type: String, required: true },
  encryptedKey: { type: String, required: true },
  provider: { type: String, enum: ['openai', 'gemini'], default: 'openai' },
  usageLimit: { type: Number, default: 2000 },
  usedTokens: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('TokenBag', TokenBagSchema);