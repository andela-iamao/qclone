const mongoose = require('../');

const { Schema } = mongoose;

const topic = mongoose.model('Topic', Schema({
  title: {
    type: String,
    required: true
  },
  image: {
    type: String,
    default: 'https://qsf.ec.quoracdn.net/-3-images.new_grid.topic_no_photo_gray.png-26-ab612a80fba9ffe4.png'
  },
  description: {
    type: String,
    description: ''
  },
  followers: [String],
  keywords: [String],
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
}));

module.exports = topic;
