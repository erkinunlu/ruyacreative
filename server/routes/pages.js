const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Page = require('../models/Page');
const auth = require('../middleware/auth');

// Get all active pages (public)
router.get('/', async (req, res) => {
  try {
    const pages = await Page.find({ isActive: true })
      .select('-content -sections')
      .sort({ navOrder: 1 });
    res.json(pages);
  } catch (error) {
    res.status(500).json({ message: 'Sunucu hatası' });
  }
});

// Get all pages (admin)
router.get('/admin/all', auth, async (req, res) => {
  try {
    const pages = await Page.find().sort({ navOrder: 1 });
    res.json(pages);
  } catch (error) {
    res.status(500).json({ message: 'Sunucu hatası' });
  }
});

// Get page by slug (public)
router.get('/slug/:slug', async (req, res) => {
  try {
    const page = await Page.findOne({ slug: req.params.slug, isActive: true });
    if (!page) {
      return res.status(404).json({ message: 'Sayfa bulunamadı' });
    }
    res.json(page);
  } catch (error) {
    res.status(500).json({ message: 'Sunucu hatası' });
  }
});

// Get single page
router.get('/:id', async (req, res) => {
  try {
    const page = await Page.findById(req.params.id);
    if (!page) {
      return res.status(404).json({ message: 'Sayfa bulunamadı' });
    }
    res.json(page);
  } catch (error) {
    res.status(500).json({ message: 'Sunucu hatası' });
  }
});

// Create page (admin only)
router.post('/', auth, [
  body('title').notEmpty().trim(),
  body('slug').notEmpty(),
  body('content').notEmpty()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const page = new Page(req.body);
    await page.save();
    res.status(201).json(page);
  } catch (error) {
    res.status(500).json({ message: 'Sunucu hatası' });
  }
});

// Update page (admin only)
router.put('/:id', auth, async (req, res) => {
  try {
    req.body.updatedAt = Date.now();
    const page = await Page.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!page) {
      return res.status(404).json({ message: 'Sayfa bulunamadı' });
    }
    res.json(page);
  } catch (error) {
    res.status(500).json({ message: 'Sunucu hatası' });
  }
});

// Delete page (admin only)
router.delete('/:id', auth, async (req, res) => {
  try {
    const page = await Page.findByIdAndDelete(req.params.id);
    if (!page) {
      return res.status(404).json({ message: 'Sayfa bulunamadı' });
    }
    res.json({ message: 'Sayfa silindi' });
  } catch (error) {
    res.status(500).json({ message: 'Sunucu hatası' });
  }
});

module.exports = router;
