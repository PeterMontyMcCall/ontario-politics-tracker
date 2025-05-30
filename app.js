const express = require('express');
const app = express();
require('dotenv').config();

const PORT = process.env.PORT || 3000;
const newsAPI_key = process.env.NEWS_API_KEY;

app.get('/', async (req, res) => {
    try {
        // Fetch API from NewsAPI
        const response = await fetch(`https://newsapi.org/v2/everything?q=tesla&from=2025-04-30&sortBy=publishedAt&apiKey=${newsAPI_key}`);

        if (!response.ok) { throw new Error("NewsAPI error"); }

        const data = await response.json();
        const article = data.articles[0];

        const result = {
            source: article.source.name,
            author: article.author,
            title: article.title,
            description: article.description,
            url: article.url
        };

        res.json(result)
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});