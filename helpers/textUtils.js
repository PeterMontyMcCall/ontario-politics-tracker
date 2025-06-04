const { categories } = require('../data/categories');

function categorizeArticle(article) {
    const text = `${article.title} ${article.description}`.toLowerCase();
    const tokens = text.match(/\b\w+\b/g);
    const tokenSet = new Set(tokens);
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

function getWordCount(str) {
    const stopWords = new Set(["the", "in", "on", "a", "an", "of", "to", "is", "and", "for", "by"]);
    const words = str.toLowerCase().replace(/[^\w\s]/g, '').split(/\s+/);
    const wordCount = {};

    for (let word of words) {
        if (stopWords.has(word) || word === "") continue;
        wordCount[word] = (wordCount[word] || 0) + 1;
    }

    return wordCount;
}

function checkDuplicateArticle(title1, title2) {
    const title1_wordCount = getWordCount(title1);
    const title2_wordCount = getWordCount(title2);
    let matchedWords = 0;

    for (let key in title1_wordCount) {
        if (title2_wordCount[key]) {
            matchedWords += Math.min(title1_wordCount[key], title2_wordCount[key]);
        }
    }

    const title1_length = Object.values(title1_wordCount).reduce((a, b) => a + b, 0);
    const title2_length = Object.values(title2_wordCount).reduce((a, b) => a + b, 0);
    const similarity = (matchedWords / title1_length + matchedWords / title2_length) / 2;

    return similarity > 0.65;
}

module.exports = {
    categorizeArticle,
    checkDuplicateArticle
};