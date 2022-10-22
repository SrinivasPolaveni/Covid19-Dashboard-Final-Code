import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import Footer from '../Footer'
import DistrictCaseDetails from '../DistrictCaseDetails'
import Covid19DateWiseCharts from '../Covid19DateWiseCharts'
import './index.css'

const statesList = [
  {
    state_code: 'AN',
    state_name: 'Andaman and Nicobar Islands',
  },
  {
    state_code: 'AP',
    state_name: 'Andhra Pradesh',
  },
  {
    state_code: 'AR',
    state_name: 'Arunachal Pradesh',
  },
  {
    state_code: 'AS',
    state_name: 'Assam',
  },
  {
    state_code: 'BR',
    state_name: 'Bihar',
  },
  {
    state_code: 'CH',
    state_name: 'Chandigarh',
  },
  {
    state_code: 'CT',
    state_name: 'Chhattisgarh',
  },
  {
    state_code: 'DN',
    state_name: 'Dadra and Nagar Haveli and Daman and Diu',
  },
  {
    state_code: 'DL',
    state_name: 'Delhi',
  },
  {
    state_code: 'GA',
    state_name: 'Goa',
  },
  {
    state_code: 'GJ',
    state_name: 'Gujarat',
  },
  {
    state_code: 'HR',
    state_name: 'Haryana',
  },
  {
    state_code: 'HP',
    state_name: 'Himachal Pradesh',
  },
  {
    state_code: 'JK',
    state_name: 'Jammu and Kashmir',
  },
  {
    state_code: 'JH',
    state_name: 'Jharkhand',
  },
  {
    state_code: 'KA',
    state_name: 'Karnataka',
  },
  {
    state_code: 'KL',
    state_name: 'Kerala',
  },
  {
    state_code: 'LA',
    state_name: 'Ladakh',
  },
  {
    state_code: 'LD',
    state_name: 'Lakshadweep',
  },
  {
    state_code: 'MH',
    state_name: 'Maharashtra',
  },
  {
    state_code: 'MP',
    state_name: 'Madhya Pradesh',
  },
  {
    state_code: 'MN',
    state_name: 'Manipur',
  },
  {
    state_code: 'ML',
    state_name: 'Meghalaya',
  },
  {
    state_code: 'MZ',
    state_name: 'Mizoram',
  },
  {
    state_code: 'NL',
    state_name: 'Nagaland',
  },
  {
    state_code: 'OR',
    state_name: 'Odisha',
  },
  {
    state_code: 'PY',
    state_name: 'Puducherry',
  },
  {
    state_code: 'PB',
    state_name: 'Punjab',
  },
  {
    state_code: 'RJ',
    state_name: 'Rajasthan',
  },
  {
    state_code: 'SK',
    state_name: 'Sikkim',
  },
  {
    state_code: 'TN',
    state_name: 'Tamil Nadu',
  },
  {
    state_code: 'TG',
    state_name: 'Telangana',
  },
  {
    state_code: 'TR',
    state_name: 'Tripura',
  },
  {
    state_code: 'UP',
    state_name: 'Uttar Pradesh',
  },
  {
    state_code: 'UT',
    state_name: 'Uttarakhand',
  },
  {
    state_code: 'WB',
    state_name: 'West Bengal',
  },
]

const apiStatusConstant = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
}

const casesStatusConstant = {
  confirmed: 'CONFIRMED',
  active: 'ACTIVE',
  recovered: 'RECOVERED',
  deceased: 'DECEASED',
}

