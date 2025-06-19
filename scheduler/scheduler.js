const cron = require('node-cron');
const { refreshArticle, refreshArticles } = require('../services/articleRefresher');

// Schedule to run every 15 minutes
cron.schedule('*/15 * * * *', async () => {
    console.log('⏰ Refreshing articles...');
    try {
        await refreshArticle();
        console.log('✅ Articles refreshed');
    } catch (error) {
        console.error('❌ Error refreshing articles:', error.message);
    }
});