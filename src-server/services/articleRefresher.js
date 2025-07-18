const { fetchNewsArticles } = require('../helpers/newsFetcher');
const { insertArticle, getLatestPublishedAt } = require('../models/articleModel');
const { categorizeArticle } = require('../helpers/textUtils');

async function refreshArticles() {
    const latestPublishedAt = await getLatestPublishedAt() || null; // Get the most recent article time from DB
    const articles = await fetchNewsArticles(latestPublishedAt);
    let inserted = 0;
    let skipped = 0;

    for (const article of articles) {
        // Categorize article
        const matchedCategories = categorizeArticle(article);
        // If no matched categories then skip this article
        if (!matchedCategories.length) {
            continue;
        }

        try {
            const result = await insertArticle({
                title: article.title,
                author: article.author,
                source: article.source.name,
                description: article.description,
                url: article.url,
                publishedAt: article.publishedAt,
                categories: matchedCategories
            });

            if (result.rows.length > 0) {
                inserted++;
            } else {
                skipped++;
            }

        } catch (error) {
            console.error(`Failed to insert "${article.title}": ${error.message}`);
            skipped++;
        }
    }

    console.log(`Refresh complete — inserted: ${inserted}, skipped: ${skipped}`);
}

module.exports = {
    refreshArticles
};