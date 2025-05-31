const express = require('express');
const app = express();
require('dotenv').config();

const PORT = process.env.PORT || 3000;
const newsAPI_key = process.env.NEWS_API_KEY;

const categories = {
    health: ["hospital", "health", "covid", "pandemic", "nurse", "doctor", "clinic", "vaccine"],
    education: ["school", "education", "teacher", "student", "university", "college", "curriculum"],
    crime: ["crime", "shooting", "police", "arrest", "murder", "assault", "theft", "investigation"],
    transportation: ["road", "highway", "transit", "bus", "train", "subway", "transportation", "traffic"]
}

app.get('/', async (req, res) => {
    try {
        // Fetch API from NewsAPI
        const baseTopic = "ontario"
        const CA_Articles = "cbc.ca,globalnews.ca,thestar.com,nationalpost.com,ctvnews.ca"
        const response = await fetch(`https://newsapi.org/v2/everything?q=${encodeURIComponent(baseTopic)}&language=en&domains=${CA_Articles}&sortBy=publishedAt&apiKey=${newsAPI_key}`);

        if (!response.ok) { throw new Error("Failed to fetch NewsAPI"); }

        const data = await response.json();

        if (!data.articles || data.articles.length === 0) {
            return res.status(404).json({ error: "No articles found." });
        }

        const article = data.articles[0];

        const result = data.articles.map(article => {
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

function categorizeArticle(article) {
    const text = `${article.title} ${article.description}`.toLowerCase();
    const matched = [];

    for (let cat in categories) {
        let keywordList = categories[cat];
        for (let i = 0; i < keywordList.length; i++) {
            let word = keywordList[i];
            if (text.includes(word)) {
                matched.push(cat);
                break;
            }
        }
    }
    return matched;
}

// function categorizeArticle(article) {
//     const text = `${article.title} ${article.description}`.toLowerCase();
//     const matchedCategories = [];

//     for (const [category, keywords] of Object.entries(categories)) {
//         // Check if any keyword appears in the article text
//         if (keywords.some(word => text.includes(word))) {
//             matchedCategories.push(category); // Add category to result
//         }
//     }

//     return matchedCategories;
// }