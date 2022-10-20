import './index.css'

const CovidStateDetails = props => {
  const {stateDetails, confirmed, deceased, recovered, population} = props
  const activeCases = confirmed - (recovered + deceased)
  return (
    <li className="state-header-containers-list">
      <h1 className="state-name">{stateDetails.state_name}</h1>
      <p className="state-paragraph1">{confirmed}</p>
      <p className="state-paragraph2">{activeCases}</p>
      <p className="state-paragraph3">{recovered}</p>
      <p className="state-paragraph4">{deceased}</p>
      <p className="state-paragraph5">{population}</p>
    </li>
  )
}
export default CovidStateDetails
