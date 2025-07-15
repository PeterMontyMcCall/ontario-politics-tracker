import { Routes, Route } from 'react-router-dom';
import styles from './App.module.css';
import NavBar from './components/NavBar/NavBar.jsx';
import Layout from './components/Layout/Layout.jsx';
import About from './components/About/About.jsx';

function App() {
    return (
        <div className={styles.App}>
            <NavBar />
            <Routes>
                <Route path="/" element={<Layout />} />
                <Route path="/about" element={<About />} />
            </Routes>
        </div>
    )
}

export default App
