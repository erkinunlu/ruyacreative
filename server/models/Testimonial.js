const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  company: {
    type: String,
    default: ''
  },
  role: {
    type: String,
    default: ''
  },
  content: {
    type: String,
    required: true
  },
  image: {
    type: String,
    default: ''
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    default: 5
  },
  order: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Testimonial', testimonialSchema);
