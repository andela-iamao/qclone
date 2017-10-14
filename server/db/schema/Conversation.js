const mongoose = require('../');

const { Schema } = mongoose;

const conversation = mongoose.model('Conversation', Schema({
  messages: [{ type: String, ref: 'Message' }],
  starter: {
    type: String,
    ref: 'User'
  },
  target: {
    type: String,
    ref: 'User'
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

module.exports = conversation;
