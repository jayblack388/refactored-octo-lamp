import React, { createContext, useContext, useReducer } from 'react';
import { ThemeContext } from 'styled-components';
import { store, rootReducer } from './store.js';

export const GlobalContext = createContext();

export const GlobalStateProvider = ({ children }) => {
  return (
    <GlobalContext.Provider value={useReducer(rootReducer, store)}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalState = () => useContext(GlobalContext);
export const useTheme = () => useContext(ThemeContext);
