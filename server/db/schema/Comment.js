const mongoose = require('../');

const { Schema } = mongoose;

const comment = mongoose.model('Comment', Schema({
  comment: {
    type: String,
    required: true
  },
  author: {
    type: String,
    ref: 'User',
    required: true
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

module.exports = comment;
