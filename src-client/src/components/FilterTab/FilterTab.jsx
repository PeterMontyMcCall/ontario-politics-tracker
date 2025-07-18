import newsOutletsObject from '../../../../src-shared/newsOutlet.js';
import categoryOptions from '../../data/category.json'
import styles from './FilterTab.module.css';

function FilterTab({ newsOutlets, setNewsOutlets, categories, setCategories, date, setDate }) {
    // Change the state of the checkbox group (e.g., news outlets or categories)
    const handleCheckboxChange = (event, setState) => {
        const { value, checked } = event.target;
        // Create a new object (copying the previous state),
        // update the selected value,
        // and set the new state
        setState(prev => ({
            ...prev,
            [value]: checked
        }));
        // setState(prev => {
        //     const newState = { ...prev, [value]: checked };
        //     console.log('Checkbox state:', newState); // <--- Add this
        //     return newState;
        // });
    };

    // Reset button functionality
    // Clears all the checkboxes when clicked
    const resetButtonClick = () => {
        setNewsOutlets(prev =>
            Object.fromEntries(Object.keys(prev).map(key => [key, false]))
        )

        setCategories(prev =>
            Object.fromEntries(Object.keys(prev).map(key => [key, false]))
        );
    }

    // Date drop down menu
    const handleSelectChange = (event) => {
        const { value } = event.target;
        setDate(value);
        console.log(date);
    }

    const newsOutletOptions = Object.values(newsOutletsObject);

    return (
        <section className={styles.filter}>
            <div className={styles.filterHeader}>
                <span className={`material-symbols-outlined`}>tune</span>
                <h1>Filter</h1>
            </div>
            <div className={styles.divider} />
            <div className={styles.sortBy}>
                <label htmlFor="sort">Sort by</label>
                <select value={date} id="sort" name="sort" onChange={handleSelectChange}>
                    <option value=""></option>
                    <option value="desc">Latest</option>
                    <option value="asc">Oldest</option>
                </select>
            </div>
            <div className={styles.divider} />
            <div className={styles.newsOutlet}>
                <p>News Outlet:</p>
                {newsOutletOptions.map((outlet) => (
                    <label key={outlet.id} className={styles.checkboxItem}>
                        <input
                            type="checkbox"
                            name={outlet.name}
                            value={outlet.id}
                            checked={newsOutlets[outlet.id]}
                            onChange={e => handleCheckboxChange(e, setNewsOutlets)} // Create a function so React re-renders
                        />
                        <span className={styles.customCheckbox}></span>
                        {outlet.name}
                    </label>
                ))}
            </div>
            <div className={styles.divider} />
            <div className={styles.categories}>
                <p>Categories:</p>
                {categoryOptions.map((category) => (
                    <label key={category.id} className={styles.checkboxItem}>
                        <input
                            type="checkbox"
                            name={category.name}
                            value={category.value}
                            checked={categories[category.value]}
                            onChange={e => handleCheckboxChange(e, setCategories)} // Create a function so React re-renders
                        />
                        <span className={styles.customCheckbox}></span>
                        {category.source}
                    </label>
                ))}
            </div>
            <button
                className={styles.resetBtn}
                onClick={resetButtonClick}
            >
                Reset Filter</button>
        </section>
    );
}

export default FilterTab;