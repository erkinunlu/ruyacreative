const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Team = require('../models/Team');
const auth = require('../middleware/auth');

// Get all active team members (public)
router.get('/', async (req, res) => {
  try {
    const members = await Team.find({ isActive: true }).sort({ order: 1 });
    res.json(members);
  } catch (error) {
    res.status(500).json({ message: 'Sunucu hatası' });
  }
});

// Get all team members (admin)
router.get('/admin/all', auth, async (req, res) => {
  try {
    const members = await Team.find().sort({ order: 1 });
    res.json(members);
  } catch (error) {
    res.status(500).json({ message: 'Sunucu hatası' });
  }
});

// Get single member
router.get('/:id', async (req, res) => {
  try {
    const member = await Team.findById(req.params.id);
    if (!member) {
      return res.status(404).json({ message: 'Ekip üyesi bulunamadı' });
    }
    res.json(member);
  } catch (error) {
    res.status(500).json({ message: 'Sunucu hatası' });
  }
});

// Create team member (admin only)
router.post('/', auth, [
  body('name').notEmpty(),
  body('role').notEmpty()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const member = new Team(req.body);
    await member.save();
    res.status(201).json(member);
  } catch (error) {
    res.status(500).json({ message: 'Sunucu hatası' });
  }
});

// Update team member (admin only)
router.put('/:id', auth, async (req, res) => {
  try {
    const member = await Team.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!member) {
      return res.status(404).json({ message: 'Ekip üyesi bulunamadı' });
    }
    res.json(member);
  } catch (error) {
    res.status(500).json({ message: 'Sunucu hatası' });
  }
});

// Delete team member (admin only)
router.delete('/:id', auth, async (req, res) => {
  try {
    const member = await Team.findByIdAndDelete(req.params.id);
    if (!member) {
      return res.status(404).json({ message: 'Ekip üyesi bulunamadı' });
    }
    res.json({ message: 'Ekip üyesi silindi' });
  } catch (error) {
    res.status(500).json({ message: 'Sunucu hatası' });
  }
});

module.exports = router;
