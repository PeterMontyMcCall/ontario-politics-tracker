import styles from './Pagination.module.css';

function Pagination({ totalPosts, postsPerPage, setCurrentPage, currentPage }) {
    let pages = [];

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pages.push(i);
    }

    return (
        <section className={styles.pagination}>
            {pages.map((page, index) => {
                return (
                    <button
                        key={index}
                        onClick={() => setCurrentPage(page)}
                        className={page == currentPage ? styles.active : ''}
                    >
                        {page}
                    </button>)
            })}
        </section>
    );
}

export default Pagination;