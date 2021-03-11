import React from 'react';
import styles from './match_details_layout.module.css';

const MatchDetails = () => {
  return (
    <>
      <h1 className={styles.title}>Información del partido</h1>
      <div className={styles.container}>
        <div className={styles.leftTeam}>left team</div>
        <div className={styles.time}>
          <p className='bold'>7.00pm</p>
          <p className={styles.competition}>ChampionsLeague</p>
        </div>
        <div className={styles.rightTeam}>right team</div>
      </div>
    </>
  );
};

export default MatchDetails;
