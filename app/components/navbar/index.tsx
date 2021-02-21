import React from 'react'
import styles from "./navbar.module.css";
const NavBar = () => {
    return (
        <nav>
            <ul className={styles.list} >
                <li className={styles.list_item}>Login</li>
                <li className={styles.list_item}>SignUp</li>
            </ul>
        </nav>
    )
}

export default NavBar
