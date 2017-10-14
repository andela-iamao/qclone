const mongoose = require('../');

const { Schema } = mongoose;

const message = mongoose.model('Message', Schema({
  conversation: { type: String, ref: 'Coversation' },
  sender: {
    type: String,
    ref: 'User'
  },
  receiver: {
    type: String,
    ref: 'User'
  },
  message: {
    type: String
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
}));

module.exports = message;
