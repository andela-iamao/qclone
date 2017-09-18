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
  topics: [{ type: String, ref: 'Topic' }],
  tweet_by: [String],
  facebook_by: [String],
  views: {
    type: Number,
    default: 0
  },
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
