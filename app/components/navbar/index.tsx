import React, { useState } from 'react';
import { useRouter } from 'next/router';
import styles from './navbar.module.css';
import Image from 'next/image';
import Button from '../button';
import Link from 'next/link';
import firebase from '@fire-client';

import SearchBar from '@components/search_bar';

import useDimensions from '../../hooks/useDimensions';

const NavBar = ({ onChange = null }) => {
  const { width } = useDimensions();
  firebase.auth().onAuthStateChanged((user) => setFireUser(user));
  const router = useRouter();
  const [fireUser, setFireUser] = useState<firebase.User>(null);

  const LoggedOptions = () => {
    return (
      <ul className={styles.list}>
        <Button onClick={() => router.push('/favorites')} secondary={true}>
          Favoritos
        </Button>
        <Button onClick={() => router.push('/profile')}>Perfil</Button>
      </ul>
    );
  };

  return (
    <>
      <nav className={styles.nav}>
        <Link href='/'>
          <a>
            <Image src='/images/logo.png' alt='Logo' width={50} height={50} />
          </a>
        </Link>
        {width >= 768 ? (
          router.pathname != '/login' && router.pathname != '/signup' ? (
            <SearchBar onChange={onChange} />
          ) : null
        ) : null}
        {width >= 768 ? (
          router.pathname != '/login' && router.pathname != '/signup' && !fireUser ? (
            <ul className={styles.list}>
              <Button onClick={() => router.push('/login')} secondary={true}>
                Login
              </Button>
              <Button onClick={() => router.push('/signup')}>SignUp</Button>
            </ul>
          ) : fireUser != undefined ? (
            LoggedOptions()
          ) : null
        ) : (
          <ul className={styles.bottom_navbar}>
            <li className={styles.bottom_navbar_icons}>
              <Link href='/'>
                <a>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='32'
                    height='32'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'
                    />
                  </svg>
                </a>
              </Link>
            </li>
            <li className={styles.bottom_navbar_icons}>
              <Link href='/search'>
                <a>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='32'
                    height='32'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='white'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
                    />
                  </svg>
                </a>
              </Link>
            </li>
            <li className={styles.bottom_navbar_icons}>
              <Link href='/favorites'>
                <a>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='32'
                    height='32'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z'
                    />
                  </svg>
                </a>
              </Link>
            </li>
            <li className={styles.bottom_navbar_icons}>
              <Link href='/profile'>
                <a>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='32'
                    height='32'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='white'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z'
                    />
                  </svg>
                </a>
              </Link>
            </li>
          </ul>
        )}
      </nav>
    </>
  );
};

export default NavBar;
