const express = require('express');
const router = express.Router();
const { postArticle } = require('../controllers/articleController');

// Route: POST /articles
router.post('/', postArticle);

module.exports = router;