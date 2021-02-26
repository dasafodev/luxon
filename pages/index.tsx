import React from "react";
import NavBar from "../app/components/navbar";
import "../firebase/client";
import styles from "../app/styles/index.module.css";
import MatchCard from "../app/components/match_card";

const Home = () => {
  return (
    <React.Fragment>
      <NavBar />
      <main className={styles.main}>
        <h2 className={styles.title}>¡Partidos de Hoy!</h2>
        <section className={styles.cards_container}>
          <MatchCard
            hour="7:00 PM"
            competition="Champions League"
            homeTeamName="FC Barcelona"
            homeTeamImageUrl="/images/barcelona.png"
            awayTeamImageUrl="/images/real-madrid.png"
            awayTeamName="Real Madrid"
            like={true}
          />
          <MatchCard
            hour="7:00 PM"
            competition="Champions League"
            homeTeamName="FC Barcelona"
            homeTeamImageUrl="/images/barcelona.png"
            awayTeamImageUrl="/images/real-madrid.png"
            awayTeamName="Real Madrid"
            like={false}
          />
          <MatchCard
            hour="7:00 PM"
            competition="Champions League"
            homeTeamName="FC Barcelona"
            homeTeamImageUrl="/images/barcelona.png"
            awayTeamImageUrl="/images/real-madrid.png"
            awayTeamName="Real Madrid"
            like={false}
          />
          <MatchCard
            hour="7:00 PM"
            competition="Champions League"
            homeTeamName="FC Barcelona"
            homeTeamImageUrl="/images/barcelona.png"
            awayTeamImageUrl="/images/real-madrid.png"
            awayTeamName="Real Madrid"
            like={true}
          />
          <MatchCard
            hour="7:00 PM"
            competition="Champions League"
            homeTeamName="FC Barcelona"
            homeTeamImageUrl="/images/barcelona.png"
            awayTeamImageUrl="/images/real-madrid.png"
            awayTeamName="Real Madrid"
            like={false}
          />
          <MatchCard
            hour="7:00 PM"
            competition="Champions League"
            homeTeamName="FC Barcelona"
            homeTeamImageUrl="/images/barcelona.png"
            awayTeamImageUrl="/images/real-madrid.png"
            awayTeamName="Real Madrid"
            like={true}
          />
          <MatchCard
            hour="7:00 PM"
            competition="Champions League"
            homeTeamName="FC Barcelona"
            homeTeamImageUrl="/images/barcelona.png"
            awayTeamImageUrl="/images/real-madrid.png"
            awayTeamName="Real Madrid"
            like={false}
          />
          <MatchCard
            hour="7:00 PM"
            competition="Champions League"
            homeTeamName="FC Barcelona"
            homeTeamImageUrl="/images/barcelona.png"
            awayTeamImageUrl="/images/real-madrid.png"
            awayTeamName="Real Madrid"
            like={false}
          />
          <MatchCard
            hour="7:00 PM"
            competition="Champions League"
            homeTeamName="FC Barcelona"
            homeTeamImageUrl="/images/barcelona.png"
            awayTeamImageUrl="/images/real-madrid.png"
            awayTeamName="Real Madrid"
            like={true}
          />
        </section>
      </main>
    </React.Fragment>
  );
};
export default Home;
