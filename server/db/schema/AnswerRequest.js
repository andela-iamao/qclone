const mongoose = require('../');

const { Schema } = mongoose;

const answerRequest = mongoose.model('AnswerRequest', Schema({
  target: [{ type: String, ref: 'User' }],
  by: [{ type: String, ref: 'User' }],
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

module.exports = answerRequest;
