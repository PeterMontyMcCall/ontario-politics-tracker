const { categories } = require('../data/categories');

const DOMAINS = 'cbc.ca,globalnews.ca,thestar.com,nationalpost.com,ctvnews.ca';
const PAGE_SIZE = 20;   // grab 20 items per page
const MAX_Pages = 1;    // only fetch the first page
const LOCATION_TERMS = [
    'ontario', 'toronto', 'ottawa', "queen's park",
    'hamilton', 'windsor', 'kitchener', 'london', 'kingston', 'niagara'
];
const BASE_TOPIC = `(${LOCATION_TERMS.join(' OR ')})`;

async function fetchPage(page = 1, fromISOString) {
    const url = new URL('https://newsapi.org/v2/everything');
    const NEWS_API_KEY = process.env.NEWS_API_KEY;
    const params = url.searchParams;

    // Set parameters for the fetching URL
    params.set('q', BASE_TOPIC);
    params.set('language', 'en');
    params.set('domains', DOMAINS);
    params.set('pageSize', PAGE_SIZE);
    params.set('page', page);
    params.set('sortBy', 'publishedAt');
    if (fromISOString) params.set('from', fromISOString);
    params.set('apiKey', NEWS_API_KEY);

    console.log("URL from newsFetcher: ", url.toString());
    const res = await fetch(url);
    if (!res.ok) throw new Error(`NewsAPI error ${res.status}: ${res.statusText}`);

    const data = await res.json();
    return {
        articles: data.articles || [],
        totalResults: data.totalResults || 0
    };
}


async function fetchNewsArticles(since) {
    // Normalize 'since' argument
    const sinceISO = since instanceof Date
        ? since.toISOString()
        : since;

    let allArticles = [];
    let page = 1;
    let totalPages = 1;

    // Loop over pages until we exhaust results or hit MAX_PAGES
    while (page <= totalPages && page <= MAX_Pages) {
        // Fetch one page of results
        const { articles, totalResults } = await fetchPage(page, sinceISO);

        // If no articles left, break
        if (!articles.length) break;

        // Accumulate into a flat array
        allArticles.push(...articles);

        // On the very first page, compute how many pages exist
        if (page === 1) {
            totalPages = Math.ceil(totalResults / PAGE_SIZE);
        }
        page++;
    }

    return allArticles;
}

module.exports = { fetchNewsArticles }