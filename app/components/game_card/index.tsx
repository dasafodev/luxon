import React from 'react';
import Image from 'next/image';
import styles from './game_card.module.css';

const GameCard = ({
  crestUrlHome,
  crestUrlAway,
  homeTeamName,
  awayTeamName,
  scoreHomeTeam,
  scoreAwayTeam,
  status,
  matchday,
}) => {
  return (
    <section className={styles.card}>
      <div className={styles.info_container}>Jornada {matchday} de 38</div>
      <div className={styles.card_container}>
        <div className={styles.one}>
          <Image src={crestUrlHome} alt='shield' width={30} height={30} />
        </div>
        <div className={styles.two}>
          <p className={styles.team_name}>{homeTeamName}</p>
        </div>
        <div className={styles.three}>
          <p className={styles.team_score}>{scoreHomeTeam}</p>
        </div>
        <div className={styles.four}>
          <Image src={crestUrlAway} alt='shield' width={30} height={30} />
        </div>
        <div className={styles.five}>
          <p className={styles.team_name}>{awayTeamName}</p>
        </div>
        <div className={styles.six}>
          <p className={styles.team_score}>{scoreAwayTeam}</p>
        </div>
      </div>
      <p className={styles.status}>{status}</p>
    </section>
  );
};

export default GameCard;
