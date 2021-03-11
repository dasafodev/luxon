import React from 'react';
import styles from './match_details_layout.module.css';

const MatchDetails = () => {
  return (
    <div>
      <h1 className={styles.title}>Información del partido</h1>
      <div className={styles.container}>
        <div className={styles.leftTeam}>
          <h2 className={styles.nameTeam}>FC Barcelona </h2>
          <button className={styles.conference} type='button'>
            <img
              src='../../../public/images/icons/videoConference.png'
              alt='imagen para conocer hinchas de tú equipo de todo el mundo'
              width={50}
              height={50}
            />
          </button>
          <div className={styles.containerPlayers}>
            <p className={styles.playerName}>Player name</p>
            <p className={styles.playerPosition}>Player position</p>
          </div>
        </div>
        <div className={styles.time}>
          <p className='bold'>7.00pm</p>
          <p className={styles.competition}>ChampionsLeague</p>
        </div>
        <div className={styles.rightTeam}>right team</div>
      </div>
    </div>
  );
};

export default MatchDetails;
