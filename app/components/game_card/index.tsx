import React from 'react';
import styles from './game_card.module.css';

const GameCard = ({ homeTeamName, awayTeamName, scoreHomeTeam, scoreAwayTeam, status, matchday }) => {
  return (
    <section className={styles.card}>
      <div className={styles.info_container}>Jornada {matchday} de 38</div>
      <div className={styles.card_container}>
        <div className={styles.teams_container}>
          <p className={styles.team_name}>{homeTeamName}</p>
          <p className={styles.team_name}>{awayTeamName}</p>
        </div>
        <div className={styles.score_container}>
          <p className={styles.team_score}>{scoreHomeTeam}</p>
          <p className={styles.team_score}>{scoreAwayTeam}</p>
        </div>
      </div>
      <p className={styles.status}>{status}</p>
    </section>
  );
};

export default GameCard;
