import styles from './App.module.css'
import NavBar from './components/NavBar/NavBar.jsx'
import SearchBar from './components/SearchBar/SearchBar.jsx'
import NewsFeed from './components/NewsFeed/NewsFeed.jsx'

function App() {

    return (
        <div className={styles.App}>
            <NavBar />
            <SearchBar />
            <NewsFeed />
        </div>
    )
}

export default App
