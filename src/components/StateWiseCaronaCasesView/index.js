import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import Footer from '../Footer'
import './index.css'

const apiStatusConstant = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
}

class StateWiseCaronaCasesView extends Component {
  state = {
    apiStatus: apiStatusConstant.initial,
    dataList: {},
  }

  componentDidMount() {
    this.getCovid19TotalData()
  }

  successfullySetData = data => {
    this.setState({apiStatus: apiStatusConstant.success, dataList: data})
  }

  getCovid19TotalData = async () => {
    this.setState({apiStatus: apiStatusConstant.inProgress})

    const apiUrl = 'https://apis.ccbp.in/covid19-state-wise-data'
    const option = {
      method: 'GET',
    }
    const response = await fetch(apiUrl, option)
    const data = await response.json()
    if (response.ok === true) {
      console.log(data)
      this.successfullySetData(data)
    }
  }

  renderStateTotalData = () => {
    const {dataList} = this.state

    const {match} = this.props
    const {params} = match
    const {stateCode} = params
    const {total} = dataList[stateCode]
    const {confirmed, deceased, recovered} = total
    const totalConfirmed = confirmed
    const deceasedCases = deceased
    const recoveredCases = recovered
    const activeCases = totalConfirmed - (recoveredCases + deceasedCases)

    return (
      <div className="country-cases-container">
        <div className="test-cases-card">
          <h1 className="confirmed-heading">Confirmed</h1>
          <img
            src="https://res.cloudinary.com/dudkplmad/image/upload/v1666023343/check-mark_1_1_onb2zw.png"
            alt="Confirmed"
            className="image"
          />
          <p className="confirmed-heading">{totalConfirmed}</p>
        </div>
        <div className="test-cases-card">
          <h1 className="Active-heading">Active</h1>
          <img
            src="https://res.cloudinary.com/dudkplmad/image/upload/v1666023152/protection_1_gwazvg.png"
            alt="Active"
            className="image"
          />
          <p className="Active-heading">{activeCases}</p>
        </div>
        <div className="test-cases-card">
          <h1 className="Recovered-heading">Recovered</h1>
          <img
            src="https://res.cloudinary.com/dudkplmad/image/upload/v1666023111/recovered_1_f7zgdm.png"
            alt="Recovered"
            className="image"
          />
          <p className="Recovered-heading">{recoveredCases}</p>
        </div>
        <div className="test-cases-card">
          <h1 className="Deceased-heading">Deceased</h1>
          <img
            src="https://res.cloudinary.com/dudkplmad/image/upload/v1666023172/breathing_1_yottpw.png"
            alt="Deceased"
            className="image"
          />
          <p className="Deceased-heading">{deceasedCases}</p>
        </div>
      </div>
    )
  }

  renderSuccessView = () => {
    const {searchInputValue} = this.state
    return (
      <div className="home-main-container">
        <div className="search-input-card">
          <div className="search-input-container">
            <input
              type="search"
              placeholder="Enter The State"
              className="search-input"
              value={searchInputValue}
              onChange={this.onChangeInputValue}
            />
          </div>
        </div>
        {this.renderStateTotalData()}
        <Footer />
      </div>
    )
  }

  renderLoadingView = () => (
    <div className="loader-card">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

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
        <div className="home-main-container">{this.getRenderingStatus()}</div>
      </>
    )
  }
}
export default StateWiseCaronaCasesView
