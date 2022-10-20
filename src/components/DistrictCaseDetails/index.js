import './index.css'

const DistrictCaseDetails = props => {
  const {CaseDetails, totalCases} = props
  const {name} = CaseDetails

  return (
    <li className="district-case-list">
      <p className="district-case-cases1">{totalCases}</p>
      <p className="district-case-cases2">{name}</p>
    </li>
  )
}
export default DistrictCaseDetails
