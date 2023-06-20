
import React, { useState } from 'react';
import './Card.css';

function Card(props) {

  const [hide, changeVisibility] = useState(false);

  const handleButtonClick = () => {
    changeVisibility(!hide);
  };

  const handleCardClick = () => {
    if (hide)
      changeVisibility(!hide);
  };

  return (
    <div className="card-wrapper">
      <div className="card" onClick={handleCardClick}>
        <p className='word'>{props.word}</p>
        <p className='transcription'>{props.transcription}</p>
        <button className={"showTranslation " + (hide ? "hide" : "")} onClick={handleButtonClick}>Перевести</button>
        <p className={"translate " + (hide ? "" : "hide")}>{props.translate}</p>
        <p className='tags'>{props.tags}</p>
      </div>
    </div>
  );
}

export default Card;
