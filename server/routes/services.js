const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Service = require('../models/Service');
const auth = require('../middleware/auth');

// Get all services (public)
router.get('/', async (req, res) => {
  try {
    const services = await Service.find({ isActive: true }).sort({ order: 1 });
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: 'Sunucu hatası' });
  }
});

// Get all services (admin)
router.get('/admin/all', auth, async (req, res) => {
  try {
    const services = await Service.find().sort({ order: 1 });
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: 'Sunucu hatası' });
  }
});

// Get single service
router.get('/:id', async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ message: 'Hizmet bulunamadı' });
    }
    res.json(service);
  } catch (error) {
    res.status(500).json({ message: 'Sunucu hatası' });
  }
});

// Create service (admin only)
router.post('/', auth, [
  body('title').notEmpty().trim(),
  body('description').notEmpty()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const service = new Service(req.body);
    await service.save();
    res.status(201).json(service);
  } catch (error) {
    res.status(500).json({ message: 'Sunucu hatası' });
  }
});

// Update service (admin only)
router.put('/:id', auth, async (req, res) => {
  try {
    req.body.updatedAt = Date.now();
    const service = await Service.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!service) {
      return res.status(404).json({ message: 'Hizmet bulunamadı' });
    }
    res.json(service);
  } catch (error) {
    res.status(500).json({ message: 'Sunucu hatası' });
  }
});

// Delete service (admin only)
router.delete('/:id', auth, async (req, res) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);
    if (!service) {
      return res.status(404).json({ message: 'Hizmet bulunamadı' });
    }
    res.json({ message: 'Hizmet silindi' });
  } catch (error) {
    res.status(500).json({ message: 'Sunucu hatası' });
  }
});

module.exports = router;
