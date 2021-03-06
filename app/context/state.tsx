import { createContext, useContext, useState } from "react";

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

  function addMatchToFavorites(match: any) {
    setFavorites([...favorites, match]);
  }

  return (
    <AppDataContext.Provider value={{ favorites }}>
      <AppActionsContext.Provider value={{ addMatchToFavorites }}>
        {children}
      </AppActionsContext.Provider>
    </AppDataContext.Provider>
  );
}
