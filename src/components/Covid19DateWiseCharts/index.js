import {Component} from 'react'
import {
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
  BarChart,
  Bar,
} from 'recharts'

import './index.css'

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

class Covid19DateWiseCharts extends Component {
  state = {chartsDataList: [], apiStatus: apiStatusConstant.initial}

  componentDidMount() {
    this.getCovid19ChartsTotalData()
  }

  getConvertionData = requestedData => {
    console.log(requestedData)

    this.setState({
      chartsDataList: requestedData,
      apiStatus: apiStatusConstant.success,
    })
  }

  getCovid19ChartsTotalData = async () => {
    const {stateCode} = this.props

    const requestUrl = `https://apis.ccbp.in/covid19-timelines-data/${stateCode}`
    const options = {
      method: 'GET',
    }

    const response = await fetch(requestUrl, options)

    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
      const keyNames = Object.keys(data)
      const searchingData = Object.keys(data[keyNames].dates)

      const requestedData = searchingData.map(date => ({
        date,
        confirmed: data[keyNames].dates[date].total.confirmed,
        deceased: data[keyNames].dates[date].total.deceased,
        recovered: data[keyNames].dates[date].total.recovered,
        tested: data[keyNames].dates[date].total.tested,
        active:
          data[keyNames].dates[date].total.confirmed -
          (data[keyNames].dates[date].total.deceased +
            data[keyNames].dates[date].total.recovered),
      }))
      this.getConvertionData(requestedData)
    } else {
      this.setState({apiStatus: apiStatusConstant.failure})
    }
  }

  renderConfirmedBarGraphView = () => {
    const {chartsDataList} = this.state
    const dataList = chartsDataList.slice((-10: -1))
    return (
      <div className="Line-Chart-container">
        <BarChart
          width={900}
          height={450}
          data={dataList}
          style={{color: '#ff073a'}}
        >
          <XAxis dataKey="date" />

          <Tooltip />
          <Legend />
          <Bar
            dataKey="confirmed"
            fill="#ff073a"
            className="bar"
            label={{position: 'top', color: 'white'}}
          />
        </BarChart>
      </div>
    )
  }

  renderActiveBarGraphView = () => {
    const {chartsDataList} = this.state
    const dataList = chartsDataList.slice((-10: -1))
    return (
      <div className="Line-Chart-container">
        <BarChart
          width={900}
          height={450}
          data={dataList}
          style={{color: '#0A4FA0'}}
        >
          <XAxis dataKey="date" />

          <Tooltip />
          <Legend />
          <Bar
            dataKey="active"
            fill="#0A4FA0"
            className="bar"
            label={{position: 'top', color: 'white'}}
          />
        </BarChart>
      </div>
    )
  }

  renderRecoveredBarGraphView = () => {
    const {chartsDataList} = this.state
    const dataList = chartsDataList.slice((-10: -1))
    return (
      <div className="Line-Chart-container">
        <BarChart
          width={900}
          height={450}
          data={dataList}
          style={{color: ' #216837'}}
        >
          <XAxis dataKey="date" />

          <Tooltip />
          <Legend />
          <Bar
            dataKey="recovered"
            fill="#216837"
            className="bar"
            label={{position: 'top', color: 'white'}}
          />
        </BarChart>
      </div>
    )
  }

  renderDeceasedBarGraphView = () => {
    const {chartsDataList} = this.state
    const dataList = chartsDataList.slice((-10: -1))
    return (
      <div className="Line-Chart-container">
        <BarChart
          width={900}
          height={450}
          data={dataList}
          style={{color: '#474C57'}}
        >
          <XAxis dataKey="date" />

          <Tooltip />
          <Legend />
          <Bar
            dataKey="deceased"
            fill="#474C57"
            className="bar"
            label={{position: 'top', color: 'white'}}
          />
        </BarChart>
      </div>
    )
  }

  renderStateTotalChartsData = () => {
    const {chartsDataList} = this.state

    return (
      <>
        <div className="district-main-container">
          {this.renderBarGraphView()}
          <h1 className="Line-Chart-heading">Daily Spread Trends</h1>
          <div className="Line-Chart-container">
            <div className="App">
              <LineChart
                width={730}
                height={250}
                data={chartsDataList}
                margin={{top: 5, right: 30, left: 20, bottom: 5}}
              >
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="confirmed"
                  stroke="#FF073A"
                  className="line-bar1"
                />
              </LineChart>
            </div>

            <div>
              <div className="App1 recharts-wrapper">
                <LineChart
                  width={730}
                  height={250}
                  data={chartsDataList}
                  margin={{top: 5, right: 30, left: 20, bottom: 5}}
                >
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="active"
                    stroke="#007BFF"
                    className="line-bar1"
                  />
                </LineChart>
              </div>
            </div>
            <div>
              <div className="App2">
                <LineChart
                  width={730}
                  height={250}
                  data={chartsDataList}
                  margin={{top: 5, right: 30, left: 20, bottom: 5}}
                >
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="recovered"
                    stroke="#27A243"
                    className="line-bar1"
                  />
                </LineChart>
              </div>
            </div>
            <div>
              <div className="App3">
                <LineChart
                  width={730}
                  height={250}
                  data={chartsDataList}
                  margin={{top: 5, right: 30, left: 20, bottom: 5}}
                >
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="deceased"
                    stroke="#6C757D"
                    className="line-bar1"
                  />
                </LineChart>
              </div>
            </div>
            <div>
              <div className="App4">
                <LineChart
                  width={730}
                  height={250}
                  data={chartsDataList}
                  margin={{top: 5, right: 30, left: 20, bottom: 5}}
                >
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="tested"
                    stroke=" #9673B9"
                    className="line-bar5"
                  />
                </LineChart>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }

  getRenderingStatus = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstant.success:
        return this.renderStateTotalChartsData()
      case apiStatusConstant.failure:
        return null

      default:
        return null
    }
  }

  renderBarGraphView = () => {
    const {listCasesStatus} = this.props
    switch (listCasesStatus) {
      case casesStatusConstant.confirmed:
        return this.renderConfirmedBarGraphView()
      case casesStatusConstant.active:
        return this.renderActiveBarGraphView()
      case casesStatusConstant.recovered:
        return this.renderRecoveredBarGraphView()

      case casesStatusConstant.deceased:
        return this.renderDeceasedBarGraphView()

      default:
        return null
    }
  }

  render() {
    return <div>{this.getRenderingStatus()}</div>
  }
}
export default Covid19DateWiseCharts
