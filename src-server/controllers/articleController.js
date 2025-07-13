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

        // Pagination
        // Prevent SQL Injection
        let limit = parseInt(req.query.limit, 10);
        let offset = parseInt(req.query.offset, 10);

        // Provide default values if not set or invalid
        if (isNaN(limit) || limit < 1 || limit > 100) {
            limit = 10; // Default limit
        }
        if (isNaN(offset) || offset < 0) {
            offset = 0; // Default offset
        }

        /* Fetch from database */
        // Fetch articles for this page
        const articles = await articleModel.getArticles(searchTerm, outlets, categories, date, limit, offset);

        // Fetch total count (without limit/offset)
        const totalCount = await articleModel.getArticlesCount(searchTerm, outlets, categories);
        res.status(200).json({
            articles: articles.rows,
            totalCount: totalCount.rows[0].count
        });
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