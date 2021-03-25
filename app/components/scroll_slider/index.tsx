import React from 'react';
import styles from './scroll_slider.module.css';
import Championship from '../championship_card';
import Shields from '@components/shields';

const ScrollSlider = ({ handleClick }) => {
  return (
    <section className={styles.container}>
      <div className={styles.scroll}>
        {Shields.map((shield) => (
          <div key={shield.id} onClick={() => handleClick(shield.code)}>
            <Championship emblem={shield.image} champions={shield.title} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default ScrollSlider;
