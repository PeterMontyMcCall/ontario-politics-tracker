const express = require('express');
const router = express.Router();
const articleCont = require('../controllers/articleController');

// Route: POST /articles
router.post('/post', articleCont.postArticle);

// RouteL GET /articles
router.get('/get', articleCont.getArticle);

module.exports = router;