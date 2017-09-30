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
  employment: [{ type: String, ref: 'Employment' }],
  education: [{ type: String, ref: 'Education' }],
  location: [{ type: String, ref: 'Location' }],
  default: [{ type: String, ref: 'DefaultCredential' }],
  interests: [{ type: String, ref: 'Topic' }],
  email_confirmed: {
    type: Boolean,
    default: false
  },
  followers: [{ type: String, ref: 'User' }],
  following: [{ type: String, ref: 'User' }],
  questions: [{ type: String, ref: 'Question' }],
  answers: [{ type: String, ref: 'Answer' }],
  topic_knowledge: [{ type: String, ref: 'Topic' }],
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
