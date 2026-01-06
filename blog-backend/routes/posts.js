const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const jwt = require('jsonwebtoken');

// Middleware to verify token
const authenticate = (req, res, next) => {
    const token = req.header('Authorization'); // It looks for the 'Authorization' key
    if (!token) return res.status(401).json({ msg: "No token, authorization denied" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // This adds the user ID to the request
        next();
    } catch (e) {
        res.status(400).json({ msg: "Token is not valid" }); // This is the error you see!
    }
};

router.get('/all', async (req, res) => {
    const posts = await Post.find().sort({ createdAt: -1 }); // -1 means newest first
    res.json(posts);
});
// POST route to create a blog entry
// A simple list of prohibited words/topics (expand this as needed)
const forbiddenKeywords = ['illegal-act', 'fake-news-topic', 'hateful-term']; 

router.post('/create', authenticate, async (req, res) => {
    try {
        const { title, content, category, authorName } = req.body;

        // 1. Basic Content Moderation (Keyword Check)
        const combinedContent = (title + " " + content).toLowerCase();
        const containsIllegal = forbiddenKeywords.some(word => combinedContent.includes(word));

        if (containsIllegal) {
            return res.status(400).json({ msg: "Post contains prohibited content or misinformation." });
        }

        // 2. Length Validation (Prevents spam/empty posts)
        if (content.length < 20) {
            return res.status(400).json({ msg: "Content is too short to be a masterpiece." });
        }

        const newPost = new Post({
            title,
            content,
            category,
            authorName,
            author: req.user.id
        });

        const savedPost = await newPost.save();
        res.json(savedPost);
    } catch (err) {
        res.status(500).json({ error: "Validation failed. Ensure all fields are correct." });
    }
});

// DELETE a post
router.delete('/:id', authenticate, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) return res.status(404).json({ msg: "Post not found" });

        // Check if the user deleting is the actual author
        if (post.author.toString() !== req.user.id) {
            return res.status(401).json({ msg: "User not authorized to delete this post" });
        }

        await post.deleteOne();
        res.json({ msg: "Post removed successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
module.exports = router;