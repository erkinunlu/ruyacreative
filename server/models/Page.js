const mongoose = require('mongoose');

const pageSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    enum: ['hakkimizda', 'ekip', 'kariyer', 'sss', 'gizlilik-politikasi', 'kullanim-kosullari', 'custom']
  },
  content: {
    type: String,
    required: true
  },
  sections: [{
    type: {
      type: String,
      enum: ['hero', 'text', 'image', 'team', 'timeline', 'stats', 'faq', 'cta']
    },
    title: String,
    subtitle: String,
    content: String,
    image: String,
    order: { type: Number, default: 0 }
  }],
  metaTitle: {
    type: String,
    default: ''
  },
  metaDescription: {
    type: String,
    default: ''
  },
  isActive: {
    type: Boolean,
    default: true
  },
  showInNav: {
    type: Boolean,
    default: false
  },
  navOrder: {
    type: Number,
    default: 0
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Page', pageSchema);
