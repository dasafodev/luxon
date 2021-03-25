import React, { useState, useEffect } from 'react';
import styles from './match_details_layout.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { DateTime } from 'luxon';

const MatchDetails = () => {
  const [data, setData] = useState({
    utcDate: '',
    homeTeam: { crestUrl: '', name: '', role: '', id: '', squad: [] },
    competition: { name: '' },
    awayTeam: { crestUrl: '', name: '', role: '', id: '', squad: [] },
    id: '',
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setData(JSON.parse(window.localStorage.getItem('detail')));
    }
  }, []);

  const hour = DateTime.fromISO(data.utcDate).setLocale('en-US').toFormat('t');

  return (
    <div>
      <h1 className={styles.title}>Información del partido</h1>
      <div className={styles.container}>
        <div className={styles.containerTeam}>
          <figure className={styles.containerLogoTeam}>
            <img className={styles.logoTeam} src={data.homeTeam.crestUrl} alt='Home team`s logo' />
          </figure>
          <h2 className={styles.nameTeam}>{data.homeTeam.name}</h2>
          <Link href={`/live/${data.homeTeam.id}-${data.id}`}>
            <a className={styles.aVideoCall}>
              <Image
                src='/images/icons/videoConference.png'
                alt='Video conference with fans around the world'
                width={70}
                height={70}
              />
            </a>
          </Link>
          <ul className={styles.containerPlayers}>
            {data.awayTeam.squad.map((player) => {
              if (player.role === 'PLAYER') {
                return (
                  <li key={player.id}>
                    <p className={styles.playerName}> {player.name}</p>
                    <p className={styles.playerPosition}> {player.position}</p>
                  </li>
                );
              }
            })}
          </ul>
        </div>
        <div className={styles.time}>
          <p className={styles.timeHour}>{hour}</p>
          <p className={styles.competition}>{data.competition.name}</p>
        </div>
        <div className={styles.containerTeam}>
          <figure className={styles.containerLogoTeam}>
            <img className={styles.logoTeam} src={data.awayTeam.crestUrl} alt='Away team`s logo' />
          </figure>
          <h2 className={styles.nameTeam}>{data.awayTeam.name}</h2>
          <Link href={`/live/${data.awayTeam.id}-${data.id}`}>
            <a className={styles.aVideoCall}>
              <Image
                src='/images/icons/videoConference.png'
                alt='Video conference with fans around the world'
                width={70}
                height={70}
              />
            </a>
          </Link>
          <ul className={styles.containerPlayers}>
            {data.awayTeam.squad.map((player) => {
              if (player.role === 'PLAYER') {
                return (
                  <li key={player.id}>
                    <p className={styles.playerName}> {player.name}</p>
                    <p className={styles.playerPosition}> {player.position}</p>
                  </li>
                );
              }
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MatchDetails;
