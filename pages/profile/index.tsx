import { useRouter } from 'next/router';
import Head from 'next/head';
import NavBar from '@components/navbar';
import Image from 'next/image';
import Footer from '@components/footer';
import React, { useState, useEffect } from 'react';
import styles from './profile.module.css';
import firebase, { signOut } from '@fire-client';
import Button from '@components/button';

const Profile = () => {
  const router = useRouter();

  const [fireUser, setFireUser] = useState<firebase.User>(firebase.auth().currentUser);

  useEffect(() => {
    const unlisten = firebase.auth().onAuthStateChanged(
      (user) => setFireUser(user),
      (err) => console.error(err),
    );
    if (!fireUser) {
      router.replace('/login');
    }

    return () => {
      unlisten();
    };
  }, [fireUser]);

  const [name, setName] = useState(fireUser ? fireUser.displayName : 'Bienvenido');

  const onChangeName = (val: React.ChangeEvent<HTMLInputElement>) => {
    setName(val.target.value);
    firebase.auth().currentUser.updateProfile({
      displayName: val.target.value,
    });
  };

  const logout = () => {
    router.replace('/');
    signOut();
  };

  return (
    <React.Fragment>
      <Head>
        <title>Luxxon - Perfil</title>
      </Head>
      <NavBar />
      <section className={styles.container}>
        <div>
          <h2 className='title text-center'>¡Estás en tu perfil!</h2>
          <Image
            height='250px'
            width='250px'
            alt='profile pic'
            src='/images/logo.png'
            className='rounded'
            layout='responsive'
          />
          <input type='edit' className={styles.input} value={name} onChange={(val) => onChangeName(val)} />
          <p className={styles.info}>
            <strong className={styles.info_highlight}>Email: </strong> {fireUser ? fireUser.email : ''}
          </p>
          <Button onClick={logout} customeStyle={styles.logout_button}>
            Cerrar sesión
          </Button>
        </div>
        <Footer />
      </section>
    </React.Fragment>
  );
};

export default Profile;
