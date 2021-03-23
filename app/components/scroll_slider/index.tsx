import React, { useState, useEffect } from 'react';
import { useAppActions } from 'app/context/state';
import styles from './scroll_slider.module.css';
import Championship from '../championship_card';
import Shields from '@components/shields';

const ScrollSlider = () => {
  const [idCode, setIdCode] = useState('2021');
  const { setGames, setPositions, setScorers } = useAppActions();

  const handleChampions = (code) => {
    setIdCode(code);
  };

  const fetchData = async () => {
    const response = await fetch(`/api/competitions/${idCode}/matches`);
    const data = await response.json();
    setGames(data.matches);

    const res = await fetch(`/api/competitions/${idCode}/standings/`);
    const positionsTable = await res.json();
    setPositions(positionsTable.standings[0].table);

    const resScorers = await fetch(`/api/competitions/${idCode}/scorers/`);
    const goalScorer = await resScorers.json();
    setScorers(goalScorer.scorers);
  };

  useEffect(() => {
    fetchData().then();
  }, [idCode]);

  return (
    <section className={styles.container}>
      <div className={styles.scroll}>
        {Shields.map((shield) => (
          <div key={shield.id} onClick={() => handleChampions(shield.code)}>
            <Championship emblem={shield.image} champions={shield.title} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default ScrollSlider;
