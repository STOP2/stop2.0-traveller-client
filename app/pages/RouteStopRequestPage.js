import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, TouchableOpacity, BackAndroid } from 'react-native'
import { sendStoprequest } from '../actions/sendStoprequest'
import { Actions } from 'react-native-router-flux'

import { TitleBar, BoldTitleBar } from '../components/TitleBar'
import VehicleImage from '../components/VehicleImage'
import RouteInfo from '../components/RouteInfo'
import SlideConfirmButton from '../components/SlideConfirmButton'
import AccessibilityView from '../components/AccessibilityView'
import {DefaultText} from '../components/textComponents'

import styles from '../styles/stylesheet'
import strings from '../resources/translations'

import { fetchRouteStops } from '../actions/fetchRouteStops'

const UPDATE_INTERVAL_IN_SECS = 10

class RouteStopRequestPage extends Component{

    constructor(props)
  {
        super(props)

        this.state = {
            renderConfirm: true,
            minutesLeft: this.props.vehicle.arrival + ' ' + strings.minutes,
            fetchIntervalRunning: false
        }

        this.sceneName = 'routeStopRequest'
    }


    createInterval = (props) =>
    {
        this.fetchInterval = setInterval(() =>
        {
            if (!props.isFetchingStops)
            {
                props.fetchRouteStops(this.props.vehicle.trip_id, this.props.startStop.stopId, true)
            }
        }, UPDATE_INTERVAL_IN_SECS * 1000)
    }

    componentWillMount = () =>
    {
        this.props.fetchRouteStops(this.props.vehicle.trip_id, this.props.startStop.stopId, true)
        this.setState({fetchIntervalRunning: true})
        this.createInterval(this.props)
    }

    componentWillReceiveProps = (nextProps) =>
      {
        this.setState({renderConfirm: !nextProps.sent})
        BackAndroid.addEventListener('hardwareBackPress', this.backAndroidHandler)

        if (nextProps.scene.name == this.sceneName)
        {
            if (!this.state.fetchIntervalRunning)
            {
                this.setState({fetchIntervalRunning: true})
                this.createInterval(nextProps)
            }
            if (typeof nextProps.routeStops[0] !== 'undefined' && nextProps.routeStops.length == 1)
            {
                if (nextProps.routeStops[0].arrives_in < 0)
                {
                    this.setState({minutesLeft: strings.vehiclePassedStop})
                }
                else
                {
                    this.setState({minutesLeft: nextProps.routeStops[0].arrives_in + ' ' + strings.minutes})
                }
            }
        }
        else if (this.state.fetchIntervalRunning)
        {
            this.setState({fetchIntervalRunning: false})
            clearInterval(this.fetchInterval)
        }
    }

    backAndroidHandler = () =>
    // when a user sends a stop request, the back button will be disabled
       {
        if (this.state.renderConfirm)
           {
            return false
        }
        else
           {
            return true
        }
    }


    componentWillUnmount()
       {
        BackAndroid.removeEventListener('hardwareBackPress', this.backAndroidHandler)
    }

    renderRouteInfo = () =>
    {
        return (<VehicleImage vehicleType={this.props.vehicle.vehicle_type}/>)
    }

    renderSlider = () =>
  {
        const sendStoprequest = () =>
        {
            this.props.sendStoprequest(this.props.vehicle.trip_id, this.props.stop.stopId, 'stop')
        }

        if (this.state.renderConfirm)
      {
            return (<SlideConfirmButton onSlideSuccess={sendStoprequest} text={strings.slide + ' →'} />)
        }
        else
      {
            return (
            <View style={styles.sliderBackgroundGreen}>
              <DefaultText style={styles.confirmedText}>{strings.stopsent}</DefaultText>
            </View>
            )
        }
    }

    render()
  {
        return (
        <AccessibilityView style={styles.flex1} name="stopRequest">
          <BoldTitleBar title={strings.stopRequest}/>
          <View style={styles.flex3}>
            {this.renderRouteInfo()}
          </View>
          {this.renderSlider()}
        </AccessibilityView>
        )
    }
}

const mapStateToProps = (state) =>
{
    return {
        sent: state.stopRequestReducer.sentStoprequest,
        routeStops: state.fetchRouteStopsReducer.routeStops,
        isFetchingStops: state.fetchRouteStopsReducer.isFetchingStops,
        routeIsReady: state.fetchRouteStopsReducer.routeIsReady,
        errorFetchingStops: state.fetchRouteStopsReducer.errorFetchingStops,
        error: state.stopRequestReducer.error,
        scene: state.routes.scene,
        startStop: state.stopRequestReducer.startStop,
        vehicle: state.stopRequestReducer.currentVehicle
    }
}

const mapDispatchToProps = (dispatch) =>
{
    return {
        sendStoprequest: (busId, stopId, requestType) =>
       {
            dispatch(sendStoprequest(busId, stopId, requestType))
        },
        fetchRouteStops: (tripId, BusId, current) =>
        {
            dispatch(fetchRouteStops(tripId, BusId, current))
        }
    }
}


RouteStopRequestPage.propTypes = {
    fetchRouteStops: React.PropTypes.func.isRequired,
    vehicle: React.PropTypes.shape({
        trip_id: React.PropTypes.string.isRequired,
        vehicle_type: React.PropTypes.number.isRequired,
        line: React.PropTypes.string.isRequired,
        destination: React.PropTypes.string.isRequired,
        arrival: React.PropTypes.number.isRequired
    }),
    startStop: React.PropTypes.shape({
        stopCode: React.PropTypes.string.isRequired,
        stopName: React.PropTypes.string.isRequired,
        stopId: React.PropTypes.string.isRequired
    }),
    sendStoprequest: React.PropTypes.func.isRequired,
    sent: React.PropTypes.bool.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(RouteStopRequestPage)
