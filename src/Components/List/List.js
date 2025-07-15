import React, { useState } from 'react';
import './List.scss';
import { useContext } from 'react';

function List(props) {

  const [showEditMode, changeEditDetails] = useState(false);
  const [isDisabled, setDisable] = useState(false);

  let [isEmpty1, setIsEmpty1] = useState(false);
  let [isEmpty2, setIsEmpty2] = useState(false);
  let [isEmpty3, setIsEmpty3] = useState(false);
  let [isEmpty4, setIsEmpty4] = useState(false);

  let [inp1, setInp1] = useState(props.word);
  let [inp2, setInp2] = useState(props.transcription);
  let [inp3, setInp3] = useState(props.translate);
  let [inp4, setInp4] = useState(props.tags);

  function handleChange(evt) {
    if (evt.target.value === "" && evt.target.name === "input1") {
      setIsEmpty1(true);
      setDisable(true);
      setInp1(evt.target.value);
    }

    if (evt.target.value === "" && evt.target.name === "input2") {
      setIsEmpty2(true);
      setDisable(true);
      setInp2(evt.target.value);
    }
    if (evt.target.value === "" && evt.target.name === "input3") {
      setIsEmpty3(true);
      setDisable(true);
      setInp3(evt.target.value);
    }
    if (evt.target.value === "" && evt.target.name === "input4") {
      setIsEmpty4(true);
      setDisable(true);
      setInp4(evt.target.value);
    }

    if (evt.target.value !== "" && evt.target.name === "input1") {
      setIsEmpty1(false);
      setDisable(false);
      setInp1(evt.target.value);
    }
    if (evt.target.value !== "" && evt.target.name === "input2") {
      setIsEmpty2(false);
      setDisable(false);
      setInp2(evt.target.value);
    }
    if (evt.target.value !== "" && evt.target.name === "input3") {
      setIsEmpty3(false);
      setDisable(false);
      setInp3(evt.target.value);
    }
    if (evt.target.value !== "" && evt.target.name === "input4") {
      setIsEmpty4(false);
      setDisable(false);
      setInp4(evt.target.value);
    }
  }

  const handleEditClick = () => {
    // Сбрасываем значения перед открытием формы
    setInp1(props.word);
    setInp2(props.transcription);
    setInp3(props.translate);
    setInp4(props.tags);

    // Сбрасываем ошибки
    setIsEmpty1(false);
    setIsEmpty2(false);
    setIsEmpty3(false);
    setIsEmpty4(false);

    changeEditDetails(!showEditMode);
  };

  const handleCancelClick = () => {
    changeEditDetails(!showEditMode);
  };

  const handleSaveClick = async () => {
    if (!inp1 || !inp2 || !inp3 || !inp4) {
      alert("Заполните все поля!");
      return;
    }
    try {
      const updatedWord = {
        english: inp1,
        transcription: inp2,
        russian: inp3,
        tags: inp4
      };
      const response = await fetch(`https://itgirlschool.justmakeit.ru/api/words/${props.id}/update`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedWord)
      });
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Ошибка при обновлении слова');
      }
      changeEditDetails(false);
      if (props.onUpdate) {
        props.onUpdate(props.id, updatedWord);
      }
      alert('Слово успешно обновлено!');
    } catch (error) {
      console.error('Update error:', error);
      alert('Не удалось обновить слово: ' + error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`https://itgirlschool.justmakeit.ru/api/words/${props.id}/delete`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      if (!response.ok) {
        throw new Error('Ошибка при удалении слова');
      }
      if (props.onDelete) {
        props.onDelete(props.id);
      }

      alert('Слово успешно удалено');
    } catch (error) {
      console.error('Delete error:', error);
      alert('Не удалось удалить слово: ' + error.message);
    }
  };

  return (
    <>
      {showEditMode
        ?
        <div className="table-row">
          <div className="table-data index">{props.index}
          </div>
          <div className="table-data index">
            <input name="input1" value={inp1} className={'table-data index ' + (isEmpty1 ? 'red' : '')} onChange={handleChange}></input>
          </div>
          <div className="table-data index">
            <input name="input2" value={inp2} className={'table-data index ' + (isEmpty2 ? 'red' : '')} onChange={handleChange}></input>
          </div>
          <div className="table-data index">
            <input name="input3" value={inp3} className={'table-data index ' + (isEmpty3 ? 'red' : '')} onChange={handleChange}></input>
          </div>
          <div className="table-data index">
            <input name="input4" value={inp4} className={'table-data index ' + (isEmpty4 ? 'red' : '')} onChange={handleChange}></input>
          </div>
          <div className="table-data index">
            <button href className={"button primary save " + (isDisabled ? 'disabled' : '')}
              onClick={handleSaveClick}>Сохранить</button>
            <button href className="button touch cancel"
              onClick={handleCancelClick}>{' '}</button>
          </div>
        </div>
        :
        <div className="table-row">
          <div className="table-data">{props.index}</div>
          <div className="table-data">{props.word}</div>
          <div className="table-data">{props.transcription}</div>
          <div className="table-data">{props.translate}</div>
          <div className="table-data">{props.tags}</div>
          <div className="table-data">

            <button href='./' className="button touch edit" onClick={handleEditClick}>{' '}</button>
            <button href='./' className="button touch delete"
              onClick={() => {
                if (window.confirm('Вы уверены, что хотите удалить это слово?')) {
                  handleDelete(props.id);
                }
              }}
            >{' '}</button>
          </div>
        </div>
      }
    </>
  );
}

export default List;
