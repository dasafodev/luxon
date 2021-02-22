import React from "react";
import styles from "./navbar.module.css";
import { loginWithGmail } from "./../../../firebase/client";

const NavBar = () => {
    
  return (
    <nav>
      <ul className={styles.list}>
        <li onClick={loginWithGmail} className={styles.list_item}>
          Login
        </li>
        <li className={styles.list_item}>SignUp</li>
      </ul>
    </nav>
  );
};

export default NavBar;
