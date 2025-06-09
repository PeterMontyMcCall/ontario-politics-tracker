const { Pool } = require('pg');

const pool = new Pool({
    user: 'pdminh',
    host: 'localhost',
    database: 'ontario_politics_tracker',
    password: 'password',
    port: 5432
});

module.exports = pool;

