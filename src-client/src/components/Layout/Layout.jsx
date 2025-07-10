import FilterTab from "../FilterTab/FilterTab.jsx";
import SearchBar from "../SearchBar/SearchBar.jsx";
import NewsFeed from "../NewsFeed/NewsFeed.jsx";
import styles from "./Layout.module.css";

function Layout() {
    return (
        <div className={styles.layout}>
            <aside className={styles.sidebar}>
                <FilterTab />
            </aside>
            <main className={styles.mainContent}>
                <SearchBar />
                <NewsFeed />
            </main>
        </div>
    );
}

export default Layout;