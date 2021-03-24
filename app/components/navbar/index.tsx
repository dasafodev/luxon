import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styles from './navbar.module.css';
import Image from 'next/image';
import Button from '../button';
import Link from 'next/link';
import firebase from '@fire-client';

import SearchBar from '@components/search_bar';

import useDimensions from '../../hooks/useDimensions';
import { useAppContext } from '../../context/state';

const NavBar = ({ onChange = null }) => {
  const { width } = useDimensions();
  const router = useRouter();
  const [fireUser, setFireUser] = useState<firebase.User>();

  const { favorites } = useAppContext();

  useEffect(() => {
    const unlisten = firebase.auth().onAuthStateChanged(
      (user) => setFireUser(user),
      (err) => console.warn(err),
    );

    return () => {
      unlisten();
    };
  }, []);

  const LoggedOptions = () => {
    return (
      <ul className={styles.list}>
        <Button onClick={() => router.push('/competition')} secondary={true}>
          Competiciones
        </Button>
        {favorites.length > 0 && (
          <Button onClick={() => router.push('/favorites')} secondary={true}>
            Favoritos
          </Button>
        )}
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
                  {router.pathname === '/' ? (
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='32'
                      height='32'
                      viewBox='0 0 20 20'
                      fill='currentColor'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z'
                      />
                    </svg>
                  ) : (
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
                        d='M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'
                      />
                    </svg>
                  )}
                </a>
              </Link>
            </li>
            <li className={styles.bottom_navbar_icons}>
              <Link href='/competition'>
                <a>
                  {router.pathname === '/competition' ? (
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='32'
                      height='32'
                      enableBackground='new 0 0 512 512'
                      viewBox='0 0 297 297'
                    >
                      <g xmlns='http://www.w3.org/2000/svg' fill='#fff'>
                        <path
                          d='M138.17 154.678v25.704a46.97 46.97 0 0120.66 0v-25.704a67.47 67.47 0 01-20.66 0zM229.164 233.984h-41.371c-4.241 0-7.801-3.393-7.785-7.634.062-17.425-14.096-31.622-31.508-31.622s-31.57 14.197-31.508 31.622c.015 4.241-3.545 7.634-7.785 7.634H67.836c-5.372 0-9.728 4.355-9.728 9.728v43.56c0 5.372 4.355 9.728 9.728 9.728h161.327c5.372 0 9.728-4.355 9.728-9.728v-43.56c0-5.372-4.355-9.728-9.727-9.728zm-41.408 39.773h-78.511a8.264 8.264 0 010-16.528h78.511a8.264 8.264 0 010 16.528zM77.463 96.579c-20.908-5.409-36.4-24.418-36.4-46.993V20.661h22.062A470.561 470.561 0 0162.326 0H30.733c-5.705 0-10.33 4.625-10.33 10.33v39.256c0 37.688 30.283 68.416 67.792 69.178-4.048-6.565-7.626-13.964-10.732-22.185zM266.267 0h-31.593c-.123 7.12-.39 14.007-.799 20.661h22.062v28.925c0 22.575-15.492 41.584-36.399 46.993-3.106 8.221-6.685 15.621-10.732 22.185 37.509-.762 67.792-31.489 67.792-69.178V10.33C276.597 4.625 271.972 0 266.267 0zM77.795 0c1.376 90.079 26.972 139.977 70.705 139.977S217.829 90.079 219.205 0H77.795z'
                          data-original='#000000'
                        ></path>
                      </g>
                    </svg>
                  ) : (
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='32'
                      height='32'
                      enableBackground='new 0 0 512 512'
                      viewBox='0 0 297 297'
                      stroke='white'
                    >
                      <g xmlns='http://www.w3.org/2000/svg' fill='#fff'>
                        <path
                          d='M202.194 128.144a94.439 94.439 0 002.775-4.355c32.056-2.345 57.426-29.157 57.426-61.801V27.381c0-5.566-4.513-10.079-10.079-10.079H227.73c.036-2.382.06-4.783.06-7.223C227.79 4.513 223.277 0 217.711 0H79.289C73.723 0 69.21 4.513 69.21 10.079c0 2.439.024 4.84.06 7.223H44.684c-5.566 0-10.079 4.513-10.079 10.079v34.606c0 32.644 25.37 59.456 57.426 61.801a93.903 93.903 0 002.775 4.355c13.548 19.957 29.907 27.398 43.615 29.624v16.411c-16.56 3.833-29.626 16.891-33.458 33.452H61.987c-5.566 0-10.079 4.513-10.079 10.079v69.21c0 5.566 4.513 10.079 10.079 10.079h173.026c5.566 0 10.079-4.513 10.079-10.079v-69.21c0-5.566-4.513-10.079-10.079-10.079h-42.975c-3.832-16.561-16.899-29.619-33.458-33.452v-16.411c13.707-2.225 30.066-9.666 43.614-29.623zm40.043-90.684v24.527c0 17.764-11.137 32.968-26.791 39.021 6.078-17.438 9.924-38.671 11.509-63.548h15.282zM54.763 61.987V37.46h15.282c1.584 24.877 5.431 46.111 11.509 63.548C65.9 94.955 54.763 79.751 54.763 61.987zm34.719-41.829h118.037c-1.723 75.328-23.015 118.262-59.018 118.262S91.204 95.487 89.482 20.158zm83.544 197.553c0 5.566 4.513 10.079 10.079 10.079h41.829v49.051H72.066V227.79h41.829c5.566 0 10.079-4.513 10.079-10.079 0-13.524 11.002-24.527 24.526-24.527s24.526 11.003 24.526 24.527z'
                          data-original='#000000'
                        ></path>
                        <path
                          d='M103.816 252.316c0 5.566 4.513 10.079 10.079 10.079h69.21c5.566 0 10.079-4.513 10.079-10.079s-4.513-10.079-10.079-10.079h-69.21c-5.566 0-10.079 4.513-10.079 10.079z'
                          data-original='#000000'
                        ></path>
                      </g>
                    </svg>
                  )}
                </a>
              </Link>
            </li>
            <li className={styles.bottom_navbar_icons}>
              <Link href='/favorites'>
                <a>
                  {router.pathname === '/favorites' ? (
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='32'
                      height='32'
                      viewBox='0 0 20 20'
                      fill='currentColor'
                    >
                      <path
                        strokeLinejoin='round'
                        strokeWidth='2'
                        fillRule='evenodd'
                        d='M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z'
                        clipRule='evenodd'
                      />
                    </svg>
                  ) : (
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
                  )}
                </a>
              </Link>
            </li>
            <li className={styles.bottom_navbar_icons}>
              <Link href='/profile'>
                <a>
                  {router.pathname === '/profile' ? (
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='32'
                      height='32'
                      viewBox='0 0 20 20'
                      fill='currentColor'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        fillRule='evenodd'
                        d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z'
                        clipRule='evenodd'
                      />
                    </svg>
                  ) : (
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
                  )}
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
