const { fetchNewsArticles } = require('../helpers/newsFetcher');
const { insertArticle } = require('../models/articleModel');
const { categorizeArticle } = require('../helpers/textUtils');

async function refreshArticles() {
    console.log("🔄 Refreshing article...");

    const articles = await fetchNewsArticles();
    let inserted = 0;
    let skipped = 0;

    for (const article of articles) {
        // Categorize article
        const matchedCategories = categorizeArticle(article);

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
            console.error(`❌ Failed to insert "${article.title}": ${err.message}`);
            skipped++;
        }
    }

    console.log(`✅ Refresh complete — inserted: ${inserted}, skipped: ${skipped}`);
}

async function refreshArticle() {
    console.log("🔄 Refreshing article...");

    const article = await fetchNewsArticles();
    let inserted = 0;
    let skipped = 0;

    // Categorize article
    const matchedCategories = categorizeArticle(article);

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
        console.error(`❌ Failed to insert "${article.title}": ${err.message}`);
        skipped++;
    }

    console.log(`✅ Refresh complete — inserted: ${inserted}, skipped: ${skipped}`);
}

module.exports = {
    refreshArticles,
    refreshArticle
};