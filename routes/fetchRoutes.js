const express = require('express');
const router = express.Router();
const { fetchArticle } = require('../controllers/fetchController');

router.get('/', fetchArticle);

module.exports = router;