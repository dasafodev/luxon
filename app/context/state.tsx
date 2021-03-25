import { createContext, useContext, useEffect, useState } from 'react';

import firebase from '@fire-client';

const AppDataContext = createContext(null);
const AppActionsContext = createContext(null);

export function useAppContext() {
  return useContext(AppDataContext);
}

export function useAppActions() {
  return useContext(AppActionsContext);
}

export function Provider({ children }) {
  const [favorites, setFavorites] = useState([]);

  const [currentUser, setFireUser] = useState<firebase.User>(firebase.auth().currentUser);

  useEffect(() => {
    const unlisten = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setFireUser(user);
      }
    });

    return () => {
      unlisten();
    };
  }, []);

  useEffect(() => {
    if (currentUser !== null) {
      firebase
        .firestore()
        .collection('users')
        .doc(`${currentUser.uid}`)
        .get()
        .then((doc) => {
          if (doc.exists) {
            if (doc.data().favorites.length > 0) {
              Promise.all(
                doc.data().favorites.map(async (matchId) => {
                  const doc = (await firebase.firestore().collection('matches').doc(`${matchId}`).get()).data();
                  const awayTeam = (
                    await firebase.firestore().collection('teams').doc(`${doc.awayTeam.id}`).get()
                  ).data();
                  const homeTeam = (
                    await firebase.firestore().collection('teams').doc(`${doc.homeTeam.id}`).get()
                  ).data();
                  return {
                    ...doc,
                    awayTeam,
                    homeTeam,
                  };
                }),
              )
                .then((res) => {
                  setFavorites(res);
                })
                .catch((err) => err);
            }
          }
        })
        .catch((error) => console.error(error));
    }
  }, [currentUser]);

  function addMatchToFavorites(match: any) {
    setFavorites([
      ...favorites,
      {
        id: match.id,
        competition: { name: match.competition },
        homeTeam: { shortName: match.homeTeamName, crestUrl: match.homeTeamImageUrl },
        awayTeam: { shortName: match.awayTeamName, crestUrl: match.awayTeamImageUrl },
        utcDate: match.fullHour,
        status: match.status,
      },
    ]);
  }

  function deleteMatchToFavorites(idMatch: any) {
    const result = favorites.filter((match) => match.id !== idMatch);
    setFavorites(result);
  }

  return (
    <AppDataContext.Provider
      value={{
        favorites,
      }}
    >
      <AppActionsContext.Provider
        value={{
          addMatchToFavorites,
          deleteMatchToFavorites,
        }}
      >
        {children}
      </AppActionsContext.Provider>
    </AppDataContext.Provider>
  );
}
