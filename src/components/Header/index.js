import {Link} from 'react-router-dom'

import './index.css'

export default function Header() {
  return (
    <div className="header-element">
      <Link to="/">
        <button type="button" className="button">
          <h1 className="covid-heading">
            COVID19<span className="span-element">INDIA</span>
          </h1>
        </button>
      </Link>
      <ul className="list-order">
        <li className="link-items">
          <Link to="/">
            <button type="button" className="button">
              Home
            </button>
          </Link>
        </li>
        <li className="link-items">
          <Link to="/about">
            <button type="button" className="button">
              About
            </button>
          </Link>
        </li>
        <li className="link-items">
          <Link to="/vaccination">
            <button type="button" className="button">
              Vaccination
            </button>
          </Link>
        </li>
      </ul>
    </div>
  )
}
