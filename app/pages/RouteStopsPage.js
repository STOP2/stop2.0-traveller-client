import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ActivityIndicator, ListView, View, TouchableOpacity } from 'react-native'
import { Actions } from 'react-native-router-flux'

import TitleBar from '../components/TitleBar'
import {DefaultText} from '../components/textComponents'
import RouteStopsRow from '../components/RouteStopsRow'
import AccessibilityView from '../components/AccessibilityView'

import styles from '../styles/stylesheet'
import strings from '../resources/translations'

import { fetchRouteStops } from '../actions/fetchRouteStops'

const UPDATE_INTERVAL_IN_SECS = 10

class RouteStopsPage extends Component {
    constructor(props)
    {
        super(props)

        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})

        this.state = {
            dataSource: ds.cloneWithRows([]),
            fetchIntervalRunning: false
        }

        this.sceneName = 'routeStops'
    }

    createInterval = (props) => {
        this.fetchInterval = setInterval(() =>
        {
            if (!props.isFetching)
            {
                props.fetchRouteStops(props.tripId, props.stopId)
            }
        }, UPDATE_INTERVAL_IN_SECS * 1000)
    }

    componentWillMount = () =>
    {
        this.props.fetchRouteStops(this.props.tripId, this.props.stopId)

        this.setState({fetchIntervalRunning: true})

        this.createInterval(this.props)
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
        } else {
            if (this.state.fetchIntervalRunning)
            {
                this.setState({fetchIntervalRunning: false})

                clearInterval(this.fetchInterval)
            }
        }

        this.setState({dataSource: this.state.dataSource.cloneWithRows(nextProps.routeStops)})
    }

    renderRow = (renderData) =>
    {
        const goToStopVehicleRequestPage = () =>
        {
            Actions.routeStopRequest({})
        }

        return (
          <TouchableOpacity onPress={goToStopVehicleRequestPage}>
            <RouteStopsRow stopId={renderData.stop_code} stopName={renderData.stop_name} arrivalTime={renderData.arrives_in} />
          </TouchableOpacity>)
    }

    renderSeparator = () =>
    {
        return (<View style={styles.rowSeparator}></View>)
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

    renderList = () =>
    {
        return (
          <View style={styles.flex1}>
            <TitleBar title={this.props.vehicleLine + ' ' + this.props.vehicleDestination} />
            {this.props.error ? <DefaultText style={styles.error}>{strings.backendError}</DefaultText> : null}
            <ListView
              enableEmptySections={true}
              dataSource={this.state.dataSource}
              renderRow={this.renderRow}
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
        return (<AccessibilityView name={this.sceneName}>
            {this.props.routeIsReady ? this.renderList() : this.renderSpinner() }
        </AccessibilityView>)
    }
}

const mapStateToProps = (state) =>
{
    return {
        routeStops: state.fetchReducer.routeStops,
        isFetching: state.fetchReducer.isFetching,
        routeIsReady: state.fetchReducer.routeIsReady,
        error: state.fetchReducer.error,
        scene: state.routes.scene
    }
}

const mapDispatchToProps = (dispatch) =>
{
    return {
        fetchRouteStops: (tripId, BusId) =>
        {
            dispatch(fetchRouteStops(tripId, BusId))
        }
    }
}

RouteStopsPage.propTypes = {
    fetchRouteStops: React.PropTypes.func.isRequired,
    isFetching: React.PropTypes.bool.isRequired,
    routeIsReady: React.PropTypes.bool.isRequired,
    tripId: React.PropTypes.string.isRequired,
    stopId: React.PropTypes.string.isRequired,
    error: React.PropTypes.bool,
    vehicleLine: React.PropTypes.string.isRequired,
    vehicleDestination: React.PropTypes.string.isRequired,
    scene: React.PropTypes.object.isRequired
}


export default connect(mapStateToProps, mapDispatchToProps)(RouteStopsPage)
