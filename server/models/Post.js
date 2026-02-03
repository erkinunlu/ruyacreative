const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  excerpt: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  featuredImage: {
    type: String,
    default: ''
  },
  category: {
    type: String,
    required: true,
    enum: ['web-design', 'e-commerce', 'seo', 'social-media', 'graphic-design', 'digital-marketing', 'general']
  },
  tags: [{
    type: String
  }],
  author: {
    name: { type: String, default: 'Admin' },
    avatar: { type: String, default: '' }
  },
  metaTitle: {
    type: String,
    default: ''
  },
  metaDescription: {
    type: String,
    default: ''
  },
  views: {
    type: Number,
    default: 0
  },
  isPublished: {
    type: Boolean,
    default: true
  },
  publishedAt: {
    type: Date,
    default: Date.now
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

// Generate slug from title before saving
postSchema.pre('save', function(next) {
  if (this.isModified('title')) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9ğüşıöç]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
  }
  next();
});

module.exports = mongoose.model('Post', postSchema);
