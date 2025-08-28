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
import { observer } from 'mobx-react-lite';
import wordsStore from './stores/WordsStore';
import ErrorDisplay from './error';
import React, { useEffect, useState } from 'react';

const App = observer(() => {
  document.title = "Language study";

  const [isEmpty1, setIsEmpty1] = useState(false);
  const [isEmpty2, setIsEmpty2] = useState(false);
  const [isEmpty3, setIsEmpty3] = useState(false);
  const [isEmpty4, setIsEmpty4] = useState(false);
  const [wordsStudied, setWordsStudied] = useState(0);

  const handleCancelClick = () => {
    return <TopList />;
  };

  const handleCountWordsStudied = () => {
    setWordsStudied(wordsStudied + 1);
  };

  const handleWordUpdate = (id, updatedData) => {
    wordsStore.updateWord(id, updatedData);
  };

  const handleAddWord = (newWord) => {
    wordsStore.addWord(newWord);
  };

  const handleWordDelete = (deletedId) => {
    wordsStore.deleteWord(deletedId);
  };

  useEffect(() => {
    wordsStore.fetchWords();
  }, []);

  if (wordsStore.isLoading) {
    return <div className="loader">
      <div className="loader-dot"></div>
      <div className="loader-dot"></div>
      <div className="loader-dot"></div>
    </div>
  }

  if (wordsStore.error) {
    return (
      <ErrorDisplay
        error={wordsStore.error}
        onRetry={wordsStore.fetchWords}
      />
    );
  }

  return (
    <Router>
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"></link>
      <div className="main-content">
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
                {wordsStore.words.map((word, index) => (
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
                {wordsStore.words.map((word, index) => (
                  <List
                    id={word.id}
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
      </div>
    </Router>
  );
});

export default App;

















