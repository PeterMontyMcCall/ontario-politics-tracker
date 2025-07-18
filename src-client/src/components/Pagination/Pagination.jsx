import styles from './Pagination.module.css';

function Pagination({ totalPosts, postsPerPage, setCurrentPage, currentPage }) {
    // Default to 0 if undefined, and compute total pages
    const total = Number.isFinite(totalPosts) ? totalPosts : 0;
    const totalPages = Math.ceil(total / postsPerPage);

    if (totalPages < 1) return null; // Don’t render anything if no pages

    const pageNumbers = getPageNumbers(currentPage, Math.ceil(totalPosts / postsPerPage));

    return (
        <section className={styles.pagination}>
            {pageNumbers.map((page, index) => {
                return (
                    <button
                        key={index}
                        onClick={() => typeof page === "number" && setCurrentPage(page)}
                        className={page === currentPage ? styles.active : ''}
                        disabled={page === "..."}
                    >
                        {String(page)}
                    </button>)
            })}
        </section>
    );
}

function getPageNumbers(currentPage, totalPages, maxButtons = 5) {
    const pages = [];

    if (totalPages <= maxButtons) {
        // Less than max buttons then show all
        for (let i = 1; i <= totalPages; i++) {
            pages.push(i);
        }
    } else {
        pages.push(1);

        // The page window, never the first and last page
        let start = Math.max(2, currentPage - 1);
        let end = Math.min(totalPages - 1, currentPage + 1);

        // Ellipsis before the current page
        if (start > 2) {
            pages.push("...");
        }

        for (let i = start; i <= end; i++) {
            pages.push(i);
        }

        // Ellipsis after the current page
        if (end < totalPages - 1) {
            pages.push("...");
        }

        pages.push(totalPages);
    }
    return pages;
}

export default Pagination;