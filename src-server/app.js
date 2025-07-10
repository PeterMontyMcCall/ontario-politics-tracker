const express = require('express');
const cors = require('cors');
const app = express();
const articleRoutes = require('./routes/articleRoutes');
const homeRoutes = require('./routes/homeRoutes');
require('dotenv').config();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use('/', homeRoutes); // Homepage
app.use('/articles', articleRoutes); // POST and GET articles

// Start scheduled job
//require('./scheduler/scheduler'); // cron job

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

