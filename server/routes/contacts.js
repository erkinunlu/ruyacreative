const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Contact = require('../models/Contact');
const auth = require('../middleware/auth');

// Get all contacts (admin only)
router.get('/', auth, async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: 'Sunucu hatası' });
  }
});

// Create contact (public)
router.post('/', [
  body('name').notEmpty(),
  body('email').isEmail().normalizeEmail(),
  body('subject').notEmpty(),
  body('message').notEmpty()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const contact = new Contact(req.body);
    await contact.save();
    res.status(201).json({ message: 'Mesajınız başarıyla gönderildi' });
  } catch (error) {
    res.status(500).json({ message: 'Sunucu hatası' });
  }
});

// Update contact status (admin only)
router.put('/:id', auth, async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!contact) {
      return res.status(404).json({ message: 'Mesaj bulunamadı' });
    }
    res.json(contact);
  } catch (error) {
    res.status(500).json({ message: 'Sunucu hatası' });
  }
});

// Delete contact (admin only)
router.delete('/:id', auth, async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: 'Mesaj bulunamadı' });
    }
    res.json({ message: 'Mesaj silindi' });
  } catch (error) {
    res.status(500).json({ message: 'Sunucu hatası' });
  }
});

// Get unread count (admin only)
router.get('/stats/unread', auth, async (req, res) => {
  try {
    const count = await Contact.countDocuments({ status: 'new' });
    res.json({ count });
  } catch (error) {
    res.status(500).json({ message: 'Sunucu hatası' });
  }
});

module.exports = router;
