import styles from './SearchBar.module.css'

function SearchBar() {
    return (
        <>
            <form>
                <div className={styles.search}>
                    <span className={`material-symbols-outlined`}>search</span>
                    <input className={styles.search_input} type="search" placeholder="Search for articles" />
                </div>
            </form>
        </>
    );
}

export default SearchBar;