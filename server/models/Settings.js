const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
  siteTitle: {
    type: String,
    default: 'Creative Agency'
  },
  siteDescription: {
    type: String,
    default: 'Web Tasarım, E-Ticaret, Grafik Tasarım ve Dijital Pazarlama'
  },
  logo: {
    type: String,
    default: ''
  },
  favicon: {
    type: String,
    default: ''
  },
  heroTitle: {
    type: String,
    default: 'Dijital Dünyada Fark Yaratıyoruz'
  },
  heroSubtitle: {
    type: String,
    default: 'Markanızı dijital dünyada en iyi şekilde temsil etmek için buradayız'
  },
  heroImage: {
    type: String,
    default: ''
  },
  aboutTitle: {
    type: String,
    default: 'Biz Kimiz?'
  },
  aboutContent: {
    type: String,
    default: 'Yaratıcı çözümler sunan bir dijital ajansız.'
  },
  aboutImage: {
    type: String,
    default: ''
  },
  contactEmail: {
    type: String,
    default: 'info@ajans.com'
  },
  contactPhone: {
    type: String,
    default: '+90 555 123 4567'
  },
  contactAddress: {
    type: String,
    default: 'İstanbul, Türkiye'
  },
  socialMedia: {
    facebook: { type: String, default: '' },
    instagram: { type: String, default: '' },
    twitter: { type: String, default: '' },
    linkedin: { type: String, default: '' },
    youtube: { type: String, default: '' }
  },
  seo: {
    metaTitle: { type: String, default: '' },
    metaDescription: { type: String, default: '' },
    metaKeywords: { type: String, default: '' },
    googleAnalytics: { type: String, default: '' }
  },
  colors: {
    primary: { type: String, default: '#6366f1' },
    secondary: { type: String, default: '#8b5cf6' },
    accent: { type: String, default: '#f43f5e' },
    dark: { type: String, default: '#0f172a' },
    light: { type: String, default: '#f8fafc' }
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Settings', settingsSchema);
