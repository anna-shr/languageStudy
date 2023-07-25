
import './Header.css';
import {
  Link
} from "react-router-dom";

function Header() {
  return (
    <>
      <header className="header">
        <p>
          Learn new words
        </p>

 
          <nav>
            <ul>
              <li>
                <Link to="/">Главная</Link>
              </li>
              <li>
                <Link to="/game">Изучать</Link>
              </li>
              <li>
                <Link to="/"><img src="https://www.pinclipart.com/picdir/big/63-639505_bespoke-training-computerworld-education-logo-png-blue-clipart.png"></img></Link>
              </li>
            </ul>
          </nav>
      </header>
    </>
  );
}

export default Header;
