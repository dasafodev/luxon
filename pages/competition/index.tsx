import React from 'react';
import Link from 'next/link';
import { useAppContext } from 'app/context/state';
import NavBar from '@components/navbar';
import styles from '../../app/styles/index.module.css';
import stylesCompetition from './competition.module.css';
import GameCard from '@components/game_card';
import ScrollSlider from '@components/scroll_slider';

const Competition = () => {
  const { games } = useAppContext();

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
          {games.map((game) => (
            <GameCard
              key={game.id}
              homeTeamName={game.homeTeam.name}
              awayTeamName={game.awayTeam.name}
              scoreHomeTeam={game.score.fullTime.homeTeam}
              scoreAwayTeam={game.score.fullTime.awayTeam}
              status={game.status}
              matchday={game.matchday}
            />
          ))}
        </section>
      </section>
    </React.Fragment>
  );
};

export default Competition;
