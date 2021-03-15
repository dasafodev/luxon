import React from 'react';
import Image from 'next/image';
import styles from './championship_card.module.css';

const Championship = ({ emblem, champions }) => {
  return (
    <section className={styles.container}>
      <div className={styles.card}>
        <Image src={emblem} alt='Championship' width={180} height={180} />
        <p>{champions}</p>
      </div>
    </section>
  );
};

export default Championship;
