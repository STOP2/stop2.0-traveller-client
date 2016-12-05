import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ActivityIndicator, ListView, View, TouchableOpacity } from 'react-native'
import { Actions } from 'react-native-router-flux'

import { DefaultText } from '../components/textComponents'

import StopTitle from '../components/StopTitle'
import BusListHeader from '../components/BusListHeader'
import BusListRow from '../components/BusListRow'
import { BoldTitleBar } from '../components/TitleBar'
import AccessibilityView from '../components/AccessibilityView'

import styles from '../styles/stylesheet'
import strings from '../resources/translations'

import { fetchDepartures } from '../actions/fetchDeparturesActions'

const UPDATE_INTERVAL_IN_SECS = 10

class DeparturesListPage extends Component {
    constructor()
    {
        super()

        let ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2,
            sectionHeaderHasChanged: (s1, s2) => s1 !== s2
        })

        this.state = {
            dataBlob: {},
            dataSource: ds.cloneWithRowsAndSections({}, []),
            stops: [],
            stopCount: 0,
            locatingUser: true
        }

        this.sceneName = 'departures'
    }

    componentWillUnmount = () =>
    {
        clearInterval(this.fetchInterval)
        this.fetchInterval = false
    }

    checkIfLocationExists(props)
    {
        if (props.gettingBeaconData == false && props.beaconError == null)
        {
            props.fetchDepartures(props.beaconData.major, props.beaconData.minor, true)
            this.setState({fetchIntervalRunning: true})
            this.createInterval(props, true)
            this.setState({locatingUser: false})
        }
        else if (props.gettingBeaconData == false && props.beaconError != null)
        {
            if (props.gettingGpsLocation == false && props.gpsLocationError == null)
            {
                this.props.fetchDepartures(props.gpsLocationData.latitude, props.gpsLocationData.longitude, false)
                this.setState({fetchIntervalRunning: true})
                this.createInterval(props, false)
                this.setState({locatingUser: false})
            }
            else if (props.gettingGpsLocation == false && props.gpsLocationError != null)
            {
                console.log('both have errored, do something?')
            }
            else
            {
                return false
            }
        }
        else
        {
            return false
        }
    }

    componentWillMount = () =>
    {
        this.checkIfLocationExists(this.props)
    }

    createInterval = (props, usesBeacons) =>
    {
        this.fetchInterval = setInterval(() =>
        {
            if (!props.isFetchingDepartures)
            {
                if (usesBeacons)
                {
                    props.fetchDepartures(props.beaconData.major, props.beaconData.minor, true)
                }
                else
                {
                    props.fetchDepartures(props.gpsLocationData.latitude, props.gpsLocationData.longitude, false)
                }
            }
        }, UPDATE_INTERVAL_IN_SECS * 1000)
    }

    componentWillReceiveProps = (nextProps) =>
    {
        if (nextProps.scene.name != this.sceneName) return

        if (this.state.locatingUser)
        {
            this.checkIfLocationExists(nextProps)
        }
        else
        {
            if (!this.fetchInterval) this.createInterval(nextProps)


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

    renderRow = (rowData, sectionID, rowID) =>
  {
        const goToStopRequestPage = () =>
    {
            let { stops } = this.state

            clearInterval(this.fetchInterval)
            this.fetchInterval = false
            Actions.stopRequest({
                vehicle: rowData,
                stop: {
                    stopName: stops[sectionID].stop_name,
                    stopCode: stops[sectionID].stop_code,
                    stopId: sectionID
                }
            })
        }

        return (
      <TouchableOpacity accessibilityComponentType="button" key={sectionID + '-' + rowID} onPress={goToStopRequestPage}>
          <BusListRow vehicleType={rowData.vehicle_type} line={rowData.line} destination={rowData.destination} arrival={rowData.arrival} />
        </TouchableOpacity>)
    }

    renderFooter = () =>
    {
        return (
        <View>
          <ActivityIndicator
            animating={this.props.isFetchingDepartures}
          />
        </View>
        )
    }

    renderSectionHeader = (sectionData, sectionID) =>
    {
        let { stops } = this.state

        return (<StopTitle
                  name={stops[sectionID].stop_name}
                  line={stops[sectionID].stop_code}
                  distance={stops[sectionID].distance}
                />)
    }

    renderSeparator = (sectionID, rowID) =>
    {
        return (<View key={sectionID + '-' + rowID} style={styles.rowSeparator}></View>)
    }

    renderList = () =>
    {
        let listElement

        if (this.state.dataSource.getRowCount() > 0)
        {
            listElement = <ListView
                           dataSource={this.state.dataSource}
                           renderRow={this.renderRow}
                           renderSectionHeader={this.renderSectionHeader}
                           renderFooter={this.renderFooter}
                           renderSeparator={this.renderSeparator}
                          />
        }
        else
        {
            listElement = <View style={styles.spinnerContainer}>
                            <View style={styles.spinnerBackground}>
                              <DefaultText style={styles.fetchDeparturesError}>
                                {this.state.stopCount > 0 ? strings.noDepartures : strings.noStops}
                              </DefaultText>
                            </View>
                          </View>
        }

        return (
            <View style={styles.flex1}>
              {this.props.fetchDeparturesError &&
               <DefaultText style={styles.error}>
                 {strings.backendError}
               </DefaultText>}
              <BusListHeader />
              {listElement}
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

    render()
    {
        let viewElement

        if (this.props.isDeparturesReady)
        {
            viewElement = this.renderList()
        }
        else if (this.props.fetchDeparturesError)
        {
            viewElement = this.renderFetchError()
        }
        else if (this.state.locatingUser)
        {
            viewElement = this.renderSpinner(strings.gettingLocation)
        }
        else
        {
            viewElement = this.renderSpinner(strings.loadingDepartures)
        }

        return (
            <AccessibilityView style={styles.flex1} name={this.sceneName}>
              <BoldTitleBar title={strings.nearestStops} noBorder={true}/>
              {viewElement}
            </AccessibilityView>
        )
    }
}

const mapStateToProps = (state) =>
{
    return {
        stops: state.departures.stops,
        isFetchingDepartures: state.departures.isFetching,
        isDeparturesReady: state.departures.isReady,
        fetchDeparturesError: state.departures.error,
        gpsLocationData: state.gpsLocation.gpsLocationData,
        gettingGpsLocation: state.gpsLocation.gettingGpsLocation,
        gpsLocationError: state.gpsLocation.error,
        beaconData: state.beacons.beaconData,
        gettingBeaconData: state.beacons.gettingBeaconData,
        beaconError: state.beacons.beaconError,
        scene: state.routes.scene
    }
}

const mapDispatchToProps = (dispatch) =>
{
    return {
        fetchDepartures: (latitude, longitude, withBeacons) =>
        {
            dispatch(fetchDepartures(latitude, longitude, withBeacons))
        }
    }
}

DeparturesListPage.propTypes = {
    fetchDepartures: React.PropTypes.func.isRequired,
    gpsLocationData: React.PropTypes.shape({
        latitude: React.PropTypes.number.isRequired,
        longitude: React.PropTypes.number.isRequired
    }),
    stops: React.PropTypes.array.isRequired,
    isFetchingDepartures: React.PropTypes.bool.isRequired,
    fetchDeparturesError: React.PropTypes.bool.isRequired,
    isDeparturesReady: React.PropTypes.bool.isRequired,
    scene: React.PropTypes.object.isRequired,
    locatingUser: React.PropTypes.bool.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(DeparturesListPage)
