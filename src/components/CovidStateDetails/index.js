import {Link} from 'react-router-dom'
import './index.css'

const CovidStateDetails = props => {
  const {
    stateDetails,
    confirmed,
    deceased,
    recovered,
    population,
    stateCode,
  } = props
  const activeCases = confirmed - (recovered + deceased)
  return (
    <Link to={`/state/${stateCode}`} className="link-state-container">
      <li className="state-header-containers-list">
        <h1 className="state-name">{stateDetails.state_name}</h1>
        <p className="state-paragraph1">{confirmed}</p>
        <p className="state-paragraph2">{activeCases}</p>
        <p className="state-paragraph3">{recovered}</p>
        <p className="state-paragraph4">{deceased}</p>
        <p className="state-paragraph5">{population}</p>
      </li>
    </Link>
  )
}
export default CovidStateDetails
