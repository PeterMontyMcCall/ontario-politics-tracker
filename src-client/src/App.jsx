import styles from './App.module.css'
import NavBar from './components/NavBar/NavBar.jsx'
import Layout from './components/Layout/Layout.jsx'

function App() {

    return (
        <div className={styles.App}>
            <NavBar />
            <Layout />
        </div>
    )
}

export default App
