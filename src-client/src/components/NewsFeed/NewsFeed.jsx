import styles from './NewsFeed.module.css';
import logoMap from '../../data/logo_map.json';
import { getImageUrl } from "../../utils";
import { useEffect, useState } from 'react';

function NewsFeed({ searchTerm, newsOutlets, categories }) {
    // Fetch from backend
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:3000/articles/get')
            .then(res => res.json())
            .then(data => {
                setArticles(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    // Check if any of the checkbox in News Outlets is checked
    const checkedNewsOutlets = Object.keys(newsOutlets).filter(outlet => newsOutlets[outlet]);

    // Check if any of the checkbox in Categories is checked
    const checkedCategories = Object.keys(categories).filter(cat => categories[cat]);

    // Filter articles
    const filteredArticles = articles.filter(article => {
        // Filter by news outlets
        if (checkedNewsOutlets.length !== 0) {
            if (!newsOutlets[normalizeOutletName(article.source)]) return false;
        }

        // Filter by categories
        if (checkedCategories.length !== 0) {
            if (!article.categories.some((cat) => categories[cat] === true)) return false;
        }

        if (!searchTerm) return true; // If search is empty, show all

        // Filter by search bar
        const text = `${article.title} ${article.description}`.toLowerCase();
        return text.includes(searchTerm.toLowerCase());
    })

    // If no match found, show empty
    if (filteredArticles.length === 0) {
        return (<p className={styles.emptyFeed}>No articles found...</p>);
    }

    if (loading) return <p>Loading...</p>

    return (
        <section className={styles.feed}>
            <ul>
                {filteredArticles.map((article, id) => {
                    const logo = logoMap[article.source];
                    return (
                        <li key={id} className={styles.article}>
                            <div className={styles.articleHeader}>
                                <h1 className={styles.title}>{article.title}</h1>
                                <p className={styles.date}>{article.published_at.slice(0, 10)}</p>
                            </div>
                            <div
                                className={styles.logoContainer}
                                /* Dynamic dimensions depend on the logo 
                                 * Only set the height and let the width auto adjust */
                                style={{ height: logo.height }}
                            >
                                <img
                                    src={getImageUrl(logo.imageSrc)}
                                    alt={article.source}
                                />
                            </div>
                            <p className={styles.desc}>"{article.description}"</p>
                            <div className={styles.headerLine} />
                            <div className={styles.articleFooter}>
                                <ul className={styles.categories}>
                                    {article.categories.map((category, id) => {
                                        return (
                                            <li key={id} className={styles.category}>
                                                <p>{category.slice(0, 1).toUpperCase() + category.slice(1)}</p>
                                            </li>
                                        );
                                    })}
                                </ul>
                                <a
                                    className={styles.link}
                                    href={article.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Read More
                                </a>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </section>
    );
}

function normalizeOutletName(name) {
    return name
        .toLowerCase()           // all lowercase
        .replace(/\s+/g, "_")    // spaces to underscores
        .replace(/[^\w_]/g, ""); // remove non-word chars except underscore
}

export default NewsFeed;