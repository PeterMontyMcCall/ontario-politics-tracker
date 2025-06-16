const express = require('express');
const router = express.Router();
const { fetchArticles } = require('../controllers/fetchController');

router.get('/', fetchArticles);

module.exports = router;