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
  const [name, setName] = useState(
    fireUser ? fireUser.displayName : "Bienvenido"
  );

  const onChangeName = (val: React.ChangeEvent<HTMLInputElement>) => {
    setName(val.target.value);
    firebase.auth().currentUser.updateProfile({
      displayName: val.target.value,
    });
  };

  
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
            layout="responsive"
          ></Image>
          <input
            type="edit"
            className={styles.input}
            value={name}
            onChange={(val) => onChangeName(val)}
          />
          <p className={styles.info}>
            <strong className={styles.info_highlight}>Email: </strong>{" "}
            {fireUser ? fireUser.email : ""}
          </p>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Profile;
