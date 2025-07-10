import styles from './NewsFeed.module.css';
import { getImageUrl } from "../../utils";
import { useEffect, useState } from 'react';

function NewsFeed() {
    // Load from backend
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

    if (loading) return <p>Loading...</p>

    // Create a mapping object for every logo for custom dimension
    const logoMap = {
        "CBC": {
            src: "cbc_logo.png",
            height: "16px"
        },
        "National Post": {
            src: "national_post_logo.png",
            height: "19px"
        },
        "Toronto Star": {
            src: "toronto_star_logo.png",
            height: "18px"
        },
        "CTV News": {
            src: "ctv_news_logo.png",
            height: "20px"
        },
        "Global News": {
            src: "global_news_logo.png",
            height: "40px"
        }
    };

    return (
        <section className={styles.feed}>
            <ul>
                {articles.map((article, id) => {
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
                                    src={getImageUrl(`source/${logo.src}`)}
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