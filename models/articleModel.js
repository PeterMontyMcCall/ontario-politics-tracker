const pool = require("../db");

async function insertArticle(article) {
    const query = `INSERT INTO ontario_politics_tracker (title, author, source, description, url, published_at, cetegories)
                    VALUES ($1, $2, $3, $4, $5, $6)
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
