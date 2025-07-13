const pool = require("../db");
const { normalizeOutletDBName } = require('../../src-shared/newsOutlet.js');

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

async function getArticles(searchTerm = "", outlets = [], categories = [], date = "", limit, offset) {
    // Start with the base query for all articles
    let query = "SELECT * FROM article";
    // Store individual SQL WHERE conditions here
    let conditions = [];
    // Store parameter values to safely inject into the SQL query
    let values = [];
    // Used to keep track of the parameter number (for $1, $2, $3, ...)
    let idx = 1;

    // Search term
    if (searchTerm) {
        conditions.push(`(LOWER(title) LIKE $${idx} OR LOWER(description) LIKE $${idx})`);
        values.push(`%${searchTerm.toLowerCase()}%`);
        idx++;
    }

    // News outlets
    if (outlets.length) {
        conditions.push(`source = ANY($${idx})`);
        values.push(outlets.map(o => normalizeOutletDBName(o)));
        idx++;
    }

    // Categories
    if (categories.length) {
        conditions.push(`categories && $${idx}`);
        values.push(categories);
        idx++;
    }

    // Combine all WHERE conditions into the query
    if (conditions.length) {
        query += " WHERE " + conditions.join(" AND ");
    }

    // Sort by Date last
    if (date) query += ` ORDER BY published_at ${date}`;

    // Pagination
    query += ` LIMIT ${limit} OFFSET ${offset}`;

    console.log("conditions = ", conditions);
    console.log("query = ", query);
    console.log("values = ", values, "\n");

    // Run the query against the database
    const result = await pool.query(query, values);
    return result;
}

async function getArticlesCount(searchTerm = "", outlets = [], categories = []) {
    let query = "SELECT COUNT(*) FROM article";
    let conditions = [];
    let values = [];
    let idx = 1;

    if (searchTerm) {
        conditions.push(`(LOWER(title) LIKE $${idx} OR LOWER(description) LIKE $${idx})`);
        values.push(`%${searchTerm.toLowerCase()}%`);
        idx++;
    }
    if (outlets.length) {
        conditions.push(`source = ANY($${idx})`);
        values.push(outlets.map(o => normalizeOutletDBName(o)));
        idx++;
    }
    if (categories.length) {
        conditions.push(`categories && $${idx}`);
        values.push(categories);
        idx++;
    }
    if (conditions.length) {
        query += " WHERE " + conditions.join(" AND ");
    }
    return await pool.query(query, values);
}

module.exports = {
    insertArticle,
    getArticles,
    getArticlesCount
};
