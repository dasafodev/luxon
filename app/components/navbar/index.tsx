import React from "react";
import styles from "./navbar.module.css";
import { loginWithGmail } from "./../../../firebase/client";
import Image from "next/image";
import Button from "../button";

const NavBar = () => {
  return (
    <nav className={styles.nav}>
      <Image
        src="/images/logo.png"
        alt="Logo"
        width={50}
        height={50}
      />
      <ul className={styles.list}>
        <Button secondary={true}>
        Login
        </Button>
        <Button>
        SignUp
        </Button>
      </ul>
    </nav>
  );
};

export default NavBar;
