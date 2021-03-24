import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import firebase from '@fire-client';
import '../../firebase/client';
import { useAppContext } from 'app/context/state';
import NavBar from '@components/navbar';
import styles from '../../app/styles/index.module.css';
import stylesCompetition from './competition.module.css';
import GameCard from '@components/game_card';
import ScrollSlider from '@components/scroll_slider';

const Competition = () => {
  const { games, positions } = useAppContext();
  const router = useRouter();
  const [, setFireUser] = useState<firebase.User>(firebase.auth().currentUser);
  const cardMatch = [];

  useEffect(() => {
    const unlisten = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setFireUser(user);
      } else {
        router.replace('/login');
      }
    });

    return () => {
      unlisten();
    };
  }, []);

  return (
    <React.Fragment>
      <NavBar />
      <section className={styles.main}>
        <div className={stylesCompetition.scroll}>
          <ScrollSlider />
        </div>
        <nav className={stylesCompetition.navCompetition}>
          <ul className={stylesCompetition.list}>
            <li className={stylesCompetition.item}>
              <Link href='/competition/standings'>
                <a>Clasificación</a>
              </Link>
            </li>
            <li className={stylesCompetition.item}>
              <Link href='/competition/scorers'>
                <a>Estadísticas</a>
              </Link>
            </li>
          </ul>
        </nav>
        <section className={stylesCompetition.cards_container}>
          {games.map((game) => {
            const emblemHome = positions.filter((position) => position.team.id === game.homeTeam.id);
            const emblemAway = positions.filter((item) => item.team.id === game.awayTeam.id);
            if (emblemHome.length === 1) {
              cardMatch.push(
                <GameCard
                  key={game.id}
                  crestUrlHome={emblemHome[0].team.crestUrl}
                  homeTeamName={game.homeTeam.name}
                  awayTeamName={game.awayTeam.name}
                  crestUrlAway={emblemAway[0].team.crestUrl}
                  scoreHomeTeam={game.score.fullTime.homeTeam}
                  scoreAwayTeam={game.score.fullTime.awayTeam}
                  status={game.status}
                  matchday={game.matchday}
                />,
              );
            }
          })}
          {cardMatch}
        </section>
      </section>
    </React.Fragment>
  );
};

export default Competition;
