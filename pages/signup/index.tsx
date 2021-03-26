import LoginLayout from '@components/login_layout';
import Link from 'next/link';
import Head from 'next/head';
import React, { useState, useEffect } from 'react';
import style from './signup.module.css';
import Button from '@components/button';
import firebase, { signupEmail } from '@fire-client';
import { useRouter } from 'next/router';

const Signup = () => {
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user !== null) {
        router.push('/');
      }
    });
    return () => unsubscribe();
  }, []);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onClickSignup = async () => {
    const user: firebase.User = (await signupEmail(email, password)).user;
    await user.updateProfile({
      displayName: name,
    });
  };

  return (
    <LoginLayout>
      <Head>
        <title>Luxxon - Registro</title>
      </Head>
      <h2 className={style.title}>Crea tu cuenta</h2>
      <form className={style.credentials_form}>
        <input
          placeholder='Nombre'
          onChange={(value) => setName(value.target.value)}
          className={style.input}
          type='text'
        />
        <input
          placeholder='Correo electrónico'
          onChange={(value) => setEmail(value.target.value)}
          className={style.input}
          type='text'
        />
        <input
          placeholder='Contraseña'
          onChange={(value) => setPassword(value.target.value)}
          className={style.input}
          type='password'
        />
      </form>
      <Button buttonClass='mt-3 ml-0' onClick={onClickSignup}>
        Registrarte
      </Button>
      <p>
        ¿Ya tienes una cuenta?{'  '}
        <Link href='/login'>
          <strong> Inicia sesión</strong>
        </Link>
      </p>
    </LoginLayout>
  );
};

export default Signup;
