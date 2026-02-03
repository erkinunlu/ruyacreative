const express = require('express');
const router = express.Router();
const Settings = require('../models/Settings');
const auth = require('../middleware/auth');

// Get settings (public)
router.get('/', async (req, res) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) {
      settings = new Settings();
      await settings.save();
    }
    res.json(settings);
  } catch (error) {
    res.status(500).json({ message: 'Sunucu hatası' });
  }
});

// Update settings (admin only)
router.put('/', auth, async (req, res) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) {
      settings = new Settings();
    }
    
    Object.assign(settings, req.body);
    settings.updatedAt = Date.now();
    await settings.save();
    
    res.json(settings);
  } catch (error) {
    res.status(500).json({ message: 'Sunucu hatası' });
  }
});

module.exports = router;
