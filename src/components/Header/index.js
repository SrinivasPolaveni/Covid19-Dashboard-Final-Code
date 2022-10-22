import {Link} from 'react-router-dom'

import './index.css'

export default function Header() {
  return (
    <div className="header-element">
      <li className="link-items">
        <Link to="/">
          <h1 className="covid-heading">
            COVID19<span className="span-element">INDIA</span>
          </h1>
        </Link>
      </li>

      <ul className="list-order">
        <li className="link-items">
          <Link to="/">
            <button type="button" className="header-button">
              Home
            </button>
          </Link>
        </li>
        <li className="link-items">
          <Link to="/about">
            <button type="button" className="header-button">
              About
            </button>
          </Link>
        </li>
        <li className="link-items">
          <Link to="/vaccination">
            <button type="button" className="header-button">
              Vaccination
            </button>
          </Link>
        </li>
      </ul>
    </div>
  )
}
