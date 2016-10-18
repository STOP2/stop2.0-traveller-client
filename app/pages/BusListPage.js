import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ActivityIndicator, ListView, View, TouchableOpacity } from 'react-native'
import { Actions } from 'react-native-router-flux'

import TitleBar from '../components/TitleBar'
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

        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})

        this.state = {dataSource: ds.cloneWithRows([])}
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

  /* DOESN'T WORK
    componentWillUnmount = () => {
      clearInterval(this.fetchInterval)
  }*/

    componentWillReceiveProps = (nextProps) =>
    {
    // this.props.fetchDepartures(nextProps.locationData.latitude, nextProps.locationData.longitude)

        this.setState({dataSource: this.state.dataSource.cloneWithRows(nextProps.stop.schedule)})
    }

    renderRow = (renderData) =>
    {
        const goToStopRequestPage = () =>
        {
            Actions.stopRequest({
                vehicle: renderData,
                stop: {
                    stopName: this.props.stop.stop_name,
                    stopId: this.props.stop.stop_code
                }
            })
        }

        return (
          <TouchableOpacity onPress={goToStopRequestPage}>
            <BusListRow vehicleType={renderData.vehicle_type} line={renderData.line} destination={renderData.destination} arrival={renderData.arrival} />
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

    renderList = () => {
        return (
          <View style={styles.flex1}>
            <TitleBar title={strings.title + ' ' + this.props.stop.stop_name + ' (' + this.props.stop.stop_code + ')'} />
            {this.props.error ? <Text style={styles.error}>{strings.backendError}</Text> : null}
              <BusListHeader />
            <ListView
              enableEmptySections={true}
              dataSource={this.state.dataSource}
              renderRow={this.renderRow}
              renderFooter={this.renderFooter}
            />
          </View>
        )
    }

    renderSpinner = () => {
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
        if (this.props.isReady) {
            return (
              this.renderList()
            )
        } else {
            return (
              this.renderSpinner()
            )
        }
    }
}

const mapStateToProps = (state) =>
{
    return {
        stop: state.fetchReducer.stop,
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
    stop: React.PropTypes.shape({
        stop_name: React.PropTypes.string.isRequired,
        stop_code: React.PropTypes.string.isRequired
    }),
    isFetching: React.PropTypes.bool.isRequired
}


export default connect(mapStateToProps, mapDispatchToProps)(BusListPage)
