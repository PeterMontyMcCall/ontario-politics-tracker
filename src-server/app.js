const express = require('express');
const cors = require('cors');
const app = express();
const articleRoutes = require('./routes/articleRoutes');
const homeRoutes = require('./routes/homeRoutes');
require('dotenv').config();

const { fetchNewsArticles } = require('./helpers/newsFetcher');
const { refreshArticles } = require('./services/articleRefresher');

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use('/', homeRoutes); // Homepage
app.use('/articles', articleRoutes); // POST and GET articles

// Start scheduled job
// require('./scheduler/scheduler'); // cron job

app.listen(PORT, async () => {
    console.log(`Server running at http://localhost:${PORT}`);

    // 🔷 Test newsFetcher
    // console.log("🔷 Testing fetchNewsArticles...");
    // try {
    //     const articles = await fetchNewsArticles();
    //     console.log(`✅ Fetched ${articles.length} articles`);
    //     console.log(articles); // Show first 3 for sanity check
    // } catch (err) {
    //     console.error("❌ Error testing fetchNewsArticles:", err.message);
    // }

    // 🔷 Test articleRefresher
    // console.log("🔷 Testing refreshArticles...");
    // try {
    //     await refreshArticles();
    // } catch (err) {
    //     console.error("❌ Error testing refreshArticles:", err.message);
    // }
});

