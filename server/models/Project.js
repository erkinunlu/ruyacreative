const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['web-design', 'e-commerce', 'graphic-design', 'social-media', 'seo', 'branding']
  },
  image: {
    type: String,
    required: true
  },
  client: {
    type: String,
    default: ''
  },
  link: {
    type: String,
    default: ''
  },
  technologies: [{
    type: String
  }],
  order: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  },
  featured: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Project', projectSchema);
