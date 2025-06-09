const pool = require('./db');

async function testConnection() {
    try {
        const res = await pool.query('SELECT NOW()');
        console.log('Connected to DB:', res.rows[0])
    } catch (err) {
        console.error('DB connection error', err);
    } finally {
        pool.end();
    }
}

testConnection();