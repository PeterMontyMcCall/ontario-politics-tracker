import styles from './NewsFeed.module.css';
import newsOutletsObject from '../../../../src-shared/newsOutlet.js';
import { getImageUrl } from "../../utils";
import { useEffect, useState } from 'react';

function NewsFeed({ searchTerm, newsOutlets, categories, date, currentPage, postsPerPage, setTotalPosts }) {
    // Fetch from backend
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);

        // Check if any of the checkbox in News Outlets is checked
        const checkedNewsOutlets = Object.keys(newsOutlets).filter(key => newsOutlets[key]);

        // Check if any of the checkbox in Categories is checked
        const checkedCategories = Object.keys(categories).filter(key => categories[key]);

        let url = '/articles/get';
        const params = [];
        if (searchTerm) params.push(`q=${encodeURIComponent(searchTerm)}`);
        if (checkedNewsOutlets.length) params.push(`outlets=${checkedNewsOutlets.join(",")}`);
        if (checkedCategories.length) params.push(`categories=${checkedCategories.join(",")}`);
        if (date) params.push(`sort=${date}`)
        /* Pagination */
        params.push(`limit=${postsPerPage}`) // How many items per page
        params.push(`offset=${(currentPage - 1) * postsPerPage}`) // How many items to skip
        if (params.length) url += `?${params.join("&")}`;

        fetch(url)
            .then(res => res.json())
            .then(data => {
                setArticles(data.articles);
                setTotalPosts(Number(data.totalCount));
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [searchTerm, newsOutlets, categories, date, currentPage, postsPerPage]);

    // If no match found, show empty
    if (articles.length === 0) {
        return (<p className={styles.emptyFeed}>No articles found...</p>);
    }

    if (loading) return <p>Loading...</p>

    return (
        <section className={styles.feed}>
            <ul className={styles.feedList}>
                {articles.map((article, id) => {
                    const logo = newsOutletsObject[article.source].logo;
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

export default NewsFeed;