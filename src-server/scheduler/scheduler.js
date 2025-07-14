const cron = require('node-cron');
const { refreshArticles } = require('../services/articleRefresher');

// Schedule to run every 15 minutes
cron.schedule('*/1 * * * *', async () => {
    console.log('⏰ Refreshing articles...');
    try {
        await refreshArticles();
        console.log('✅ Articles refreshed');
    } catch (error) {
        console.error('❌ Error refreshing articles:', error.message);
    }
});