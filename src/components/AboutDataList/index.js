import './index.css'

const AboutDataList = props => {
  const {itemDetails} = props

  return (
    <li className="about-list-card">
      <p className="about-paragraph">{itemDetails.question}</p>
      <p className="about-paragraph1">{itemDetails.answer}</p>
    </li>
  )
}
export default AboutDataList
