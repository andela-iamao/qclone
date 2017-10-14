const mongoose = require('../');

const { Schema } = mongoose;

const answerLater = mongoose.model('AnswerLater', Schema({
  owner: [{ type: String, ref: 'User' }],
  question: [{ type: String, ref: 'Question' }],
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
}));

module.exports = answerLater;
