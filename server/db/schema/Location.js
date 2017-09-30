const mongoose = require('../');

const { Schema } = mongoose;

const location = mongoose.model('Location', Schema({
  location: { type: String, required: true },
  active: { type: Boolean, required: true },
  start: { type: Number },
  end: { type: Number },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
}));

module.exports = location;
