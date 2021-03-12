import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { DateTime } from 'luxon';
import firebase from '@fire-client';
import NavBar from '../../app/components/navbar';
import Footer from '../../app/components/footer';
import '../../firebase/client';
import styles from '../../app/styles/index.module.css';
import MatchCard from '../../app/components/match_card';

import { useAppContext } from 'app/context/state';

const Favorites = () => {
  const { favorites } = useAppContext();

  const router = useRouter();

  const [, setFireUser] = useState<firebase.User>(firebase.auth().currentUser);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setFireUser(user);
      } else {
        router.replace('/login');
      }
    });
  }, []);

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
              fullHour={match.hour}
              hour={DateTime.fromISO(match.hour).toLocaleString(DateTime.TIME_SIMPLE)}
              competition={match.competition}
              homeTeamName={match.homeTeamName}
              homeTeamImageUrl={match.homeTeamImageUrl}
              awayTeamImageUrl={match.awayTeamImageUrl}
              awayTeamName={match.awayTeamName}
              status={match.status === 'IN_PLAY' || match.status === 'FINISHED' ? match.status : 'SCHEDULED'}
            />
          ))}
        </section>
        <Footer />
      </main>
    </React.Fragment>
  );
};
export default Favorites;
