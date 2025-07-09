import styles from './App.module.css'
import NavBar from './components/NavBar/NavBar.jsx'
import SearchBar from './components/SearchBar/SearchBar.jsx'
import NewsFeed from './components/NewsFeed/NewsFeed.jsx'
import FilterTab from './components/FilterTab/FilterTab.jsx'

function App() {

    return (
        <div className={styles.App}>
            <NavBar />
            <SearchBar />
            <NewsFeed />
            <FilterTab />
            <div className={styles.mainFeed}>
                <SearchBar />
                <NewsFeed />
            </div>
        </div>
    )
}

export default App
