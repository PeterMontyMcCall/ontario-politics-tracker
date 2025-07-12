import { useState } from "react";
import FilterTab from "../FilterTab/FilterTab.jsx";
import SearchBar from "../SearchBar/SearchBar.jsx";
import NewsFeed from "../NewsFeed/NewsFeed.jsx";
import styles from "./Layout.module.css";

function Layout() {
    const [searchTerm, setSearchTerm] = useState("");

    /* News Outlet */
    // Create a useState for every news outlet
    const [newsOutlets, setNewsOutlets] = useState({
        "cbc": false,
        "national_post": false,
        "toronto_star": false,
        "ctv_news": false,
        "global_news": false
    });

    /* Categories */
    // Create a useState for every category
    const [categories, setCategories] = useState({
        "environment": false,
        "health": false,
        "crimes": false,
        "education": false,
        "transportation": false
    });

    return (
        <div className={styles.layout}>
            <aside className={styles.sidebar}>
                <FilterTab
                    // Pass the useStates to FilterTab to update checkbox
                    newsOutlets={newsOutlets}
                    setNewsOutlets={setNewsOutlets}
                    categories={categories}
                    setCategories={setCategories}
                />
            </aside>
            <main className={styles.mainContent}>
                <SearchBar onSearch={setSearchTerm} />
                <NewsFeed
                    searchTerm={searchTerm}
                    // Pass categories and newsOutlets useStates to NewsFeed for filtering articles
                    newsOutlets={newsOutlets}
                    categories={categories}
                />
            </main>
        </div>
    );
}

export default Layout;