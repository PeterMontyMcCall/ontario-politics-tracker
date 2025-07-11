import { useState } from 'react';
import styles from './SearchBar.module.css'

function SearchBar({ onSearch }) {
    // Search bar function
    const [query, setQuery] = useState("")

    // Called when the form is submitted
    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(query);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className={styles.search}>
                <span className={`material-symbols-outlined`}>search</span>
                <input
                    className={styles.search_input}
                    type="search"
                    placeholder="Search for articles"
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                />
            </div>
        </form>
    );
}

export default SearchBar;