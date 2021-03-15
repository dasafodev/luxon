import { createContext, useContext, useState } from 'react';

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
  const [games, setGames] = useState([]);
  const [positions, setPositions] = useState([]);
  const [scorers, setScorers] = useState([]);

  function addMatchToFavorites(match: any) {
    setFavorites([...favorites, match]);
  }

  function deleteMatchToFavorites(idMatch: any) {
    const result = favorites.filter((match) => match.id !== idMatch);
    setFavorites(result);
  }

  return (
    <AppDataContext.Provider
      value={{
        favorites,
        games,
        positions,
        scorers,
      }}
    >
      <AppActionsContext.Provider
        value={{
          addMatchToFavorites,
          deleteMatchToFavorites,
          setGames,
          setPositions,
          setScorers,
        }}
      >
        {children}
      </AppActionsContext.Provider>
    </AppDataContext.Provider>
  );
}
