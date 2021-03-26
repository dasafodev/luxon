import React from 'react';
import Link from 'next/link';
import styles from './footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p className={styles.p}>Diseñado &amp; Desarrollado con &#128154; por:</p>
      <Link href='https://www.linkedin.com/in/mauricio-rodriguez-avila/'>
        <a className={styles.a} target='_blank'>
          @Mauricio Rodriguez
        </a>
      </Link>
      <Link href='https://www.linkedin.com/in/pabloverduzco/'>
        <a className={styles.a} target='_blank'>
          @Pablo Verduzco
        </a>
      </Link>
      <Link href='https://www.linkedin.com/in/dasafodev/'>
        <a className={styles.a} target='_blank'>
          @Santiago Forero
        </a>
      </Link>
      <Link href='https://www.linkedin.com/in/jorgeariasarguelles/'>
        <a className={styles.a} target='_blank'>
          @Jorge Arias Argüelles
        </a>
      </Link>
    </footer>
  );
};

export default Footer;
