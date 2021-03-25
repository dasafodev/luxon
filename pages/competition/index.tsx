import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import firebase from '@fire-client';
import '../../firebase/client';
// import { useAppContext } from 'app/context/state';
import NavBar from '@components/navbar';
import styles from '../../app/styles/index.module.css';
import stylesCompetition from './competition.module.css';
import GameCard from '@components/game_card';
import ScrollSlider from '@components/scroll_slider';
import Shields from '@components/shields';

const Competition = () => {
  const [data, setData] = useState([]);
  // const [idCode, setIdCode] = useState('2021');
  // const [matches, setMatches] = useState([]);
  // const [positions, setPositions] = useState([]);
  // const { games, positions } = useAppContext();
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
    fetchData();

    return () => {
      unlisten();
    };
  }, []);

  const fetchData = async () => {
    for (let index = 0; index < Shields.length; index++) {
      const idCode = Shields[index].id;
      const tempData = {};
      // Shields.forEach((shield) => {
      const response = await fetch(`/api/competitions/${idCode}/matches`);
      const dataResp = await response.json();
      tempData['matches'] = dataResp.matches;
      // setMatches(data.matches);

      const res = await fetch(`/api/competitions/${idCode}/standings/`);
      const positionsTable = await res.json();
      tempData['positions'] = positionsTable.standings[0].table;
      // setPositions(positionsTable.standings[0].table);

      const resScorers = await fetch(`/api/competitions/${idCode}/scorers/`);
      const goalScorer = await resScorers.json();
      // setScorers(goalScorer.scorers);
      tempData['scorers'] = goalScorer.scorers;
      tempData['id'] = idCode;
      setData([...data, tempData]);
    }
    console.warn(data);
  };

  const handleClick = async (newIdCode) => {
    // setIdCode(newIdCode);
    // await fetchData(newIdCode);
    console.warn(newIdCode);
  };

  return (
    <React.Fragment>
      <NavBar />
      <section className={styles.main}>
        <div className={stylesCompetition.scroll}>
          <ScrollSlider handleClick={handleClick} />
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
          {data[0].matches.map((game) => {
            const emblemHome = data[0].positions.filter((position) => position.team.id === game.homeTeam.id);
            const emblemAway = data[0].positions.filter((item) => item.team.id === game.awayTeam.id);
            if (emblemHome.length === 1) {
              cardMatch.push(
                <GameCard
                  key={game.id}
                  crestUrlHome={emblemHome[0].team.crestUrl}
                  // crestUrlHome='https://crests.football-data.org/65.svg'
                  homeTeamName={game.homeTeam.name}
                  awayTeamName={game.awayTeam.name}
                  crestUrlAway={emblemAway[0].team.crestUrl}
                  // crestUrlAway='https://crests.football-data.org/65.svg'
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
