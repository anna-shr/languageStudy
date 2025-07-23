import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import wordsStore from '../../stores/WordsStore';
import './List.scss';

const List = observer((props) => {
  const [showEditMode, setShowEditMode] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isEmpty, setIsEmpty] = useState({
    input1: false,
    input2: false,
    input3: false,
    input4: false
  });
  const [inputs, setInputs] = useState({
    input1: props.word,
    input2: props.transcription,
    input3: props.translate,
    input4: props.tags
  });

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    const isEmptyField = value === "";
    
    setInputs(prev => ({ ...prev, [name]: value }));
    setIsEmpty(prev => ({ ...prev, [name]: isEmptyField }));
    setIsDisabled(Object.values({ ...inputs, [name]: value }).some(v => v === ""));
  };

  const handleEditClick = () => {
    setInputs({
      input1: props.word,
      input2: props.transcription,
      input3: props.translate,
      input4: props.tags
    });
    setIsEmpty({
      input1: false,
      input2: false,
      input3: false,
      input4: false
    });
    setShowEditMode(!showEditMode);
  };

  const handleSaveClick = async () => {
    if (Object.values(inputs).some(v => !v)) {
      alert("Заполните все поля!");
      return;
    }

    try {
      const updatedWord = {
        english: inputs.input1,
        transcription: inputs.input2,
        russian: inputs.input3,
        tags: inputs.input4
      };
      
      await wordsStore.updateWord(props.id, updatedWord);
      setShowEditMode(false);
      alert('Слово успешно обновлено!');
    } catch (error) {
      alert('Не удалось обновить слово: ' + error.message);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Вы уверены, что хотите удалить это слово?')) {
      try {
        await wordsStore.deleteWord(props.id);
        alert('Слово успешно удалено');
      } catch (error) {
        alert('Не удалось удалить слово: ' + error.message);
      }
    }
  };

  return (
    <>
      {showEditMode ? (
        <div className="table-row">
          <div className="table-data index">{props.index}</div>
          {['input1', 'input2', 'input3', 'input4'].map((name, i) => (
            <div className="table-data index" key={i}>
              <input
                name={name}
                value={inputs[name]}
                className={`table-data index ${isEmpty[name] ? 'red' : ''}`}
                onChange={handleChange}
              />
            </div>
          ))}
          <div className="table-data index">
            <button className={`button primary save ${isDisabled ? 'disabled' : ''}`}
              onClick={handleSaveClick}>Сохранить</button>
            <button className="button touch cancel"
              onClick={handleEditClick}> </button>
          </div>
        </div>
      ) : (
        <div className="table-row">
          <div className="table-data">{props.index}</div>
          <div className="table-data">{props.word}</div>
          <div className="table-data">{props.transcription}</div>
          <div className="table-data">{props.translate}</div>
          <div className="table-data">{props.tags}</div>
          <div className="table-data">
            <button className="button touch edit" onClick={handleEditClick}> </button>
            <button className="button touch delete" onClick={handleDelete}> </button>
          </div>
        </div>
      )}
    </>
  );
});

export default List;