import React, { useState } from 'react';
import './List.scss';
import words from '../../wordsList.js';

function List(props) {

  const [showEditMode, changeEditDetails] = useState(false);

  const handleEditClick = () => {
    changeEditDetails(!showEditMode);
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
            <input className="table-data index" defaultValue={props.word}></input>
          </div>
          <div className="table-data index">
            <input className="table-data index" defaultValue={props.transcription}></input>
          </div>
          <div className="table-data index">
            <input className="table-data index" defaultValue={props.translate}></input>
          </div>
          <div className="table-data index">
            <input className="table-data index" defaultValue={props.tags}></input>
          </div>
          <div className="table-data index">
            <a className="button primary save"
              onClick={() => { handleEditClick();}}>Save</a>
            <a className="button touch cancel"
              onClick={() => { handleEditClick() }}></a>
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
            <a className="button touch edit" onClick={handleEditClick}></a>
            <a className="button touch delete"
              onClick={() => { handleEditClick(); handleDelete(); }}></a>
          </div>
        </div>
      }
    </>
  );
}

export default List;
