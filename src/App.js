import './App.css';
import Header from './Components/Header/Header';
import List from './Components/List/List';
import Card from './Components/Card/Card';
import Footer from './Components/Footer/Footer';
import TopList from './Components/TopList/TopList.jsx';
import words from './wordsList';

import React from 'react';


function App() {
  document.title = "Language study"

  const handleCancelClick = () => {
    return <TopList/>
  }



  return (
    <>
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"></link>

      <Header />

      <Card
        word={"english"}
        transcription={"[transcription]"}
        translate={"russian"}
      />

      <div className="list">
        <div className="table">
          <div className="table-header">
            <div className="header__item"><a className="filter__link" href="#">Index</a></div>
            <div className="header__item"><a className="filter__link" href="#">Word</a></div>
            <div className="header__item"><a className="filter__link filter__link--number" href="#">Transcription</a></div>
            <div className="header__item"><a className="filter__link filter__link--number" href="#">Translate</a></div>
            <div className="header__item"><a className="filter__link filter__link--number" href="#">Tags</a></div>
            <div className="header__item"><a className="filter__link filter__link--number" href="#"></a></div>
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

      <List />
      <Footer />
    </>
  );
}

export default App;
