const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Testimonial = require('../models/Testimonial');
const auth = require('../middleware/auth');

// Get all testimonials (public)
router.get('/', async (req, res) => {
  try {
    const testimonials = await Testimonial.find({ isActive: true }).sort({ order: 1 });
    res.json(testimonials);
  } catch (error) {
    res.status(500).json({ message: 'Sunucu hatası' });
  }
});

// Get all testimonials (admin)
router.get('/admin/all', auth, async (req, res) => {
  try {
    const testimonials = await Testimonial.find().sort({ order: 1 });
    res.json(testimonials);
  } catch (error) {
    res.status(500).json({ message: 'Sunucu hatası' });
  }
});

// Create testimonial (admin only)
router.post('/', auth, [
  body('name').notEmpty(),
  body('content').notEmpty()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const testimonial = new Testimonial(req.body);
    await testimonial.save();
    res.status(201).json(testimonial);
  } catch (error) {
    res.status(500).json({ message: 'Sunucu hatası' });
  }
});

// Update testimonial (admin only)
router.put('/:id', auth, async (req, res) => {
  try {
    const testimonial = await Testimonial.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!testimonial) {
      return res.status(404).json({ message: 'Referans bulunamadı' });
    }
    res.json(testimonial);
  } catch (error) {
    res.status(500).json({ message: 'Sunucu hatası' });
  }
});

// Delete testimonial (admin only)
router.delete('/:id', auth, async (req, res) => {
  try {
    const testimonial = await Testimonial.findByIdAndDelete(req.params.id);
    if (!testimonial) {
      return res.status(404).json({ message: 'Referans bulunamadı' });
    }
    res.json({ message: 'Referans silindi' });
  } catch (error) {
    res.status(500).json({ message: 'Sunucu hatası' });
  }
});

module.exports = router;
