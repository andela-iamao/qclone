const mongoose = require('../');

const { Schema } = mongoose;

const user = mongoose.model('User', Schema({
  email: {
    type: String,
    required: true
  },
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  interests: [String],
  email_confirmed: {
    type: Boolean,
    default: false
  },
  followers: {
    type: Number,
    default: 0
  },
  following: {
    type: Number,
    default: 0
  },
  questions: {
    type: Number,
    default: 0
  },
  answers: {
    type: Number,
    default: 0
  },
  topic_knowledge: [String],
  passed_question: [String],
  profile_credential: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  },
  profile_photo: {
    type: String,
    default: ''
  },
  registeration_progress: {
    type: Number,
    default: 1
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

module.exports = user;
