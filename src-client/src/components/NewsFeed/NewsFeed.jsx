import styles from './NewsFeed.module.css';
import data from '../../dummy_data.json';
import { getImageUrl } from "../../utils";

function NewsFeed() {
    return (
        <section className={styles.feed}>
            <ul>
                {data.map((article, id) => {
                    return (
                        <li key={id} className={styles.article}>
                            <div className={styles.articleHeader}>
                                <h1 className={styles.title}>{article.title}</h1>
                                <p className={styles.date}>{article.date}</p>
                            </div>
                            <div className={styles.logoContainer}>
                                <img
                                    src={getImageUrl(article.imageSrc)}
                                    alt={article.source}
                                />
                            </div>
                            <p className={styles.desc}>"{article.desc}"</p>
                            <div className={styles.headerLine} />
                            <div className={styles.articleFooter}>
                                <ul className={styles.categories}>
                                    {article.categories.map((category, id) => {
                                        return (
                                            <li key={id} className={styles.category}>
                                                <p>{category}</p>
                                            </li>
                                        );
                                    })}
                                </ul>
                                <a className={styles.link} href={article.url}>Read More</a>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </section>
    );
}

export default NewsFeed;