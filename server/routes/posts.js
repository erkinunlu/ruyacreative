const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Post = require('../models/Post');
const auth = require('../middleware/auth');

// Get all published posts (public)
router.get('/', async (req, res) => {
  try {
    const { category, page = 1, limit = 10, search } = req.query;
    let query = { isPublished: true };
    
    if (category) query.category = category;
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { excerpt: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } }
      ];
    }
    
    const posts = await Post.find(query)
      .sort({ publishedAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);
    
    const count = await Post.countDocuments(query);
    
    res.json({
      posts,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      total: count
    });
  } catch (error) {
    res.status(500).json({ message: 'Sunucu hatası' });
  }
});

// Get all posts (admin)
router.get('/admin/all', auth, async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Sunucu hatası' });
  }
});

// Get post by slug (public)
router.get('/slug/:slug', async (req, res) => {
  try {
    const post = await Post.findOne({ slug: req.params.slug, isPublished: true });
    if (!post) {
      return res.status(404).json({ message: 'Yazı bulunamadı' });
    }
    
    // Increment views
    post.views += 1;
    await post.save();
    
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: 'Sunucu hatası' });
  }
});

// Get single post
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Yazı bulunamadı' });
    }
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: 'Sunucu hatası' });
  }
});

// Create post (admin only)
router.post('/', auth, [
  body('title').notEmpty().trim(),
  body('excerpt').notEmpty(),
  body('content').notEmpty(),
  body('category').notEmpty()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const post = new Post(req.body);
    await post.save();
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: 'Sunucu hatası' });
  }
});

// Update post (admin only)
router.put('/:id', auth, async (req, res) => {
  try {
    req.body.updatedAt = Date.now();
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!post) {
      return res.status(404).json({ message: 'Yazı bulunamadı' });
    }
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: 'Sunucu hatası' });
  }
});

// Delete post (admin only)
router.delete('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Yazı bulunamadı' });
    }
    res.json({ message: 'Yazı silindi' });
  } catch (error) {
    res.status(500).json({ message: 'Sunucu hatası' });
  }
});

// Get related posts
router.get('/related/:slug', async (req, res) => {
  try {
    const post = await Post.findOne({ slug: req.params.slug });
    if (!post) {
      return res.status(404).json({ message: 'Yazı bulunamadı' });
    }
    
    const related = await Post.find({
      _id: { $ne: post._id },
      category: post.category,
      isPublished: true
    }).limit(3);
    
    res.json(related);
  } catch (error) {
    res.status(500).json({ message: 'Sunucu hatası' });
  }
});

module.exports = router;
