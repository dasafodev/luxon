import React, { useState } from "react";
import { useRouter } from "next/router";
import styles from "./navbar.module.css";
import Image from "next/image";
import Button from "../button";
import Link from "next/link";
import firebase, { signOut } from "@fire-client";
import SearchBar from "@components/search_bar";

import useDimensions from "../../hooks/useDimensions";

const NavBar = () => {
  const [fireUser, setFireUser] = useState<firebase.User>(null);
  firebase.auth().onAuthStateChanged((user) => setFireUser(user));
  const router = useRouter();

  const { width } = useDimensions();

  return (
    <nav className={styles.nav}>
      <Link href="/">
        <a>
          <Image src="/images/logo.png" alt="Logo" width={50} height={50} />
        </a>
      </Link>
      {!!(width >= 768) ? (
        router.pathname != "/login" &&
        router.pathname != "/signup" &&
        !fireUser ? (
          <SearchBar />
        ) : null
      ) : null}
      {!!(width >= 768) ? (
        router.pathname != "/login" &&
        router.pathname != "/signup" &&
        !fireUser ? (
          <ul className={styles.list}>
            <Button onClick={() => router.push("/login")} secondary={true}>
              Login
            </Button>
            <Button onClick={() => router.push("/signup")}>SignUp</Button>
          </ul>
        ) : fireUser != undefined ? (
          welcome(fireUser)
        ) : null
      ) : null}
    </nav>
  );
};

const welcome = (fireUser: firebase.User) => {
  return (
    <ul className={styles.list}>
      <h3 className={styles.name}>{"Bienvenido " + fireUser?.displayName}</h3>
      <Image
        onClick={() => signOut()}
        src="/images/icons/logout.png"
        alt="Logout"
        width={24}
        height={24}
      />
    </ul>
  );
};

export default NavBar;
