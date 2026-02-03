const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const auth = require('../middleware/auth');

// Login
router.post('/login', [
  body('email').isEmail().normalizeEmail(),
  body('password').notEmpty()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Geçersiz e-posta veya şifre' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Geçersiz e-posta veya şifre' });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Sunucu hatası' });
  }
});

// Get current user
router.get('/me', auth, async (req, res) => {
  try {
    res.json({
      user: {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        role: req.user.role
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Sunucu hatası' });
  }
});

// Change password
router.post('/change-password', auth, [
  body('currentPassword').notEmpty(),
  body('newPassword').isLength({ min: 6 })
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { currentPassword, newPassword } = req.body;
    
    const user = await User.findById(req.user._id);
    const isMatch = await user.comparePassword(currentPassword);
    
    if (!isMatch) {
      return res.status(401).json({ message: 'Mevcut şifre yanlış' });
    }

    user.password = newPassword;
    await user.save();

    res.json({ message: 'Şifre başarıyla güncellendi' });
  } catch (error) {
    res.status(500).json({ message: 'Sunucu hatası' });
  }
});

module.exports = router;
