import React from 'react';
import styles from './match_details_layout.module.css';

const MatchDetails = () => {
  return (
    <div>
      <h1 className={styles.title}>Información del partido</h1>
      <div className={styles.container}>
        <div className={styles.containerTeam}>
          <h2 className={styles.nameTeam}>FC Barcelona </h2>
          <img src='../../../public/images/barcelona.png' alt='Barcelona`s logo' height={140} width={140} />
          <button className={styles.buttonVideoCall} type='button'>
            <img
              src='../../../public/images/icons/videoConference.png'
              alt='Video conference with fans around the world'
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
        <div className={styles.containerTeam}>
          <h2 className={styles.nameTeam}>Real Madrid </h2>
          <img src='../../../public/images/real-madrid.png' alt='RealMadrid`s logo' />
          <button className={styles.buttonVideoCall} type='button'>
            <img
              src='../../../public/images/icons/videoConference.png'
              alt='Video conference with fans around the world'
              width={50}
              height={50}
            />
          </button>
          <div className={styles.containerPlayers}>
            <p className={styles.playerName}>Player name</p>
            <p className={styles.playerPosition}>Player position</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchDetails;
