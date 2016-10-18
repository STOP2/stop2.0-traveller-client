import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ActivityIndicator, ListView, View, TouchableOpacity } from 'react-native'
import { Actions } from 'react-native-router-flux'

import { DefaultText } from '../components/textComponents'

import StopTitle from '../components/StopTitle'
import BusListHeader from '../components/BusListHeader'
import BusListRow from '../components/BusListRow'

import styles from '../styles/stylesheet'
import strings from '../resources/translations'

import { fetchDepartures } from '../actions/fetchDeparturesActions'

const UPDATE_INTERVAL_IN_SECS = 10

class BusListPage extends Component {
    constructor(props)
    {
        super(props)

        this.state = {
            dataBlob: {},
            dataSource: new ListView.DataSource({
                rowHasChanged: (r1, r2) => r1 !== r2,
                sectionHeaderHasChanged: (s1, s2) => s1 !== s2
            }),
            stopNames: []
        }
    }

    componentWillMount = () =>
    {
        this.props.fetchDepartures(this.props.locationData.latitude, this.props.locationData.longitude)

        this.fetchInterval = setInterval(() =>
        {
            if (!this.props.isFetching)
            {
                this.props.fetchDepartures(this.props.locationData.latitude, this.props.locationData.longitude)
            }
        }, UPDATE_INTERVAL_IN_SECS * 1000)
    }

    componentWillReceiveProps = (nextProps) =>
    {
        if (nextProps.stops.length > 0)
        {
            this.setState({stopNames: []})

            for (let index = 0; index < nextProps.stops.length; index++)
          {
                let tempDataBlob = this.state.dataBlob
                let sectionID = nextProps.stops[index].stop.stop_code

                tempDataBlob[sectionID] = nextProps.stops[index].stop.schedule

                let stopNamesTemp = this.state.stopNames

                stopNamesTemp[nextProps.stops[index].stop.stop_code] = nextProps.stops[index].stop.stop_name

                this.setState({dataBlob: tempDataBlob})
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRowsAndSections(this.state.dataBlob),
                    stopNames: stopNamesTemp
                })
            }
        }
    }

    renderRow = (rowData, sectionID) =>
  {
        const goToStopRequestPage = () =>
    {
            Actions.stopRequest({
                vehicle: rowData,
                stop: {
                    stopName: this.state.stopNames[sectionID],
                    stopId: sectionID
                }
            })
        }

        return (
      <TouchableOpacity onPress={goToStopRequestPage}>
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
        return (<StopTitle name={this.state.stopNames[sectionID]} line={sectionID} />)
    }

    renderSeparator = () =>
    {
        return (<View style={styles.rowSeparator}></View>)
    }

    renderList = () =>
    {
        return (
          <View style={styles.flex1}>
            {this.props.error ? <DefaultText style={styles.error}>{strings.backendError}</DefaultText> : null}
            <BusListHeader />
            <ListView
            dataSource={this.state.dataSource}
            renderRow={this.renderRow}
            renderSectionHeader={this.renderSectionHeader}
            renderFooter={this.renderFooter}
            renderSeparator={this.renderSeparator}
             />
          </View>
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
        locationData: state.locationReducer.locationData
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
    isReady: React.PropTypes.bool.isRequired
}


export default connect(mapStateToProps, mapDispatchToProps)(BusListPage)
