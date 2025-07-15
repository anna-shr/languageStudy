import './App.css';
import Header from './Components/Header/Header';
import List from './Components/List/List';
import EmptyPage from './Components/EmptyPage/EmptyPage';
import Card from './Components/Card/Card';
import Footer from './Components/Footer/Footer';
import TopList from './Components/TopList/TopList.jsx';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import React, { useState, useEffect, useContext } from 'react';
import { WordsContext } from './context.js';
import ErrorDisplay from './error';

function App() {
  document.title = "Language study";

  const [words, setWords] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Индикатор загрузки
  const [error, setError] = useState(null); // Ошибка при загрузке

  const handleWordUpdate = (id, updatedData) => {
    setWords(prevWords =>
      prevWords.map(word =>
        word.id === id ? { ...word, ...updatedData } : word
      )
    );
  };

  const handleAddWord = (newWord) => {
    setWords(prevWords => [...prevWords, newWord]);
  };

  const fetchWords = async () => {
    try {
      setIsLoading(true);
      setError(null); // сброс ошибки перед новым запросом

      //await new Promise(resolve => setTimeout(resolve, 2000)); //для проверки лоадера

      const response = await fetch('https://itgirlschool.justmakeit.ru/api/words');
      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(
          errorData?.message || `HTTP error! status: ${response.status}`
        );
      }
      const data = await response.json();
      setWords(data);
    } catch (err) {
      setError({
        message: 'Не удалось загрузить слова',
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchWords();
  }, []);

  const [isEmpty1, setIsEmpty1] = useState(false);
  const [isEmpty2, setIsEmpty2] = useState(false);
  const [isEmpty3, setIsEmpty3] = useState(false);
  const [isEmpty4, setIsEmpty4] = useState(false);

  const handleCancelClick = () => {
    return <TopList />;
  };

  const [wordsStudied, setWordsStudied] = useState(0);

  const handleCountWordsStudied = () => {
    setWordsStudied(wordsStudied + 1);
  };

  const handleWordDelete = (deletedId) => {
    setWords(prevWords => {
      if (!prevWords) return []; // защита от undefined
      return prevWords.filter(word => word.id !== deletedId);
    });
  };

  if (isLoading) {
    return <div className="loader">
      <div className="loader-dot"></div>
      <div className="loader-dot"></div>
      <div className="loader-dot"></div>
    </div>
  }

  if (error) {
    return (
      <ErrorDisplay
        error={error.message}
        onRetry={fetchWords}
      />
    );
  }

  return (
    <Router>
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"></link>
      <Header />
      <Routes>
        <Route path="/languageStudy" element={
          <div className="list">
            <div className="table">
              <div className="table-header">
                <div className="header__item top">Index</div>
                <div className="header__item top">Word</div>
                <div className="header__item top">Transcription</div>
                <div className="header__item top">Translate</div>
                <div className="header__item top">Tags</div>
                <div className="header__item"></div>
              </div>
              <div className="table-content">
                <div className="table-row">
                  <TopList
                    isEmpty1={isEmpty1}
                    isEmpty2={isEmpty2}
                    isEmpty3={isEmpty3}
                    isEmpty4={isEmpty4}
                  />
                </div>
                {words && words.map((word, index) => (
                  <List
                    id={word.id}
                    key={index}
                    index={index + 1}
                    word={word.english}
                    transcription={word.transcription}
                    translate={word.russian}
                    tags={word.tags}
                    onDelete={handleWordDelete}
                    onUpdate={handleWordUpdate}
                  />
                ))}
              </div>
            </div>
          </div>
        } />
        <Route exact path="/game" element={
          <>
            <Card onClick={handleCountWordsStudied} wordsStudied={wordsStudied} />
          </>
        } />
        <Route path="*" element={<EmptyPage />} />
        <Route path="/" element={
          <div className="list">
            <div className="table">
              <div className="table-header">
                <div className="header__item top">Index</div>
                <div className="header__item top">Word</div>
                <div className="header__item top">Transcription</div>
                <div className="header__item top">Translate</div>
                <div className="header__item top">Tags</div>
                <div className="header__item"></div>
              </div>
              <div className="table-content">
                <div className="table-row">
                  <TopList onAddWord={handleAddWord} />
                </div>
                {words.map((word, index) => (
                  <List
                    id={word.id} // Обязательно передаем ID
                    key={index}
                    index={index + 1}
                    word={word.english}
                    transcription={word.transcription}
                    translate={word.russian}
                    tags={word.tags}
                  />
                ))}
              </div>
            </div>
          </div>
        } />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;





















