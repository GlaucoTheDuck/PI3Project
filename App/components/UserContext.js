import React, { createContext, useState, useEffect } from 'react';
import { getPins } from '../src/api/pin';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState({
    name: '',
    id: Math.floor(Math.random() * 100000),
    isAdm: false,
  });

  const [solicitations, setSolicitations] = useState([]);
  const [pins, setPins] = useState([]);

  // Função para carregar pins
  const loadPins = async () => {
    try {
      const pinsData = await getPins();
      setPins(pinsData);
    } catch (err) {
      console.error('Erro ao buscar pins:', err);
    }
  };

  // Carrega pins na inicialização e a cada 5 segundos
  useEffect(() => {
    loadPins();
    const intervalId = setInterval(loadPins, 5000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <AppContext.Provider value={{ 
      user, 
      setUser, 
      solicitations, 
      setSolicitations,
      pins,
      setPins,
      loadPins
    }}>
      {children}
    </AppContext.Provider>
  );
};