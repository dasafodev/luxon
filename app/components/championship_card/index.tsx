import React from 'react';
import Image from 'next/image';
import styles from './championship_card.module.css';

const Championship = ({ emblem, champions }) => {
  return (
    <section>
      <div className={styles.container}>
        <div className={styles.card}>
          <Image src={emblem} alt='Championship' width={180} height={180} className={styles.image} />
        </div>
      </div>
      <p className={styles.title}>{champions}</p>
    </section>
  );
};

export default Championship;
