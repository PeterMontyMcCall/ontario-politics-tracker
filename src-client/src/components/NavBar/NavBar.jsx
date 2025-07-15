import { Link } from 'react-router-dom';
import styles from './NavBar.module.css'

function NavBar() {
    return (
        <nav className={styles.navbar}>
            <Link className={styles.title} to="/">
                Ontario Politics Tracker
            </Link>
            <div className={styles.menu}>
                <ul className={styles.menuItems}>
                    <li>
                        <Link to="/about">About</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default NavBar;