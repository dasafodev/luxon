import NavBar from "@components/navbar";
import Image from "next/image";
import React, { useState } from "react";
import styles from "./profile.module.css";
import firebase from "@fire-client";

const Profile = () => {
  const [fireUser, setFireUser] = useState<firebase.User>(
    firebase.auth().currentUser
  );
  firebase.auth().onAuthStateChanged((user) => setFireUser(user));
  return (
    <React.Fragment>
      <NavBar />
      <div className={styles.container}>
        <div>
          <h2 className="title text-center">¡Estás en tu perfil!</h2>
          <Image
            height="300px"
            width="300px"
            alt="profile pic"
            src="/images/logo.png"
            className="rounded"
          ></Image>
          <h2 className="title">{fireUser.displayName}</h2>
          <p><strong>Email:  </strong> {fireUser.email}</p>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Profile;
