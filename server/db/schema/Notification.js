const mongoose = require('../');

const { Schema } = mongoose;

const notification = mongoose.model('Notification', Schema({
  type: {
    type: String,
    default: 'Other'
  },
  owner: {
    type: String,
    ref: 'User'
  },
  user:  { type: String, ref: 'User' },
  question: { type: String, ref: 'Question' },
  answer: { type: String, ref: 'Answer' },
  read: { type: Boolean, default: false },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
}));

module.exports = notification;
