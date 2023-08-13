import './TopList.css';
import { useState } from 'react';

function TopList() {

  let [isEmpty1, setIsEmpty1] = useState(false);
  let [isEmpty2, setIsEmpty2] = useState(false);
  let [isEmpty3, setIsEmpty3] = useState(false);
  let [isEmpty4, setIsEmpty4] = useState(false);

  function handleChange(evt) {
    if (evt.target.value == "" && evt.target.name == "input1") {
      setIsEmpty1(true);
    }
    if (evt.target.value == "" && evt.target.name == "input2") {
      setIsEmpty2(true);
    }
    if (evt.target.value == "" && evt.target.name == "input3") {
      setIsEmpty3(true);
    }
    if (evt.target.value == "" && evt.target.name == "input4") {
      setIsEmpty4(true);
    }
    if (evt.target.value !== "" && evt.target.name == "input1") {
      setIsEmpty1(false);
    }
    if (evt.target.value !== "" && evt.target.name == "input2") {
      setIsEmpty2(false);
    }
    if (evt.target.value !== "" && evt.target.name == "input3") {
      setIsEmpty3(false);
    }
    if (evt.target.value !== "" && evt.target.name == "input4") {
      setIsEmpty4(false);
    }
  }


return (
  <>
    <div className="table-data index">
    </div>
    <div className="table-data index">
      <input name="input1" className={'table-data index top ' + (isEmpty1 ? 'red' : '')} onChange={handleChange} />
    </div>
    <div className="table-data index">
      <input name="input2" className={'table-data index top ' + (isEmpty2 ? 'red' : '')} onChange={handleChange} />
    </div>
    <div className="table-data index">
      <input name="input3" className={'table-data index top ' + (isEmpty3 ? 'red' : '')} onChange={handleChange} />
    </div>
    <div className="table-data index">
      <input name="input4" className={'table-data index top ' + (isEmpty4 ? 'red' : '')} onChange={handleChange} />
    </div>
  </>
)

}

export default TopList;
