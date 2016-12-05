import React, { Component } from 'react'
import { ActivityIndicator, ListView, View} from 'react-native'
import { connect } from 'react-redux'

import { DefaultText } from '../components/textComponents'
import { BoldTitleBar } from '../components/TitleBar'
import AccessibilityView from '../components/AccessibilityView'

import styles from '../styles/stylesheet'
import strings from '../resources/translations'

const UPDATE_INTERVAL_IN_SECS = 10

class VehiclesPage extends Component {

    constructor(props)
    {
        super(props)
        let ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2,
            sectionHeaderHasChanged: (s1, s2) => s1 !== s2
        })

        this.state = {
            dataBlob: {},
            dataSource: ds.cloneWithRowsAndSections({}, []),
            vehicles: [],
            stopCount: 0,
            locatingUser: true
        }
        this.sceneName = 'vehicles'
    }

    componentWillUnmount = () =>
    {
        clearInterval(this.fetchInterval)
        this.fetchInterval = false
    }

    createInterval = (props) =>
    {
        this.fetchInterval = setInterval(() =>
        {
            if (!props.isFetchingVehicles)
            {
                    props.fetchVehicles(props.beacons)

            }
        }, UPDATE_INTERVAL_IN_SECS * 1000)
    }

    componentWillReceiveProps = (nextProps) =>
    {
        if (nextProps.scene.name != this.sceneName) return

        if (this.state.locatingUser)
        {
          //  this.checkIfLocationExists(nextProps)
        }
        else
        {
            if (!this.fetchInterval)
            {
              //  this.props.getGpsLocation()
              //  this.checkIfLocationExists(nextProps)
            }

            if (nextProps.stops.length > 0)
            {
                let tempDataBlob = Object.assign({}, this.state.dataBlob)
                let stopsTemp = this.state.stops
                let sections = []

                for (let index = 0; index < nextProps.stops.length; index++)
                {
                    let sectionID = nextProps.stops[index].stop.stop_id

                    sections.push(sectionID)
                    tempDataBlob[sectionID] = nextProps.stops[index].stop.schedule

                    stopsTemp[nextProps.stops[index].stop.stop_id] = nextProps.stops[index].stop
                }
                this.setState({
                    dataBlob: tempDataBlob,
                    dataSource: this.state.dataSource.cloneWithRowsAndSections(tempDataBlob, sections),
                    stops: stopsTemp,
                    stopCount: nextProps.stops.length
                })
            }
        }
    }

    render()
    {
        let viewElement

      if (!this.props.gettingBeaconData) //fetchingVehicles
      {
        console.log(this.props.beaconData[0].major)
          viewElement =  <DefaultText>stop beacon:{'\n'}
          {this.props.beaconData[0].major}
          {this.props.beaconData[0].minor}
            </DefaultText>

          //  vehicleType={this.props.vehicle.vehicle_type} vehicleLine={this.props.vehicle.line}
          //  vehicleDestination={this.props.vehicle.destination}
        // this.renderList()
      }
        else if (this.props.beaconError != null)
      {
            viewElement = this.renderFetchError()
        }
        else
      {
            viewElement = this.renderSpinner(strings.loadingDepartures)
        }

        return (
          <AccessibilityView style={styles.flex1} name={this.sceneName}>
            <BoldTitleBar title={strings.nearestVehicles} noBorder={true}/>
            {viewElement}
          </AccessibilityView>
        )
    }

    renderSeparator = (sectionID, rowID) =>
    {
        return (<View key={sectionID + '-' + rowID} style={styles.rowSeparator}></View>)
    }

    renderFetchError = () =>
    {
        return (
            <View style={styles.spinnerContainer}>
              <View style={styles.spinnerBackground}>
                <DefaultText style={styles.fetchDeparturesError}>
                  {strings.fetchDeparturesError}
                </DefaultText>
              </View>
            </View>
        )
    }
    renderSpinner = (text) =>
    {
        return (
            <View style={styles.spinnerContainer}>
                <View style={styles.spinnerBackground}>
                    <DefaultText style={styles.loadingDeparturesText}>
                        {text}
                    </DefaultText>
                    <ActivityIndicator
                        size="large"
                        animating={true}
                    />
                </View>
            </View>
        )
    }
  }

const mapStateToProps = (state) =>
  {
    console.log(state.beacons)
    return {
      beaconData: state.beacons.vehicleBeaconData,
      gettingBeaconData: state.beacons.vehicleBeaconData,
      beaconError: state.beacons.vehicleBeaconError,
      scene: state.routes.scene
  }
}

  const mapDispatchToProps = (dispatch) =>
  {
      return {}
  }

export default connect(mapStateToProps, mapDispatchToProps)(VehiclesPage)