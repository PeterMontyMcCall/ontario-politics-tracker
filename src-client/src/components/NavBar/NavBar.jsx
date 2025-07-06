import styles from './NavBar.module.css'

function NavBar() {
    return (
        <nav className={styles.navbar}>
            <a className={styles.title} href="/">
                Ontario Politics Tracker
            </a>
            <div className={styles.menu}>


                <ul className={styles.menuItems}>
                    <li>
                        <a href="/">About</a>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default NavBar;