const express = require('express');
const router = express.Router();
const { postArticle } = require('../controllers/articleController');

// Route: POST /api/articles
router.post('/articles', postArticle);

module.exports = router;