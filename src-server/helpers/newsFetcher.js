async function fetchNewsArticles() {
    const newsAPI_key = process.env.NEWS_API_KEY;

    const baseTopic = "(ontario OR toronto OR \"queen's park\" OR \"doug ford\") AND (politics OR policy OR government OR legislature OR law OR bill)"
    const CA_Articles = "cbc.ca,globalnews.ca,thestar.com,nationalpost.com,ctvnews.ca"
    const response = await fetch(`https://newsapi.org/v2/everything?q=${encodeURIComponent(baseTopic)}&language=en&domains=${CA_Articles}&pageSize=1&sortBy=publishedAt&apiKey=${newsAPI_key}`);

    if (!response.ok) { throw new Error("Failed to fetch NewsAPI"); }

    const data = await response.json();
    return data.articles?.[0] || null;
}

module.exports = { fetchNewsArticles }