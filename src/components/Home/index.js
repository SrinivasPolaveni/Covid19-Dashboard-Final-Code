import {Component} from 'react'
import {FcGenericSortingAsc, FcGenericSortingDesc} from 'react-icons/fc'
import {BsSearch} from 'react-icons/bs'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import Footer from '../Footer'
import CovidStateDetails from '../CovidStateDetails'
import CovidStateSearch from '../CovidStateSearch'

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

class Home extends Component {
  state = {
    searchingStateList: statesList,
    searchInputValue: '',
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
    console.log(response)
    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
      this.successfullySetData(data)
    }
  }

  renderIndiaTotalData = () => {
    const {searchingStateList, dataList} = this.state

    let totalConfirmed = 0
    let deceasedCases = 0
    let recoveredCases = 0

    searchingStateList.forEach(element => {
      const stateCode = element.state_code

      const {total} = dataList[stateCode]
      const {confirmed, deceased, recovered} = total
      totalConfirmed += confirmed
      deceasedCases += deceased
      recoveredCases += recovered
    })

    const activeCases = totalConfirmed - (recoveredCases + deceasedCases)

    return (
      <div className="country-cases-container">
        <div>
          <div className="test-cases-card">
            <p className="confirmed-heading">Confirmed</p>
            <img
              src="https://res.cloudinary.com/dudkplmad/image/upload/v1666023343/check-mark_1_1_onb2zw.png"
              alt="country wide confirmed cases pic"
              className="image"
            />
            <p className="confirmed-heading">{totalConfirmed}</p>
          </div>
        </div>
        <div>
          <div className="test-cases-card">
            <p className="Active-heading">Active</p>
            <img
              src="https://res.cloudinary.com/dudkplmad/image/upload/v1666023152/protection_1_gwazvg.png"
              alt="country wide active cases pic"
              className="image"
            />
            <p className="Active-heading">{activeCases}</p>
          </div>
        </div>
        <div>
          <div className="test-cases-card">
            <p className="Recovered-heading">Recovered</p>
            <img
              src="https://res.cloudinary.com/dudkplmad/image/upload/v1666023111/recovered_1_f7zgdm.png"
              alt="country wide recovered cases pic"
              className="image"
            />
            <p className="Recovered-heading">{recoveredCases}</p>
          </div>
        </div>
        <div>
          <div className="test-cases-card">
            <p className="Deceased-heading">Deceased</p>
            <img
              src="https://res.cloudinary.com/dudkplmad/image/upload/v1666023172/breathing_1_yottpw.png"
              alt="country wide deceased cases pic"
              className="image"
            />
            <p className="Deceased-heading">{deceasedCases}</p>
          </div>
        </div>
      </div>
    )
  }

  onChangeListToAsc = () => {
    const {searchingStateList} = this.state

    const sortedList = searchingStateList.sort((a, b) => {
      const x = a.state_name.toUpperCase()
      const y = b.state_name.toUpperCase()
      return x > y ? 1 : -1
    })

    this.setState({searchingStateList: sortedList})
    console.log('hello srinivas')
  }

  onChangeListToDsc = () => {
    const {searchingStateList} = this.state

    const sortedList = searchingStateList.sort((a, b) => {
      const x = a.state_name.toUpperCase()
      const y = b.state_name.toUpperCase()
      return x < y ? 1 : -1
    })

    this.setState({searchingStateList: sortedList})
  }

  renderStateTotalData = () => {
    const {searchingStateList, dataList} = this.state
    return (
      <>
        <div className="state-containers">
          <div className="state-header-containers">
            <div className="icon-order">
              <p className="States-headeing1">States/UT</p>
              <button
                type="button"
                onClick={this.onChangeListToAsc}
                className="asc-button"
              >
                <FcGenericSortingAsc className="icon-Asc" />
              </button>
              <button
                type="button"
                onClick={this.onChangeListToDsc}
                className="asc-button"
              >
                <FcGenericSortingDesc className="icon-Asc" />
              </button>
            </div>
            <p className="States-headeing2">Confirmed</p>
            <p className="States-headeing3">Active</p>
            <p className="States-headeing4">Recovered</p>
            <p className="States-headeing5">Deceased</p>
            <p className="States-headeing6">Population</p>
          </div>
          <hr className="horizental-line" />
          <ul className="States-unordered-list-card">
            {searchingStateList.map(element => {
              const stateCode = element.state_code

              const {total, meta} = dataList[stateCode]
              const {confirmed, deceased, recovered} = total
              const {population} = meta

              return (
                <CovidStateDetails
                  key={element.state_code}
                  stateDetails={element}
                  confirmed={confirmed}
                  deceased={deceased}
                  recovered={recovered}
                  population={population}
                  stateCode={element.state_code}
                />
              )
            })}
          </ul>
        </div>
        <Footer />
      </>
    )
  }

  onChangeInputValue = event => {
    this.setState({searchInputValue: event.target.value})
  }

  renderSearchStateList = () => {
    const {searchInputValue} = this.state
    if (searchInputValue !== '') {
      const filteredListOfState = statesList.filter(eachState =>
        eachState.state_name
          .toLowerCase()
          .includes(searchInputValue.toLowerCase()),
      )
      return (
        <ul className="search-input-container1">
          {filteredListOfState.map(eachItem => (
            <CovidStateSearch
              key={eachItem.state_code}
              stateDetails={eachItem}
            />
          ))}
        </ul>
      )
    }
    return null
  }

  renderSuccessView = () => {
    const {searchInputValue} = this.state
    return (
      <div className="home-main-container">
        <div className="search-input-card">
          <div className="search-input-container">
            <BsSearch className="search-icon" />
            <input
              type="search"
              placeholder="Enter The State"
              className="search-input"
              value={searchInputValue}
              onChange={this.onChangeInputValue}
            />
          </div>
          {this.renderSearchStateList()}
        </div>
        {this.renderIndiaTotalData()}
        {this.renderStateTotalData()}
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
        <div>{this.getRenderingStatus()}</div>
      </>
    )
  }
}
export default Home
