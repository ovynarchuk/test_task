import React, { useMemo, useState } from "react";

export const MainContext = React.createContext({
  isLoggedIn: false,
  setIsLoggedIn: (isLoggedIn: boolean) => {}
});

type Props = {
  children: React.ReactNode;
}

export const MainProvider: React.FC<Props> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const value = useMemo(() => ({
    isLoggedIn,
    setIsLoggedIn
  }), [isLoggedIn]);

  return (
    <MainContext.Provider value={value}>
      {children}
    </MainContext.Provider>
  )
};