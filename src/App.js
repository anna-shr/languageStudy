import './App.css';
import Header from './Components/Header/Header';
import List from './Components/List/List';
import EmptyPage from './Components/EmptyPage/EmptyPage';
import Card from './Components/Card/Card';
import Footer from './Components/Footer/Footer';
import TopList from './Components/TopList/TopList.jsx';
import words from './wordsList.js';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import React from 'react';

function App() {
  document.title = "Language study"

  const handleCancelClick = () => {
    return <TopList />
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
                  <TopList />
                  <div className="table-data index">
                    <a class="button primary save">Save</a>
                    <a className="button touch cancel" onClick={handleCancelClick}></a>
                  </div>
                </div>

                {words.map((words, index) => (
                  <List
                    key={index}
                    index={index + 1}
                    word={words.english}
                    transcription={words.transcription}
                    translate={words.russian}
                    tags={words.tags}
                  />
                ))}
              </div >
            </div >
          </div >
        } />
        <Route exact path="/game" element={<Card />} />
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
                  <TopList />
                  <div className="table-data index">
                    <a class="button primary save">Save</a>
                    <a className="button touch cancel" onClick={handleCancelClick}></a>
                  </div>
                </div>

                {words.map((words, index) => (
                  <List
                    key={index}
                    index={index + 1}
                    word={words.english}
                    transcription={words.transcription}
                    translate={words.russian}
                    tags={words.tags}
                  />
                ))}
              </div >
            </div >
          </div >
        } />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
