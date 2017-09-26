const mongoose = require('../');

const { Schema } = mongoose;

const education = mongoose.model('Education', Schema({
  school: { type: String, required: true },
  concentration: { type: String, required: true },
  graduation_year: { type: Number },
  secondary_concentration: { type: String },
  degree_type: { type: String },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
}));

module.exports = education;
