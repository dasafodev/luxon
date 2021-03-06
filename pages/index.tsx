import React from "react";
import { DateTime } from "luxon";
import NavBar from "../app/components/navbar";
import "../firebase/client";
import styles from "../app/styles/index.module.css";
import MatchCard from "../app/components/match_card";

export async function getServerSideProps(context) {
  const protocol = process.env.NODE_ENV ? "http" : "https";

  const response = await fetch(
    `${protocol}://${context.req.headers.host}/api/matches`
  );
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
  return (
    <React.Fragment>
      <NavBar />
      <main className={styles.main}>
        <h2 className={styles.title}>¡Partidos de Hoy!</h2>
        <section className={styles.cards_container}>
          {matches.map((match) => (
            <MatchCard
              key={match.id}
              hour={DateTime.fromISO(match.utcDate).toLocaleString(
                DateTime.TIME_SIMPLE
              )}
              competition={match.competition.name}
              homeTeamName={match.homeTeam.shortName}
              homeTeamImageUrl={match.homeTeam.crestUrl}
              awayTeamImageUrl={match.awayTeam.crestUrl}
              awayTeamName={match.awayTeam.shortName}
              status={
                match.status === "IN_PLAY" || match.status === "FINISHED"
                  ? match.status
                  : "SCHEDULED"
              }
              like={true}
            />
          ))}
        </section>
      </main>
    </React.Fragment>
  );
};
export default Home;
