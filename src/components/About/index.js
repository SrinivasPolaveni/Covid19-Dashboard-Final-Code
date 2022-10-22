import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import './index.css'
import Footer from '../Footer'
import AboutDataList from '../AboutDataList'

const apiStatusConstant = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
}

class About extends Component {
  state = {
    apiStatus: apiStatusConstant.initial,
    aboutDataList: [],
  }

  componentDidMount() {
    this.getCovid19TotalAboutData()
  }

  successfullySetData = data => {
    this.setState({apiStatus: apiStatusConstant.success, aboutDataList: data})
  }

  getCovid19TotalAboutData = async () => {
    this.setState({apiStatus: apiStatusConstant.inProgress})

    const apiUrl = 'https://apis.ccbp.in/covid19-faqs'
    const option = {
      method: 'GET',
    }
    const response = await fetch(apiUrl, option)
    const data = await response.json()
    if (response.ok === true) {
      console.log(data.faq)
      this.successfullySetData(data.faq)
    }
  }

  renderLoadingView = () => (
    <div className="loader-card" testid="aboutRouteLoader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  renderSuccessView = () => {
    const {aboutDataList} = this.state

    return (
      <div className="about-main-container">
        <h1 className="about-heading">About</h1>
        <p className="about-paragraph">Last update on march 28th 2021.</p>
        <h1 className="about-heading1">
          COVID-19 vaccines be ready for distribution
        </h1>
        <ul className="about-unordered-list-card" testid="faqsUnorderedList">
          {aboutDataList.map(eachItem => (
            <AboutDataList key={eachItem.qno} itemDetails={eachItem} />
          ))}
        </ul>

        <Footer />
      </div>
    )
  }

  getRenderingStatus = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstant.success:
        return this.renderSuccessView()
      case apiStatusConstant.failure:
        return null
      case apiStatusConstant.inProgress:
        return this.renderLoadingView()

      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="about-main-container">{this.getRenderingStatus()}</div>
      </>
    )
  }
}
export default About
