const mongoose = require('../');

const { Schema } = mongoose;

const defaultCredential = mongoose.model('DefaultCredential', Schema({
  employment: { type: String, ref: 'Employment' },
  education: { type: String, ref: 'Education' },
  location: { type: String, ref: 'Location' },
  user: { type: String, ref: 'User' },
  credential: String,
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
}));

module.exports = defaultCredential;
