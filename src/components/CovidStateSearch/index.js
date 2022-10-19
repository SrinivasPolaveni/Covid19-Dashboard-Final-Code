import {Link} from 'react-router-dom'

import {BiChevronRightSquare} from 'react-icons/bi'

import './index.css'

const CovidStateSearch = props => {
  const {stateDetails} = props

  return (
    <>
      <li className="searched-state-list-container1">
        <Link
          to={`/state/${stateDetails.state_code}`}
          className="searched-state-list-container"
        >
          <p className="searched-state-name">{stateDetails.state_name}</p>
          <button type="button" className="searched-state-button">
            {stateDetails.state_code}
            <BiChevronRightSquare className="right-angular-icon" />
          </button>
        </Link>
      </li>
    </>
  )
}
export default CovidStateSearch
