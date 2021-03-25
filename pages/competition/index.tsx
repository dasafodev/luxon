import React, { useState, useEffect } from 'react';
// import Link from 'next/link';
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
import Standings from '../../app/components/standings';
import Scorers from '../../app/components/scorers';

export const getStaticProps = async () => {
  const protocol = process.env.HOST_NAME == 'localhost:3000' ? 'http' : 'https';
  const data = [];
  for (let index = 0; index < Shields.length; index++) {
    const idCode = Shields[index].code;
    console.warn('idCode', idCode);
    const tempData = {};
    const response = await fetch(`${protocol}://${process.env.HOST_NAME}/api/competitions/${idCode}/matches`);
    const dataResp = await response.json();
    tempData['matches'] = dataResp.matches;

    const res = await fetch(`${protocol}://${process.env.HOST_NAME}/api/competitions/${idCode}/standings`);
    // const res = await fetch(`/api/competitions/${idCode}/standings/`);
    const positionsTable = await res.json();
    tempData['positions'] = positionsTable.standings[0].table;

    const resScorers = await fetch(`${protocol}://${process.env.HOST_NAME}/api/competitions/${idCode}/scorers`);
    // const resScorers = await fetch(`/api/competitions/${idCode}/scorers/`);
    const goalScorer = await resScorers.json();
    tempData['scorers'] = goalScorer.scorers;
    tempData['id'] = idCode;
    data.push(tempData);
  }

  return {
    props: {
      data,
    },
  };
};

const Competition = ({ data }) => {
  const [dataSelected, setDataSelected] = useState(data[0]);
  const [categorySelected, setCategorySelected] = useState('matches');
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
    // fetchData();

    return () => {
      unlisten();
    };
  }, []);

  const handleClick = async (newIdCode) => {
    console.warn(
      'find',
      data.find((elem) => {
        console.warn('elem.id', elem.id);
        console.warn('newIdCode', newIdCode);
        return elem.id == newIdCode;
      }),
    );
    const temp = data.find((elem) => elem.id == newIdCode);
    console.warn(temp);
    setDataSelected(temp);
    console.warn(newIdCode);
    // setIdCode(newIdCode);
    // await fetchData(newIdCode);
  };

  const handleCategory = (category) => {
    setCategorySelected(category);
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
            <li onClick={() => handleCategory('matches')} className={stylesCompetition.item}>
              {/* <Link href='/competition/standings'> */}
              <a>Partidos</a>
              {/* </Link> */}
            </li>
            <li onClick={() => handleCategory('classification')} className={stylesCompetition.item}>
              {/* <Link href='/competition/standings'> */}
              <a>Clasificación</a>
              {/* </Link> */}
            </li>
            <li onClick={() => handleCategory('scorers')} className={stylesCompetition.item}>
              {/* <Link href='/competition/scorers'> */}
              <a>Goleadores</a>
              {/* </Link> */}
            </li>
          </ul>
        </nav>
        <section className={stylesCompetition.cards_container}>
          {categorySelected == 'matches' &&
            dataSelected?.matches.map((game) => {
              const emblemHome = dataSelected.positions.filter((position) => position.team.id === game.homeTeam.id);
              const emblemAway = dataSelected.positions.filter((item) => item.team.id === game.awayTeam.id);
              // if (emblemHome.length === 1) {
              cardMatch.push(
                <GameCard
                  key={game.id}
                  crestUrlHome={
                    emblemHome[0] === undefined ? '/images/icons/question.png' : emblemHome[0].team.crestUrl
                  }
                  // crestUrlHome='https://crests.football-data.org/65.svg'
                  homeTeamName={game.homeTeam.name}
                  awayTeamName={game.awayTeam.name}
                  crestUrlAway={
                    emblemAway[0] === undefined ? '/images/icons/question.png' : emblemAway[0].team.crestUrl
                  }
                  // crestUrlAway='https://crests.football-data.org/65.svg'
                  scoreHomeTeam={game.score.fullTime.homeTeam}
                  scoreAwayTeam={game.score.fullTime.awayTeam}
                  status={game.status}
                  matchday={game.matchday}
                />,
              );
              // }
            })}

          {cardMatch}
        </section>
        {categorySelected == 'classification' && <Standings positions={dataSelected.positions} />}
        {categorySelected == 'scorers' && <Scorers positions={dataSelected.positions} scorers={dataSelected.scorers} />}
      </section>
    </React.Fragment>
  );
};

export default Competition;
