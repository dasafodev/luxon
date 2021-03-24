import React, { useState, useEffect } from 'react';
import styles from './match_details_layout.module.css';
import Image from 'next/image';

const MatchDetails = () => {
  const [data, setData] = useState();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setData(JSON.parse(window.localStorage.getItem('detail')));
      console.warn(data);
    }
  }, []);

  return (
    <div>
      <h1 className={styles.title}>Información del partido</h1>
      <div className={styles.container}>
        <div className={styles.containerTeam}>
          <figure className={styles.containerLogoTeam}>
            <img className={styles.logoTeam} src={data?.homeTeam.crestUrl} alt='Home team`s logo' />
          </figure>
          <h2 className={styles.nameTeam}>{data?.homeTeam.name}</h2>
          <button className={styles.buttonVideoCall} type='button'>
            <figure className={styles.figure}>
              <Image
                src='/images/icons/videoConference.png'
                alt='Video conference with fans around the world'
                width={50}
                height={50}
              />
            </figure>
          </button>
          <div className={styles.containerPlayers}>
            <p className={styles.playerName}>{data?.homeTeam.squad.name}</p>
            <p className={styles.playerPosition}>{data?.homeTeam.squad.position}</p>
          </div>
        </div>
        <div className={styles.time}>
          <p className={styles.timeHour}>{data?.season.utcDate}</p>
          <p className={styles.competition}>{data?.awayTeam.activeCompetitions.name}</p>
        </div>
        <div className={styles.containerTeam}>
          <figure className={styles.containerLogoTeam}>
            <img
              className={styles.logoTeam}
              src={data?.awayTeam.crestUrl}
              alt='Away team`s logo'
              width={150}
              height={150}
            />
          </figure>
          <h2 className={styles.nameTeam}>{data?.awayTeam.name}</h2>
          <button className={styles.buttonVideoCall} type='button'>
            <figure className={styles.figure}>
              <Image
                src='/images/icons/videoConference.png'
                alt='Video conference with fans around the world'
                width={50}
                height={50}
              />
            </figure>
          </button>
          <div className={styles.containerPlayers}>
            <p className={styles.playerName}>{data?.awayTeam.squad.name}</p>
            <p className={styles.playerPosition}>{data?.homeTeam.squad.position}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchDetails;
