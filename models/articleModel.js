const pool = require("../db");

async function insertArticle(article) {
    console.log(`Inserting ${article.title} into database`);

    const query = `INSERT INTO article (title, author, source, description, url, published_at, categories)
                    VALUES ($1, $2, $3, $4, $5, $6, $7)
                    ON CONFLICT (url) DO NOTHING
                    RETURNING *;`;

    const values = [
        article.title,
        article.author,
        article.source,
        article.description,
        article.url,
        article.publishedAt,
        article.categories
    ]

    const result = await pool.query(query, values);
    return result;
}

module.exports = { insertArticle };
