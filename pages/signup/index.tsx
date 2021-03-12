import LoginLayout from '@components/login_layout';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import style from './signup.module.css';
import Button from '@components/button';
import fire, { signupEmail } from '@fire-client';
import { useRouter } from 'next/router';
import firebase from 'firebase/app';

const Signup = () => {
  const router = useRouter();
  const [, setFireUser] = useState<fire.User>(fire.auth().currentUser);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onClickSignup = async () => {
    const user: firebase.User = (await signupEmail(email, password)).user;
    await user.updateProfile({
      displayName: name,
    });
    router.push('/');
  };

  useEffect(() => {
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        setFireUser(user);
        router.replace('/');
      }
    });
  }, []);

  return (
    <LoginLayout>
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
