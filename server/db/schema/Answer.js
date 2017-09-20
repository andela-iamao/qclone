const mongoose = require('../');

const { Schema } = mongoose;

const answer = mongoose.model('Answer', Schema({
  content: {
    type: String,
    required: true
  },
  author: {
    type: String,
    ref: 'User',
    required: true
  },
  question: {
    type: String,
    ref: 'Question'
  },
  followers: [{
    type: String,
    ref: 'User'
  }],
  upvotes: [String],
  topics: [{
    type: String,
    ref: 'Topic'
  }],
  tweet_by: [String],
  facebook_by: [String],
  views: {
    type: Number,
    default: 0
  },
  downvote: [String],
  draft: {
    type: Boolean,
    default: true
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

module.exports = answer;