class StateWiseCaronaCasesView extends Component {
  state = {
    apiStatus: apiStatusConstant.initial,
    listCasesStatus: casesStatusConstant.confirmed,
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
      this.successfullySetData(data)
    }
  }

  renderStateName = () => {
    const {dataList} = this.state

    const {match} = this.props
    const {params} = match
    const {stateCode} = params
    const {total, meta} = dataList[stateCode]
    const {tested} = total
    const lastUpdated1 = meta.last_updated

    const lastUpdated = new Date(lastUpdated1)

    const date = lastUpdated.getDate()
    const month = lastUpdated.getMonth()
    const year = lastUpdated.getFullYear()

    const newDate = `${date}-${month + 1}-${year}`

    let stateName = ''

    statesList.forEach(eachItem => {
      if (eachItem.state_code === stateCode) {
        stateName = eachItem.state_name
      }
      return eachItem
    })

    return (
      <div className="search-state-name-card">
        <div className="search-state-name-card1">
          <div className="search-state-name-card2">
            <h1 className="search-state-name-heading">{stateName}</h1>
          </div>
          <p className="search-state-name-paragraph">
            Last update on {newDate}
          </p>
        </div>
        <div className="search-state-name-card1">
          <p className="search-state-name-paragraph">Tested</p>
          <p className="search-state-name-paragraph1">{tested}</p>
        </div>
      </div>
    )
  }

  getDistrictWiseConfirmedCases = () => {
    const {dataList} = this.state

    const {match} = this.props
    const {params} = match
    const {stateCode} = params
    const {districts} = dataList[stateCode]
    console.log(districts)

    function convertObjectsDataIntoListItemsUsingForInMethod() {
      const resultList = []

      const keyNames = Object.keys(districts)

      keyNames.forEach(keyName => {
        if (districts[keyName]) {
          const {total} = districts[keyName]

          const confirmed = total.confirmed ? total.confirmed : 0
          const deceased = total.deceased ? total.deceased : 0
          const recovered = total.recovered ? total.recovered : 0
          const tested = total.tested ? total.tested : 0

          resultList.push({
            name: keyName,
            confirmed,
            deceased,
            recovered,
            tested,
            active: confirmed - (deceased + recovered),
          })
        }
      })
      return resultList
    }

    const listFormattedDataUsingForInMethod = convertObjectsDataIntoListItemsUsingForInMethod()
    listFormattedDataUsingForInMethod.sort((x, y) => y.confirmed - x.confirmed)
    return (
      <ul
        className="district-cases-container-view"
        testid="topDistrictsUnorderedList"
      >
        {listFormattedDataUsingForInMethod.map(eachItem => (
          <DistrictCaseDetails
            key={eachItem.name}
            CaseDetails={eachItem}
            totalCases={eachItem.confirmed}
          />
        ))}
      </ul>
    )
  }

  getDistrictWiseActiveCases = () => {
    const {dataList} = this.state

    const {match} = this.props
    const {params} = match
    const {stateCode} = params
    const {districts} = dataList[stateCode]
    console.log(districts)

    function convertObjectsDataIntoListItemsUsingForInMethod() {
      const resultList = []

      const keyNames = Object.keys(districts)

      keyNames.forEach(keyName => {
        if (districts[keyName]) {
          const {total} = districts[keyName]

          const confirmed = total.confirmed ? total.confirmed : 0
          const deceased = total.deceased ? total.deceased : 0
          const recovered = total.recovered ? total.recovered : 0
          const tested = total.tested ? total.tested : 0

          resultList.push({
            name: keyName,
            confirmed,
            deceased,
            recovered,
            tested,
            active: confirmed - (deceased + recovered),
          })
        }
      })
      return resultList
    }

    const listFormattedDataUsingForInMethod = convertObjectsDataIntoListItemsUsingForInMethod()
    listFormattedDataUsingForInMethod.sort((x, y) => y.active - x.active)
    return (
      <ul
        className="district-cases-container-view"
        testid="topDistrictsUnorderedList"
      >
        {listFormattedDataUsingForInMethod.map(eachItem => (
          <DistrictCaseDetails
            key={eachItem.name}
            CaseDetails={eachItem}
            totalCases={eachItem.active}
          />
        ))}
      </ul>
    )
  }

  getDistrictWiseRecoveredCases = () => {
    const {dataList} = this.state

    const {match} = this.props
    const {params} = match
    const {stateCode} = params
    const {districts} = dataList[stateCode]
    console.log(districts)

    function convertObjectsDataIntoListItemsUsingForInMethod() {
      const resultList = []

      const keyNames = Object.keys(districts)

      keyNames.forEach(keyName => {
        if (districts[keyName]) {
          const {total} = districts[keyName]

          const confirmed = total.confirmed ? total.confirmed : 0
          const deceased = total.deceased ? total.deceased : 0
          const recovered = total.recovered ? total.recovered : 0
          const tested = total.tested ? total.tested : 0

          resultList.push({
            name: keyName,
            confirmed,
            deceased,
            recovered,
            tested,
            active: confirmed - (deceased + recovered),
          })
        }
      })
      return resultList
    }

    const listFormattedDataUsingForInMethod = convertObjectsDataIntoListItemsUsingForInMethod()
    listFormattedDataUsingForInMethod.sort((x, y) => y.recovered - x.recovered)
    return (
      <ul
        className="district-cases-container-view"
        testid="topDistrictsUnorderedList"
      >
        {listFormattedDataUsingForInMethod.map(eachItem => (
          <DistrictCaseDetails
            key={eachItem.name}
            CaseDetails={eachItem}
            totalCases={eachItem.recovered}
          />
        ))}
      </ul>
    )
  }

  getDistrictWiseDeceasedCases = () => {
    const {dataList} = this.state

    const {match} = this.props
    const {params} = match
    const {stateCode} = params
    const {districts} = dataList[stateCode]
    console.log(districts)

    function convertObjectsDataIntoListItemsUsingForInMethod() {
      const resultList = []

      const keyNames = Object.keys(districts)

      keyNames.forEach(keyName => {
        if (districts[keyName]) {
          const {total} = districts[keyName]

          const confirmed = total.confirmed ? total.confirmed : 0
          const deceased = total.deceased ? total.deceased : 0
          const recovered = total.recovered ? total.recovered : 0
          const tested = total.tested ? total.tested : 0

          resultList.push({
            name: keyName,
            confirmed,
            deceased,
            recovered,
            tested,
            active: confirmed - (deceased + recovered),
          })
        }
      })
      return resultList
    }

    const listFormattedDataUsingForInMethod = convertObjectsDataIntoListItemsUsingForInMethod()
    listFormattedDataUsingForInMethod.sort((x, y) => y.deceased - x.deceased)
    return (
      <ul
        className="district-cases-container-view"
        testid="topDistrictsUnorderedList"
      >
        {listFormattedDataUsingForInMethod.map(eachItem => (
          <DistrictCaseDetails
            key={eachItem.name}
            CaseDetails={eachItem}
            totalCases={eachItem.deceased}
          />
        ))}
      </ul>
    )
  }

  onChangeConfirmedCasesView = () => {
    this.setState({listCasesStatus: casesStatusConstant.confirmed})
  }

  onChangeActiveCasesView = () => {
    this.setState({listCasesStatus: casesStatusConstant.active})
  }

  onChangeRecoveredCasesView = () => {
    this.setState({listCasesStatus: casesStatusConstant.recovered})
  }

  onChangeDeceasedCasesView = () => {
    this.setState({listCasesStatus: casesStatusConstant.deceased})
  }

  renderStateTotalConfirmedData = () => {
    const {dataList, listCasesStatus} = this.state

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
      <>
        <div className="country-cases-container">
          <button
            type="button"
            className="cases-change-button"
            onClick={this.onChangeConfirmedCasesView}
          >
            <div
              className="test-confirmed-cases-card"
              testid="stateSpecificConfirmedCasesContainer "
            >
              <p className="confirmed-heading">Confirmed</p>
              <img
                src="https://res.cloudinary.com/dudkplmad/image/upload/v1666023343/check-mark_1_1_onb2zw.png"
                alt="state specific confirmed cases pic"
                className="cases-image"
              />
              <p className="confirmed-heading">{totalConfirmed}</p>
            </div>
          </button>
          <button
            type="button"
            className="cases-change-button"
            onClick={this.onChangeActiveCasesView}
          >
            <div
              className="test-cases-card"
              testid="stateSpecificActiveCasesContainer"
            >
              <p className="Active-heading">Active</p>
              <img
                src="https://res.cloudinary.com/dudkplmad/image/upload/v1666023152/protection_1_gwazvg.png"
                alt="state specific active cases pic"
                className="cases-image"
              />
              <p className="Active-heading">{activeCases}</p>
            </div>
          </button>
          <button
            type="button"
            className="cases-change-button"
            onClick={this.onChangeRecoveredCasesView}
          >
            <div
              className="test-cases-card"
              testid="stateSpecificRecoveredCasesContainer"
            >
              <p className="Recovered-heading">Recovered</p>
              <img
                src="https://res.cloudinary.com/dudkplmad/image/upload/v1666023111/recovered_1_f7zgdm.png"
                alt="state specific recovered cases pic"
                className="cases-image"
              />
              <p className="Recovered-heading">{recoveredCases}</p>
            </div>
          </button>
          <button
            type="button"
            className="cases-change-button"
            onClick={this.onChangeDeceasedCasesView}
          >
            <div
              className="test-cases-card"
              testid="stateSpecificDeceasedCasesContainer"
            >
              <p className="Deceased-heading">Deceased</p>
              <img
                src="https://res.cloudinary.com/dudkplmad/image/upload/v1666023172/breathing_1_yottpw.png"
                alt="state specific deceased cases pic"
                className="cases-image"
              />
              <p className="Deceased-heading">{deceasedCases}</p>
            </div>
          </button>
        </div>
        <div className="district-main-container" testid="lineChartsContainer">
          <h1 className="confirmed-heading1">Top Districts</h1>

          {this.getDistrictWiseConfirmedCases()}
        </div>
        <Covid19DateWiseCharts
          stateCode={stateCode}
          listCasesStatus={listCasesStatus}
        />
      </>
    )
  }

  renderActiveView = () => {
    const {dataList, listCasesStatus} = this.state

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
      <>
        <div className="country-cases-container">
          <button
            type="button"
            className="cases-change-button"
            onClick={this.onChangeConfirmedCasesView}
          >
            <div
              className="test-cases-card"
              testid="stateSpecificConfirmedCasesContainer"
            >
              <p className="confirmed-heading">Confirmed</p>
              <img
                src="https://res.cloudinary.com/dudkplmad/image/upload/v1666023343/check-mark_1_1_onb2zw.png"
                alt="state specific confirmed cases pic"
                className="image"
              />
              <p className="confirmed-heading">{totalConfirmed}</p>
            </div>
          </button>
          <button
            type="button"
            className="cases-change-button"
            onClick={this.onChangeActiveCasesView}
          >
            <div
              className="test-Active-cases-card"
              testid="stateSpecificActiveCasesContainer"
            >
              <p className="Active-heading">Active</p>
              <img
                src="https://res.cloudinary.com/dudkplmad/image/upload/v1666023152/protection_1_gwazvg.png"
                alt="state specific active cases pic"
                className="image"
              />
              <p className="Active-heading">{activeCases}</p>
            </div>
          </button>
          <button
            type="button"
            className="cases-change-button"
            onClick={this.onChangeRecoveredCasesView}
          >
            <div
              className="test-cases-card"
              testid="stateSpecificRecoveredCasesContainer"
            >
              <p className="Recovered-heading">Recovered</p>
              <img
                src="https://res.cloudinary.com/dudkplmad/image/upload/v1666023111/recovered_1_f7zgdm.png"
                alt="state specific recovered cases pic"
                className="image"
              />
              <p className="Recovered-heading">{recoveredCases}</p>
            </div>
          </button>
          <button
            type="button"
            className="cases-change-button"
            onClick={this.onChangeDeceasedCasesView}
          >
            <div
              className="test-cases-card"
              testid="stateSpecificDeceasedCasesContainer"
            >
              <p className="Deceased-heading">Deceased</p>
              <img
                src="https://res.cloudinary.com/dudkplmad/image/upload/v1666023172/breathing_1_yottpw.png"
                alt="state specific deceased cases pic"
                className="image"
              />
              <p className="Deceased-heading">{deceasedCases}</p>
            </div>
          </button>
        </div>
        <div className="district-main-container" testid="lineChartsContainer">
          <h1 className="confirmed-heading2">Top Districts</h1>

          {this.getDistrictWiseActiveCases()}
        </div>
        <Covid19DateWiseCharts
          stateCode={stateCode}
          listCasesStatus={listCasesStatus}
        />
      </>
    )
  }

  renderRecoveredView = () => {
    const {dataList, listCasesStatus} = this.state

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
      <>
        <div className="country-cases-container">
          <button
            type="button"
            className="cases-change-button"
            onClick={this.onChangeConfirmedCasesView}
          >
            <div
              className="test-cases-card"
              testid="stateSpecificConfirmedCasesContainer"
            >
              <p className="confirmed-heading">Confirmed</p>
              <img
                src="https://res.cloudinary.com/dudkplmad/image/upload/v1666023343/check-mark_1_1_onb2zw.png"
                alt="state specific confirmed cases pic"
                className="image"
              />
              <p className="confirmed-heading">{totalConfirmed}</p>
            </div>
          </button>
          <button
            type="button"
            className="cases-change-button"
            onClick={this.onChangeActiveCasesView}
          >
            <div
              className="test-cases-card"
              testid="stateSpecificActiveCasesContainer"
            >
              <p className="Active-heading">Active</p>
              <img
                src="https://res.cloudinary.com/dudkplmad/image/upload/v1666023152/protection_1_gwazvg.png"
                alt="state specific active cases pic"
                className="image"
              />
              <p className="Active-heading">{activeCases}</p>
            </div>
          </button>
          <button
            type="button"
            className="cases-change-button"
            onClick={this.onChangeRecoveredCasesView}
          >
            <div
              className="test-Recovered-cases-card"
              testid="stateSpecificRecoveredCasesContainer"
            >
              <p className="Recovered-heading">Recovered</p>
              <img
                src="https://res.cloudinary.com/dudkplmad/image/upload/v1666023111/recovered_1_f7zgdm.png"
                alt="state specific recovered cases pic"
                className="image"
              />
              <p className="Recovered-heading">{recoveredCases}</p>
            </div>
          </button>
          <button
            type="button"
            className="cases-change-button"
            onClick={this.onChangeDeceasedCasesView}
          >
            <div
              className="test-cases-card"
              testid="stateSpecificDeceasedCasesContainer"
            >
              <p className="Deceased-heading">Deceased</p>
              <img
                src="https://res.cloudinary.com/dudkplmad/image/upload/v1666023172/breathing_1_yottpw.png"
                alt="state specific deceased cases pic"
                className="image"
              />
              <p className="Deceased-heading">{deceasedCases}</p>
            </div>
          </button>
        </div>
        <div className="district-main-container" testid="lineChartsContainer">
          <h1 className="confirmed-heading3">Top Districts</h1>

          {this.getDistrictWiseRecoveredCases()}
        </div>
        <Covid19DateWiseCharts
          stateCode={stateCode}
          listCasesStatus={listCasesStatus}
        />
      </>
    )
  }

  renderDeceasedView = () => {
    const {dataList, listCasesStatus} = this.state

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
      <>
        <div className="country-cases-container">
          <button
            type="button"
            className="cases-change-button"
            onClick={this.onChangeConfirmedCasesView}
          >
            <div
              className="test-cases-card"
              testid="stateSpecificConfirmedCasesContainer"
            >
              <p className="confirmed-heading">Confirmed</p>
              <img
                src="https://res.cloudinary.com/dudkplmad/image/upload/v1666023343/check-mark_1_1_onb2zw.png"
                alt="state specific confirmed cases pic"
                className="image"
              />
              <p className="confirmed-heading">{totalConfirmed}</p>
            </div>
          </button>
          <button
            type="button"
            className="cases-change-button"
            onClick={this.onChangeActiveCasesView}
          >
            <div
              className="test-cases-card"
              testid="stateSpecificActiveCasesContainer"
            >
              <p className="Active-heading">Active</p>
              <img
                src="https://res.cloudinary.com/dudkplmad/image/upload/v1666023152/protection_1_gwazvg.png"
                alt="state specific active cases pic"
                className="image"
              />
              <p className="Active-heading">{activeCases}</p>
            </div>
          </button>
          <button
            type="button"
            className="cases-change-button"
            onClick={this.onChangeRecoveredCasesView}
          >
            <div
              className="test-cases-card"
              testid="stateSpecificRecoveredCasesContainer"
            >
              <p className="Recovered-heading">Recovered</p>
              <img
                src="https://res.cloudinary.com/dudkplmad/image/upload/v1666023111/recovered_1_f7zgdm.png"
                alt="state specific recovered cases pic"
                className="image"
              />
              <p className="Recovered-heading">{recoveredCases}</p>
            </div>
          </button>
          <button
            type="button"
            className="cases-change-button"
            onClick={this.onChangeDeceasedCasesView}
          >
            <div
              className="test-Deceased-cases-card"
              testid="stateSpecificDeceasedCasesContainer"
            >
              <p className="Deceased-heading">Deceased</p>
              <img
                src="https://res.cloudinary.com/dudkplmad/image/upload/v1666023172/breathing_1_yottpw.png"
                alt="state specific deceased cases pic"
                className="image"
              />
              <p className="Deceased-heading">{deceasedCases}</p>
            </div>
          </button>
        </div>
        <div className="district-main-container" testid="lineChartsContainer">
          <h1 className="confirmed-heading4">Top Districts</h1>

          {this.getDistrictWiseDeceasedCases()}
        </div>
        <Covid19DateWiseCharts
          stateCode={stateCode}
          listCasesStatus={listCasesStatus}
        />
      </>
    )
  }

  getRenderingCasesStatus = () => {
    const {listCasesStatus} = this.state
    switch (listCasesStatus) {
      case casesStatusConstant.confirmed:
        return this.renderStateTotalConfirmedData()
      case casesStatusConstant.active:
        return this.renderActiveView()
      case casesStatusConstant.recovered:
        return this.renderRecoveredView()

      case casesStatusConstant.deceased:
        return this.renderDeceasedView()

      default:
        return null
    }
  }

  renderSuccessView = () => (
    <div>
      {this.renderStateName()}
      {this.getRenderingCasesStatus()}

      <Footer />
    </div>
  )

  renderLoadingView = () => (
    <div className="loader-card" testid="stateDetailsLoader">
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
