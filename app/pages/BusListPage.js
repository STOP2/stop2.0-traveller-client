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

class BusListPage extends Component {
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
            stops: [],
            fetchIntervalRunning: false
        }

        this.sceneName = 'departures'
    }

    componentWillMount = () =>
    {
        this.props.fetchDepartures(this.props.locationData.latitude, this.props.locationData.longitude)

        this.setState({fetchIntervalRunning: false})

        this.createInterval(this.props)
    }

    createInterval = (props) =>
    {
        this.fetchInterval = setInterval(() =>
        {
            if (!props.isFetching)
            {
                props.fetchDepartures(props.locationData.latitude, props.locationData.longitude)
            }
        }, UPDATE_INTERVAL_IN_SECS * 1000)
    }

    componentWillReceiveProps = (nextProps) =>
    {
        if (nextProps.scene.name == this.sceneName)
        {
            if (!this.state.fetchIntervalRunning)
            {
                this.setState({fetchIntervalRunning: true})

                this.createInterval(nextProps)
            }
        }
        else if (this.state.fetchIntervalRunning)
        {
            this.setState({fetchIntervalRunning: false})

            clearInterval(this.fetchInterval)
        }


    // this.props.fetchDepartures(nextProps.locationData.latitude, nextProps.locationData.longitude)

        if (nextProps.stops.length > 0)
        {
            let tempDataBlob = Object.assign({}, this.state.dataBlob)
            let stopsTemp = this.state.stops
            let sections = []

            for (let index = 0; index < nextProps.stops.length; index++)
            {
                let sectionID = nextProps.stops[index].stop.stop_code

                sections.push(sectionID)
                tempDataBlob[sectionID] = nextProps.stops[index].stop.schedule

                stopsTemp[nextProps.stops[index].stop.stop_code] = nextProps.stops[index].stop
            }
            this.setState({
                dataBlob: tempDataBlob,
                dataSource: this.state.dataSource.cloneWithRowsAndSections(tempDataBlob, sections),
                stops: stopsTemp
            })
        }
    }

    renderRow = (rowData, sectionID, rowID) =>
  {
        const goToStopRequestPage = () =>
    {
            Actions.stopRequest({
                vehicle: rowData,
                stop: {
                    stopName: this.state.stops[sectionID].stop_name,
                    stopCode: sectionID,
                    stopId: this.state.stops[sectionID].stop_id
                }
            })
        }

        return (
      <TouchableOpacity key={sectionID + '-' + rowID} onPress={goToStopRequestPage}>
          <BusListRow vehicleType={rowData.vehicle_type} line={rowData.line} destination={rowData.destination} arrival={rowData.arrival} />
        </TouchableOpacity>)
    }

    renderFooter = () =>
    {
        return (
        <View>
          <ActivityIndicator
            animating={this.props.isFetching}
          />
        </View>
        )
    }

    renderSectionHeader = (sectionData, sectionID) =>
    {
        return (<StopTitle
                  name={this.state.stops[sectionID].stop_name}
                  line={sectionID}
                  distance={this.state.stops[sectionID].distance}
                />)
    }

    renderSeparator = (sectionID, rowID) =>
    {
        return (<View key={sectionID + '-' + rowID} style={styles.rowSeparator}></View>)
    }

    renderList = () =>
    {
        return (
          <AccessibilityView style={styles.flex1} name={this.sceneName}>
          <BoldTitleBar title={strings.chooseVehicle} noBorder={true}/>
          {this.props.error ? <DefaultText style={styles.error}>{strings.backendError}</DefaultText> : null}
              <BusListHeader />
              <ListView
                  dataSource={this.state.dataSource}
                  renderRow={this.renderRow}
                  renderSectionHeader={this.renderSectionHeader}
                  renderFooter={this.renderFooter}
                  renderSeparator={this.renderSeparator}
              />
          </AccessibilityView>
        )
    }

    renderSpinner = () =>
    {
        return (
          <View style={styles.spinnerContainer}>
            <View style={styles.spinnerBackground}>
              <ActivityIndicator
                size="large"
                animating={true}
              />
            </View>
          </View>
        )
    }

    render()
    {
        if (this.props.isReady)
        {
            return (
              this.renderList()
            )
        }
        else
        {
            return (
              this.renderSpinner()
            )
        }
    }
}

const mapStateToProps = (state) =>
{
    return {
        stops: state.fetchReducer.stops,
        isFetching: state.fetchReducer.isFetching,
        isReady: state.fetchReducer.isReady,
        error: state.fetchReducer.error,
        locationData: state.locationReducer.locationData,
        scene: state.routes.scene
    }
}

const mapDispatchToProps = (dispatch) =>
{
    return {
        fetchDepartures: (latitude, longitude) =>
        {
            dispatch(fetchDepartures(latitude, longitude))
        }
    }
}

BusListPage.propTypes = {
    fetchDepartures: React.PropTypes.func.isRequired,
    locationData: React.PropTypes.shape({
        latitude: React.PropTypes.number.isRequired,
        longitude: React.PropTypes.number.isRequired
    }),
    stops: React.PropTypes.array.isRequired,
    isFetching: React.PropTypes.bool.isRequired,
    error: React.PropTypes.bool.isRequired,
    isReady: React.PropTypes.bool.isRequired,
    scene: React.PropTypes.object.isRequired
}


export default connect(mapStateToProps, mapDispatchToProps)(BusListPage)
