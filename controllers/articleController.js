const { insertArticle } = require('../models/articleModel');

async function postArticle(req, res) {
    try {
        const article = req.body;

        const result = await insertArticle(article);
        res.status(201).json(result.rows[0] || { message: 'Article already exists.' });

    } catch (error) {
        console.error('Error in postArticle controller: ', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = {
    postArticle
};