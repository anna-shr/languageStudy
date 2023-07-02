
import React, { useState } from 'react';
import './Card.css';
import words from '../../wordsList.js';

function Card(props) {
  Card.defaultProps = {
    word: "default word",
    transcription: "default transcription",
    translate: "default translate"
  };

  const [hide, changeVisibility] = useState(false);

  let [counter, changeCounter] = useState(0);

  const handleArrowLeft = () => {
    if (counter == 0) {
      return;
    } else {
      changeCounter(counter = counter - 1)
    }
    console.log(counter);
  };

  const handleArrowRight = () => {
    if (counter == words.length - 1) {
      alert("Карточки закончились!")
      return;
    } else {
      changeCounter(counter = counter + 1)
    }
  };




  const handleButtonClick = () => {
    changeVisibility(!hide);
  };

  const handleCardClick = () => {
    if (hide)
      changeVisibility(!hide);
  };


  return (

    <div className="card-wrapper">

      <div className="arrow" onClick={handleArrowLeft}> ← </div>

      <div className="card" onClick={handleCardClick}>
        <p className='word'>{words[counter].english}</p>
        <p className='transcription'>{words[counter].transcription}</p>
        <button className={"showTranslation " + (hide ? "hide" : "")} onClick={handleButtonClick}>Перевести</button>
        <p className={"translate " + (hide ? "" : "hide")}>{words[counter].russian}</p>
      </div>

      <div className="arrow" onClick={handleArrowRight}> → </div>

    </div>
  );
}

export default Card; 