const { categories } = require('../data/categories');

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
    // Turn title's words into key and frequency into value
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

module.exports = {
    categorizeArticle,
    checkDuplicateArticle
};