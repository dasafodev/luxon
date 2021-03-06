import React, { useEffect } from "react";
import { DateTime } from "luxon";
import NavBar from "../../app/components/navbar";
import "../../firebase/client";
import styles from "../../app/styles/index.module.css";
import MatchCard from "../../app/components/match_card";
import { useAppContext } from "app/context/state";

const Favorites = () => {
  const { favorites } = useAppContext();

  return (
    <React.Fragment>
      <NavBar />
      <main className={styles.main}>
        <h2 className={styles.title}>¡Estas en tus partidos favoritos!</h2>
        <section className={styles.cards_container}>
          {favorites.map((match) => (
            <MatchCard
              id={match.id}
              key={match.id}
              hour={DateTime.fromISO(match.hour).toLocaleString(
                DateTime.TIME_SIMPLE
              )}
              competition={match.competition}
              homeTeamName={match.homeTeamName}
              homeTeamImageUrl={match.homeTeamImageUrl}
              awayTeamImageUrl={match.awayTeamImageUrl}
              awayTeamName={match.awayTeamName}
              status={
                match.status === "IN_PLAY" || match.status === "FINISHED"
                  ? match.status
                  : "SCHEDULED"
              }
            />
          ))}
        </section>
      </main>
    </React.Fragment>
  );
};
export default Favorites;
