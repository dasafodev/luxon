import React, { useState } from 'react';
import { DateTime } from 'luxon';
import NavBar from '../app/components/navbar';
import '../firebase/client';
import styles from '../app/styles/index.module.css';
import MatchCard from '../app/components/match_card';

export async function getServerSideProps(context) {
  const protocol = process.env.NODE_ENV ? 'http' : 'https';

  const response = await fetch(`${protocol}://${context.req.headers.host}/api/matches`);
  const data = await response.json();

  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      matches: data.matches,
    },
  };
}

const Home = ({ matches }) => {
  const [matchess, setMatches] = useState(matches);
  const onChangeSearcher = (val) => {
    const query: string = val.target.value;
    setMatches(
      matches.filter((elem) => {
        return (
          (elem['awayTeam']['name'] as string).toLocaleLowerCase().includes(query.toLocaleLowerCase()) ||
          (elem['homeTeam']['name'] as string).toLocaleLowerCase().includes(query.toLocaleLowerCase()) ||
          (elem['competition']['name'] as string).toLocaleLowerCase().includes(query.toLocaleLowerCase())
        );
      }),
    );
  };

  return (
    <React.Fragment>
      <NavBar onChange={onChangeSearcher} />
      <main className={styles.main}>
        <h2 className={styles.title}>¡Partidos de Hoy!</h2>
        <section className={styles.cards_container}>
          {matchess.map((match) => (
            <MatchCard
              key={match.id}
              id={match.id}
              fullHour={match.utcDate}
              hour={DateTime.fromISO(match.utcDate).toLocaleString(DateTime.TIME_SIMPLE)}
              competition={match.competition.name}
              homeTeamName={match.homeTeam.shortName}
              homeTeamImageUrl={match.homeTeam.crestUrl}
              awayTeamImageUrl={match.awayTeam.crestUrl}
              awayTeamName={match.awayTeam.shortName}
              status={match.status === 'IN_PLAY' || match.status === 'FINISHED' ? match.status : 'SCHEDULED'}
            />
          ))}
        </section>
      </main>
    </React.Fragment>
  );
};
export default Home;
