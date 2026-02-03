const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const serviceRoutes = require('./routes/services');
const projectRoutes = require('./routes/projects');
const settingsRoutes = require('./routes/settings');
const testimonialRoutes = require('./routes/testimonials');
const contactRoutes = require('./routes/contacts');
const uploadRoutes = require('./routes/upload');
const postRoutes = require('./routes/posts');
const pageRoutes = require('./routes/pages');
const teamRoutes = require('./routes/team');

const User = require('./models/User');
const Settings = require('./models/Settings');
const Service = require('./models/Service');
const Page = require('./models/Page');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
app.use(express.static(path.join(__dirname, '../public')));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/pages', pageRoutes);
app.use('/api/team', teamRoutes);

// Admin panel routes
app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/admin/index.html'));
});

app.get('/admin/login', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/admin/login.html'));
});

// Public page routes - Multi-page architecture
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.get('/hakkimizda', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/pages/about.html'));
});

app.get('/hizmetler', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/pages/services.html'));
});

app.get('/hizmetler/:slug', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/pages/service-detail.html'));
});

app.get('/projeler', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/pages/projects.html'));
});

app.get('/projeler/:slug', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/pages/project-detail.html'));
});

app.get('/blog', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/pages/blog.html'));
});

app.get('/blog/:slug', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/pages/blog-detail.html'));
});

app.get('/ekip', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/pages/team.html'));
});

app.get('/sss', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/pages/faq.html'));
});

app.get('/iletisim', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/pages/contact.html'));
});

// 404 page
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, '../public/pages/404.html'));
});

// Initialize default data
async function initializeData() {
  try {
    // Create default admin user
    const adminExists = await User.findOne({ email: process.env.ADMIN_EMAIL || 'admin@ajans.com' });
    if (!adminExists) {
      const admin = new User({
        name: 'Admin',
        email: process.env.ADMIN_EMAIL || 'admin@ajans.com',
        password: process.env.ADMIN_PASSWORD || 'admin123',
        role: 'admin'
      });
      await admin.save();
      console.log('✅ Varsayılan admin kullanıcısı oluşturuldu');
    }

    // Create default settings
    const settingsExist = await Settings.findOne();
    if (!settingsExist) {
      const settings = new Settings();
      await settings.save();
      console.log('✅ Varsayılan ayarlar oluşturuldu');
    }

    // Create default services
    const servicesCount = await Service.countDocuments();
    if (servicesCount === 0) {
      const defaultServices = [
        {
          title: 'Web Tasarım',
          description: 'Modern, responsive ve kullanıcı dostu web siteleri tasarlıyoruz. Markanızı en iyi şekilde yansıtan özel tasarımlar.',
          icon: 'fa-solid fa-laptop-code',
          color: '#6366f1',
          features: ['Responsive Tasarım', 'SEO Uyumlu', 'Hızlı Yükleme', 'Özel Tasarım']
        },
        {
          title: 'E-Ticaret',
          description: 'Satışlarınızı artıracak profesyonel e-ticaret çözümleri. Ödeme sistemleri entegrasyonu ve stok yönetimi.',
          icon: 'fa-solid fa-shopping-cart',
          color: '#8b5cf6',
          features: ['Güvenli Ödeme', 'Stok Yönetimi', 'Mobil Uyumlu', 'Raporlama']
        },
        {
          title: 'Grafik Tasarım',
          description: 'Markanızı öne çıkaracak yaratıcı grafik tasarım çalışmaları. Logo, kurumsal kimlik ve daha fazlası.',
          icon: 'fa-solid fa-palette',
          color: '#ec4899',
          features: ['Logo Tasarım', 'Kurumsal Kimlik', 'Sosyal Medya', 'Basılı İşler']
        },
        {
          title: 'Sosyal Medya',
          description: 'Sosyal medya hesaplarınızın profesyonel yönetimi. İçerik üretimi ve etkileşim stratejileri.',
          icon: 'fa-solid fa-share-nodes',
          color: '#14b8a6',
          features: ['İçerik Planlama', 'Etkileşim Artırma', 'Reklam Yönetimi', 'Analiz']
        },
        {
          title: 'SEO Optimizasyon',
          description: 'Google sıralamalarında üst sıralara çıkın. Organik trafik ve görünürlük artışı.',
          icon: 'fa-solid fa-magnifying-glass-chart',
          color: '#f59e0b',
          features: ['Anahtar Kelime', 'Teknik SEO', 'İçerik Optimizasyonu', 'Backlink']
        },
        {
          title: 'Dijital Pazarlama',
          description: 'Kapsamlı dijital pazarlama stratejileri. Google Ads, sosyal medya reklamları ve daha fazlası.',
          icon: 'fa-solid fa-bullhorn',
          color: '#ef4444',
          features: ['Google Ads', 'Facebook Ads', 'E-posta Pazarlama', 'Remarketing']
        }
      ];
      await Service.insertMany(defaultServices);
      console.log('✅ Varsayılan hizmetler oluşturuldu');
    }

    // Create default pages
    const pagesCount = await Page.countDocuments();
    if (pagesCount === 0) {
      const defaultPages = [
        {
          title: 'Hakkımızda',
          slug: 'hakkimizda',
          content: 'Hakkımızda sayfası içeriği...',
          metaTitle: 'Hakkımızda | Creative Agency',
          metaDescription: 'Creative Agency olarak dijital dünyada fark yaratıyoruz.',
          showInNav: true,
          navOrder: 1
        },
        {
          title: 'SSS',
          slug: 'sss',
          content: 'Sıkça Sorulan Sorular...',
          metaTitle: 'SSS | Creative Agency',
          metaDescription: 'Sıkça sorulan sorular ve cevapları.',
          showInNav: true,
          navOrder: 2
        }
      ];
      await Page.insertMany(defaultPages);
      console.log('✅ Varsayılan sayfalar oluşturuldu');
    }
  } catch (error) {
    console.error('❌ Veri başlatma hatası:', error);
  }
}

// Connect to MongoDB and start server
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/creative_agency';

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('✅ MongoDB bağlantısı başarılı');
    initializeData();
    app.listen(PORT, () => {
      console.log(`🚀 Sunucu ${PORT} portunda çalışıyor`);
      console.log(`📁 Admin Panel: http://localhost:${PORT}/admin`);
      console.log(`🌐 Website: http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('❌ MongoDB bağlantı hatası:', err);
    console.log('⚠️  MongoDB bağlantısı olmadan devam ediliyor...');
    app.listen(PORT, () => {
      console.log(`🚀 Sunucu ${PORT} portunda çalışıyor (MongoDB olmadan)`);
    });
  });
