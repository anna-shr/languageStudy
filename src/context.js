import { createContext } from 'react';
import words from './wordsList.js';

export const WordsContext = createContext(words);

export const WordsContextProvider = ({ children }) => {
  return (
    <WordsContext.Provider value={words}>
      {children}
    </WordsContext.Provider>
  );
};

