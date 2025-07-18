import styles from './About.module.css';

function About() {
    return (
        <div className={styles.aboutContainer}>
            <h1>About</h1>
            <p>
                The Ontario Politics Tracker is a web application that helps users stay up-to-date on political news and policies in Ontario.
                Articles are automatically fetched from trusted outlets such as CBC, Global News, Toronto Star, and others, and renewed every hour.
            </p><br />
            <p>
                Articles are categorized by key topics including Health, Education, Crime, Transportation, Environment, and Legislation.
                The application allows filtering and searching through articles to track specific issues of interest.
            </p><br />
            <div className={styles.divider} />
            <p>
                Built by Peter Pham using Node.js, Express.js, PostgreSQL, and React.js.
            </p>
            <a href="https://github.com/PeterMontyMcCall/ontario-politics-tracker" target="_blank" rel="noopener noreferrer">Github</a>
        </div>
    )
}

export default About;