const mongoose = require('../');

const { Schema } = mongoose;

const question = mongoose.model('Question', Schema({
  content: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  author_id: String,
  followers: [String],
  answers: [String],
  topics: [String],
  downvote: {
    type: Number,
    default: 0
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

module.exports = question;
