
import React, { useState } from 'react';
import './Card.css';
import words from '../../wordsList.js';

function Card(props) {
	const [hide, changeVisibility] = useState(false);
	let [counter, changeCounter] = useState(0);

	const handleArrowLeft = () => {
		if (counter === 0) {
			return;
		} else {
			changeCounter((counter = counter - 1));
		}
		console.log(counter);
	};

	const handleArrowRight = () => {
		if (counter === words.length - 1 || words.length === 0) {
			alert('Карточки закончились!');
			return;
		} else {
			changeCounter((counter = counter + 1));
		}
	};

	const handleButtonClick = () => {
		changeVisibility(!hide);
	};

	const handleCardClick = () => {
		if (hide) changeVisibility(!hide);
	};

	return (
		<div className='card-wrapper'>
			<div className='arrow' onClick={handleArrowLeft}>
				{' '}
				←{' '}
			</div>

			<div className='card' onClick={handleCardClick}>
				<p className='word'>{words[counter]?.english || props.word}</p>
				<p className='transcription'>{words[counter]?.transcription || props.transcription}</p>
				<button className={'showTranslation ' + (hide ? 'hide' : '')} onClick={handleButtonClick}>
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
	);
}

Card.defaultProps = {
	word: 'default word',
	transcription: 'default transcription',
	translate: 'default translate',
};

export default Card;