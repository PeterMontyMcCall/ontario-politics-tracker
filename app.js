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

function categorizeArticle(article) {
    const text = `${article.title} ${article.description}`.toLowerCase();
    const tokens = text.match(/\b\w+\b/g);  // extract words using regex
    const tokenSet = new Set(tokens);       // quick lookup
    const matched = [];

    for (let cat in categories) {
        for (let keyword of categories[cat]) {
            if (tokenSet.has(keyword)) {
                matched.push(cat);
                break;
            }
        }
    }
    return matched;
}

function checkDuplicateArticle(title1, title2) {
    // Perform fuzzy matching between titles to check duplication
    // Turn title1's words into key and frequency into value
    const title1_wordCount = getWordCount(title1);
    const title2_wordCount = getWordCount(title2);
    let matchedWords = 0;

    // Compare the 2 word counts
    for (let key in title1_wordCount) {
        if (title1_wordCount[key] && title2_wordCount[key]) {
            matchedWords += Math.min(title1_wordCount[key], title2_wordCount[key])
        }
    }

    // Use clean word counts
    const title1_length = Object.values(title1_wordCount).reduce((a, b) => a + b, 0);
    const title2_length = Object.values(title2_wordCount).reduce((a, b) => a + b, 0);
    const similarity = (matchedWords / title1_length + matchedWords / title2_length) / 2;
    // Set the threshold to 65%
    if (similarity > 0.65) {
        return true
    }
    return false;
}

function getWordCount(str) {
    // Create a set of words to skip through
    const stopWords = new Set(["the", "in", "on", "a", "an", "of", "to", "is", "and", "for", "by"]);

    // Clean every words of str and convert to array
    const words = str
        .toLowerCase()
        .replace(/[^\w\s]/g, '')        // remove punctuation
        .split(/\s+/);                  // split by any whitespace

    let wordCount = {};
    for (let word of words) {
        if (stopWords.has(word)) continue;      // skip stop words
        if (word === "") continue;              // skip empty strings

        if (wordCount[word]) {
            wordCount[word] += 1;
        } else {
            wordCount[word] = 1;
        }
    }
    return wordCount;
}

const news = {
    title: "Less than half of Toronto residents approve of Mayor Olivia Chow's performance: poll",
    description: "The Leger survey asked Toronto residents about their mayor as part of a broader poll on Ontario politics.",
}

console.log(categorizeArticle(news));