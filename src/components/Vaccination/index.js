import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Select from 'react-select'
import {AiOutlineHome} from 'react-icons/ai'

import Footer from '../Footer'
import Header from '../Header'

import './index.css'

const apiStatusConstant = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
}

class Vaccination extends Component {
  state = {
    selectedOption: null,
    selectedOption1: null,
    options1: [],
    options2: [],
    apiStatus: apiStatusConstant.initial,
  }

  componentDidMount() {
    this.getStateAndDistrictWiseCasesData()
    this.getStateData()
  }

  successfullySetStateCasesData = data => {
    console.log(data)
    this.setState({apiStatus: apiStatusConstant.success})
  }

  getStateAndDistrictWiseCasesData = async () => {
    this.setState({apiStatus: apiStatusConstant.inProgress})

    const apiUrl = 'https://apis.ccbp.in/covid19-vaccination-data/'
    const option = {
      method: 'GET',
    }
    const response = await fetch(apiUrl, option)
    console.log(response)

    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
      this.successfullySetStateCasesData(data)
    }
  }

  successfullySetStateData = data => {
    this.setState({options1: data})
  }

  getStateData = async () => {
    const apiUrl = 'https://apis.ccbp.in/covid19-state-ids'
    const option = {
      method: 'GET',
    }
    const response = await fetch(apiUrl, option)
    const data = await response.json()
    if (response.ok === true) {
      const updatedData = data.states.map(eachItem => ({
        value: eachItem.state_id,
        label: eachItem.state_name,
      }))
      this.successfullySetStateData(updatedData)
    }
  }

  successfullySetDistrictData = districtData => {
    this.setState({
      apiStatus: apiStatusConstant.success,
      options2: districtData,
    })
  }

  districtListview = async () => {
    const {selectedOption} = this.state

    const apiUrl = `https://apis.ccbp.in/covid19-districts-data/${selectedOption.value}`
    const option = {
      method: 'GET',
    }
    const response = await fetch(apiUrl, option)
    console.log(response)
    const districtData = await response.json()
    console.log(districtData)
    if (response.ok === true) {
      const districtDataUpdated = districtData.districts.map(eachItem => ({
        value: eachItem.district_id,
        label: eachItem.district_name,
      }))
      this.successfullySetDistrictData(districtDataUpdated)
    }
  }

  handleChange = selectedOption => {
    this.setState({selectedOption}, this.districtListview)
  }

  handleChange1 = selectedOption1 => {
    this.setState({selectedOption1})
  }

  renderLoadingView = () => (
    <div className="loader-card">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  renderSuccessView = () => (
    <div className="temporary-card">
      <h1 className="temporary-heading">Wellcome To Vaccination World ...</h1>
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
    const {selectedOption, selectedOption1, options2, options1} = this.state
    return (
      <>
        <Header />
        <div className="Vaccination-main-container">
          <div>
            <div className="Vaccination-home-container">
              <AiOutlineHome className="home" />
              <h1 className="Vaccination-heading">
                India/
                {selectedOption !== null ? selectedOption.label : 'Telangana'}
              </h1>
            </div>
            <div className="Select-App-container">
              <div className="Select-App">
                <Select
                  value={selectedOption}
                  placeholder="Select State"
                  onChange={this.handleChange}
                  options={options1}
                  className="Select-App1"
                />
              </div>
              <div className="Select-App">
                <Select
                  value={selectedOption1}
                  onChange={this.handleChange1}
                  options={options2}
                  placeholder="Select District"
                  className="Select-App1"
                />
              </div>
            </div>
          </div>
          {this.getRenderingStatus()}

          <div className="Select-footer-card">
            <Footer />
          </div>
        </div>
      </>
    )
  }
}
export default Vaccination
