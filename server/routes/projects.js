const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Project = require('../models/Project');
const auth = require('../middleware/auth');

// Get all projects (public)
router.get('/', async (req, res) => {
  try {
    const { category, featured } = req.query;
    let query = { isActive: true };
    
    if (category) query.category = category;
    if (featured === 'true') query.featured = true;
    
    const projects = await Project.find(query).sort({ order: 1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Sunucu hatası' });
  }
});

// Get all projects (admin)
router.get('/admin/all', auth, async (req, res) => {
  try {
    const projects = await Project.find().sort({ order: 1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Sunucu hatası' });
  }
});

// Get single project
router.get('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Proje bulunamadı' });
    }
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: 'Sunucu hatası' });
  }
});

// Create project (admin only)
router.post('/', auth, [
  body('title').notEmpty().trim(),
  body('description').notEmpty(),
  body('category').notEmpty()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const project = new Project(req.body);
    await project.save();
    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ message: 'Sunucu hatası' });
  }
});

// Update project (admin only)
router.put('/:id', auth, async (req, res) => {
  try {
    req.body.updatedAt = Date.now();
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!project) {
      return res.status(404).json({ message: 'Proje bulunamadı' });
    }
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: 'Sunucu hatası' });
  }
});

// Delete project (admin only)
router.delete('/:id', auth, async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Proje bulunamadı' });
    }
    res.json({ message: 'Proje silindi' });
  } catch (error) {
    res.status(500).json({ message: 'Sunucu hatası' });
  }
});

module.exports = router;
