import { useState } from "react";
import FilterTab from "../FilterTab/FilterTab.jsx";
import SearchBar from "../SearchBar/SearchBar.jsx";
import NewsFeed from "../NewsFeed/NewsFeed.jsx";
import Pagination from "../Pagination/Pagination.jsx";
import styles from "./Layout.module.css";

function Layout() {
    // Search bar
    const [searchTerm, setSearchTerm] = useState("");

    // Date drop down menu
    const [date, setDate] = useState("");

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

    /* Pagination */
    const [totalPosts, setTotalPosts] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsperPage] = useState(3);

    return (
        <div className={styles.layout}>
            <aside className={styles.sidebar}>
                <FilterTab
                    // Pass the useStates to FilterTab to update checkbox
                    newsOutlets={newsOutlets}
                    setNewsOutlets={setNewsOutlets}
                    categories={categories}
                    setCategories={setCategories}
                    date={date}
                    setDate={setDate}
                />
            </aside>
            <main className={styles.mainContent}>
                <SearchBar onSearch={setSearchTerm} />
                <NewsFeed
                    searchTerm={searchTerm}
                    // Pass categories, newsOutlets and date useStates to NewsFeed for filtering articles
                    newsOutlets={newsOutlets}
                    categories={categories}
                    date={date}
                    // Past down states and useStates for Pagination
                    currentPage={currentPage}
                    postsPerPage={postsPerPage}
                    setTotalPosts={setTotalPosts}
                />
                <Pagination
                    totalPosts={totalPosts}
                    postsPerPage={postsPerPage}
                    setCurrentPage={setCurrentPage}
                    currentPage={currentPage}
                />
            </main>
        </div>
    );
}

export default Layout;