
import React, { useState } from 'react';
import { useEffect } from 'react';
import './Card.css';
import words from '../../wordsList.js';


function Card(props) {
	const [hide, changeVisibility] = useState(false);
	let [counter, changeCounter] = useState(0);
	let [wordsCounter, changeNumber] = useState(0);
	let [isPopped, setPop] = useState(false);

	const handleArrowLeft = () => {
		if (counter === 0) {
			alert('Это первая карточка');
			return;
		} else {
			// changeCounter((counter = counter - 1));
			changeCounter((counter - 1));
			if (hide) changeVisibility(!hide);
		}
	};

	const handleArrowRight = () => {
		if (counter === words.length - 1 || words.length === 0) {
			alert('Карточки закончились!');
			return;
		} else {
			changeCounter((counter + 1));
			if (hide) changeVisibility(!hide);
			setPop(false);
		}
	};

	const handleButtonClick = () => {
			if (!isPopped) {
			setPop(true);

			//!!!!!!!
			if (props.onClick) {
				props.onClick();
			}
			//!!!!!!!

			changeNumber(wordsCounter + 1);
		}
		changeVisibility(!hide);
	};

	const handleCardClick = () => {
		if (hide) changeVisibility(!hide);
	};

	let textInput = null;
	useEffect(() => {
		textInput.focus();
	  }, [counter]);

	return (
		<>
		{/* <div className="cards-counter">Карточек изучено: {wordsCounter}</div> */}
		<div className="cards-counter">Карточек изучено: {props.wordsStudied}</div>
		<div className='card-wrapper'>
			

			<div className='arrow' onClick={handleArrowLeft}>
				{' '}
				←{' '}
			</div>

			<div className='card' onClick={handleCardClick}>
				<p className='word'>{words[counter]?.english || props.word}</p>
				<p className='transcription'>{words[counter]?.transcription || props.transcription}</p>
				<button className={'showTranslation ' + (hide ? 'hide' : '')} onClick={handleButtonClick}
				ref={(button) => { textInput = button; }}>
					Перевести
				</button>
				<p className={'translate ' + (hide ? '' : 'hide')}>{words[counter]?.russian || props.translate}</p>
				<p className='tags'>{props.tags}</p>
			</div>

			<div className='arrow' onClick={handleArrowRight}>
				{' '}
				→{' '}
			</div>
		</div>
		</>
	);
}

Card.defaultProps = {
	word: 'default word',
	transcription: 'default transcription',
	translate: 'default translate',
};

export default Card;