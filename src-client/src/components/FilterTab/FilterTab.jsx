import styles from './FilterTab.module.css';

function FilterTab() {
    return (
        <section className={styles.filter}>
            <div className={styles.filterHeader}>
                <span className={`material-symbols-outlined`}>tune</span>
                <h1>Filter</h1>
            </div>
            <div className={styles.divider} />
            <div className={styles.sortBy}>
                <label htmlFor="sort">Sort by</label>
                <select id="sort" name="sort">
                    <option value="latest">Latest</option>
                    <option value="oldest">Oldest</option>
                    <option value="popular">Popular</option>
                </select>
            </div>
            <div className={styles.divider} />
            <div className={styles.newsOutlet}>
                <p>News Outlet:</p>
                <label className={styles.checkboxItem}>
                    <input type="checkbox" name="cbc" value="cbc" />
                    <span className={styles.customCheckbox}></span>
                    CBC
                </label>
                <label className={styles.checkboxItem}>
                    <input type="checkbox" name="national_post" value="national_post" />
                    <span className={styles.customCheckbox}></span>
                    The National Post
                </label>
                <label className={styles.checkboxItem}>
                    <input type="checkbox" name="toronto_star" value="toronto_star" />
                    <span className={styles.customCheckbox}></span>
                    Toronto Star
                </label>
                <label className={styles.checkboxItem}>
                    <input type="checkbox" name="ctv_news" value="ctv_news" />
                    <span className={styles.customCheckbox}></span>
                    CTV News
                </label>
                <label className={styles.checkboxItem}>
                    <input type="checkbox" name="global_news" value="global_news" />
                    <span className={styles.customCheckbox}></span>
                    Global News
                </label>
            </div>
            <div className={styles.divider} />
            <div className={styles.categories}>
                <p>Categories:</p>
                <label className={styles.checkboxItem}>
                    <input type="checkbox" name="environment" value="environment" />
                    <span className={styles.customCheckbox}></span>
                    Environment
                </label>
                <label className={styles.checkboxItem}>
                    <input type="checkbox" name="health" value="health" />
                    <span className={styles.customCheckbox}></span>
                    Health
                </label>
                <label className={styles.checkboxItem}>
                    <input type="checkbox" name="crimes" value="crimes" />
                    <span className={styles.customCheckbox}></span>
                    Crimes
                </label>
                <label className={styles.checkboxItem}>
                    <input type="checkbox" name="education" value="education" />
                    <span className={styles.customCheckbox}></span>
                    Education
                </label>
                <label className={styles.checkboxItem}>
                    <input type="checkbox" name="transportation" value="transportation" />
                    <span className={styles.customCheckbox}></span>
                    Transportation
                </label>
            </div>
            <button className={styles.resetBtn}>Reset Filter</button>

        </section>
    );
}

export default FilterTab;