const express = require('express');
const app = express();
require('dotenv').config();
const { categorizeArticle, checkDuplicateArticle } = require('./helpers/textUtils');


const PORT = process.env.PORT || 3000;
const newsAPI_key = process.env.NEWS_API_KEY;

app.get('/', async (req, res) => {
    try {
        // Fetch API from NewsAPI
        const baseTopic = "ontario politics"
        const CA_Articles = "cbc.ca,globalnews.ca,thestar.com,nationalpost.com,ctvnews.ca"
        const response = await fetch(`https://newsapi.org/v2/everything?q=${encodeURIComponent(baseTopic)}&language=en&domains=${CA_Articles}&sortBy=publishedAt&apiKey=${newsAPI_key}`);

        if (!response.ok) { throw new Error("Failed to fetch NewsAPI"); }

        const data = await response.json();

        if (!data.articles || data.articles.length === 0) {
            return res.status(404).json({ error: "No articles found." });
        }

        const article = data.articles[0];

        // Sort the articles into different categories
        const result = await data.articles.map(article => {
            const matchedCategories = categorizeArticle(article);
            return {
                source: article.source.name,
                author: article.author,
                title: article.title,
                description: article.description,
                url: article.url,
                categories: matchedCategories
            };
        });

        res.json(result)
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});