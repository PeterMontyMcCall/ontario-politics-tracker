const articleModel = require('../models/articleModel');

async function postArticle(req, res) {
    try {
        const article = req.body;

        const result = await articleModel.insertArticle(article);
        res.status(201).json(result.rows[0] || { message: 'Article already exists.' });

    } catch (error) {
        console.error('Error in postArticle controller: ', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

async function getArticle(req, res) {
    try {
        // Sort by search term
        const searchTerm = req.query.q || "";

        // Sort by news outlets
        const outlets = req.query.outlets
            ? req.query.outlets.split(",")
            : [];

        // Sort by categories
        const categories = req.query.categories
            ? req.query.categories.split(",")
            : [];

        // Sort by date
        const date = req.query.sort || "";

        // Fetch from database
        const articles = await articleModel.getArticles(searchTerm, outlets, categories, date);
        res.status(200).json(articles.rows);
    } catch (error) {
        console.error('Error in getArticle controller : ', error);
        if (!res.headersSent) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}

module.exports = {
    postArticle,
    getArticle
};