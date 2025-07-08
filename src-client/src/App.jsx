import NavBar from './components/NavBar/NavBar.jsx'
import SearchBar from './components/SearchBar/SearchBar.jsx'
import styles from './App.module.css'

function App() {

    return (
        <div className={styles.App}>
            <NavBar />
            <SearchBar />
        </div>
    )
}

export default App
