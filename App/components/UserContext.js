import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState({
    name: '',
    id: Math.floor(Math.random() * 100000),
    isAdm: false,
  });

  const [solicitations, setSolicitations] = useState([]);

  return (
    <AppContext.Provider value={{ user, setUser, solicitations, setSolicitations }}>
      {children}
    </AppContext.Provider>
  );
};
