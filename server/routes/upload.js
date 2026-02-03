const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const auth = require('../middleware/auth');

// Configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

// File filter
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Sadece resim dosyaları yüklenebilir'), false);
  }
};

const upload = multer({ 
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

// Upload single image
router.post('/', auth, upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Dosya yüklenemedi' });
    }
    
    const imageUrl = `/uploads/${req.file.filename}`;
    res.json({ 
      message: 'Dosya başarıyla yüklendi',
      url: imageUrl,
      filename: req.file.filename
    });
  } catch (error) {
    res.status(500).json({ message: 'Sunucu hatası' });
  }
});

// Upload multiple images
router.post('/multiple', auth, upload.array('images', 10), (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'Dosya yüklenemedi' });
    }
    
    const urls = req.files.map(file => `/uploads/${file.filename}`);
    res.json({ 
      message: 'Dosyalar başarıyla yüklendi',
      urls
    });
  } catch (error) {
    res.status(500).json({ message: 'Sunucu hatası' });
  }
});

module.exports = router;
