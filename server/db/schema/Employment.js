const mongoose = require('../');

const { Schema } = mongoose;

const employment = mongoose.model('Employment', Schema({
  position: { type: String, required: true },
  company: { type: String, required: true },
  start: { type: Number },
  end: { type: Number },
  active: { type: Boolean },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
}));

module.exports = employment;
