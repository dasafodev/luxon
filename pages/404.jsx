import React from 'react';
import Link from 'next/link';
import styles from '../app/styles/404.module.css';

const Custom404 = () => {
  return (
    <div className={styles.container}>
      <div className={styles.leftSide}>
        <img src='../public/images/logo.png' alt="Luxxon's Logo" width={50} height={50} />
        <h1>404</h1>
        <p>Ooops! la dirección qué buscas no la encontramos, por favor regresa a la</p>
        <Link>
          <a href='/'>página principal</a>
        </Link>
      </div>

      <img src='../public/images/img404.jpg' alt='Woman with yellow ball' />
    </div>
  );
};

export default Custom404();
