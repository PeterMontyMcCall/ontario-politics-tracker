const { categorizeArticle, checkDuplicateArticle } = require('../helpers/textUtils');

async function fetchArticles(req, res) {
    try {
        const newsAPI_key = process.env.NEWS_API_KEY;

        const baseTopic = "(ontario OR toronto OR \"queen's park\" OR \"doug ford\") AND (politics OR policy OR government OR legislature OR law OR bill)"
        const CA_Articles = "cbc.ca,globalnews.ca,thestar.com,nationalpost.com,ctvnews.ca"
        const response = await fetch(`https://newsapi.org/v2/everything?q=${encodeURIComponent(baseTopic)}&language=en&domains=${CA_Articles}&sortBy=publishedAt&apiKey=${newsAPI_key}`);

        if (!response.ok) { throw new Error("Failed to fetch NewsAPI"); }

        const data = await response.json();

        if (!data.articles || data.articles.length === 0) {
            return res.status(404).json({ error: "No articles found." });
        }

        // Sort the articles into different categories
        // const result = await data.articles.map(article => {
        //     totalArticle += 1;
        //     const matchedCategories = categorizeArticle(article);
        //     return {
        //         source: article.source.name,
        //         author: article.author,
        //         title: article.title,
        //         description: article.description,
        //         url: article.url,
        //         publishedAt: article.publishedAt,
        //         categories: matchedCategories
        //     };
        // });

        const article = data.articles[0];
        const matchedCategories = categorizeArticle(article);
        const result = {
            source: article.source.name,
            author: article.author,
            title: article.title,
            description: article.description,
            url: article.url,
            publishedAt: article.publishedAt,
            categories: matchedCategories
        }

        res.json(result)
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = { fetchArticles };