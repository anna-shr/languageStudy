import React, { useState } from 'react';
import './List.scss';
import words from '../../wordsList.js';

function List(props) {

  const [showEditMode, changeEditDetails] = useState(false);
  const [isDisabled, setDisable] = useState(false);

  //проверка инпутов
  let [isEmpty1, setIsEmpty1] = useState(false);
  let [isEmpty2, setIsEmpty2] = useState(false);
  let [isEmpty3, setIsEmpty3] = useState(false);
  let [isEmpty4, setIsEmpty4] = useState(false);

  let [inp1, setInp1] = useState();
  let [inp2, setInp2] = useState();
  let [inp3, setInp3] = useState();
  let [inp4, setInp4] = useState();

  function handleChange(evt) {
    if (evt.target.value == "" && evt.target.name == "input1") {
      setIsEmpty1(true);
      setDisable(true);
    }
    if (evt.target.value == "" && evt.target.name == "input2") {
      setIsEmpty2(true);
      setDisable(true);
    }
    if (evt.target.value == "" && evt.target.name == "input3") {
      setIsEmpty3(true);
      setDisable(true);
    }
    if (evt.target.value == "" && evt.target.name == "input4") {
      setIsEmpty4(true);
      setDisable(true);
    }
    if (evt.target.value !== "" && evt.target.name == "input1") {
      setIsEmpty1(false);
      setDisable(false);
      setInp1(evt.target.value);
    }
    if (evt.target.value !== "" && evt.target.name == "input2") {
      setIsEmpty2(false);
      setDisable(false);
      setInp2(evt.target.value);
    }
    if (evt.target.value !== "" && evt.target.name == "input3") {
      setIsEmpty3(false);
      setDisable(false);
      setInp3(evt.target.value);
    }
    if (evt.target.value !== "" && evt.target.name == "input4") {
      setIsEmpty4(false);
      setDisable(false);
      setInp4(evt.target.value);
    }
  }


  const handleEditClick = () => {
    changeEditDetails(!showEditMode);
  };

  const handleCancelClick = () => {
    changeEditDetails(!showEditMode);
  };

  const handleSaveClick = () => {
    changeEditDetails(!showEditMode);
    if (isEmpty1 == true || isEmpty2 == true || isEmpty3 == true || isEmpty4 == true) {
      alert("Заполните все поля!");
    } else {
      alert(
        "Word: " + {inp1} +  
        "Transcription: " + {inp2} +    
        "Translate: " + {inp3} + 
        "Tags: " + {inp4}
      )
    }

  };

  const handleDelete = (id) => {

  };

  return (
    <>
      {showEditMode
        ?
        <div className="table-row">
          <div className="table-data index">{props.index}
          </div>
          <div className="table-data index">
            <input name="input1" value={inp1} className={'table-data index ' + (isEmpty1 ? 'red' : '')} onChange={handleChange} defaultValue={props.word}></input>
          </div>
          <div className="table-data index">
            <input name="input2" value={inp2} className={'table-data index ' + (isEmpty2 ? 'red' : '')} onChange={handleChange} defaultValue={props.transcription}></input>
          </div>
          <div className="table-data index">
            <input name="input3" value={inp3} className={'table-data index ' + (isEmpty3 ? 'red' : '')} onChange={handleChange} defaultValue={props.translate}></input>
          </div>
          <div className="table-data index">
            <input name="input4" value={inp4} className={'table-data index ' + (isEmpty4 ? 'red' : '')} onChange={handleChange} defaultValue={props.tags}></input>
          </div>
          <div className="table-data index">
            <a href className={"button primary save " + (isDisabled ? 'disabled' : '')}
              onClick={handleSaveClick}>Save</a>
            <a href className="button touch cancel"
              onClick={handleCancelClick}>{' '}</a>
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
            <a href='./' className="button touch edit" onClick={handleEditClick}>{' '}</a>
            <a href='./' className="button touch delete"
              onClick={() => { handleEditClick(); handleDelete(); }}>{' '}</a>
          </div>
        </div>
      }
    </>
  );
}

export default List;
