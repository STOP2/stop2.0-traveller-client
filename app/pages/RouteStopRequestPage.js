import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, BackAndroid } from 'react-native'
import { sendStoprequest } from '../actions/sendStoprequest'

import { TitleBar, BoldTitleBar } from '../components/TitleBar'
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
            minutesLeftToStart: strings.minutes,
            minutesLeftToEnd: strings.minutes,
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
            for (let index in nextProps.routeStops)
            {
                let routeStop = nextProps.routeStops[index]

                if (routeStop.stop_code == this.props.startStop.stopCode)
                {
                    this.setState({minutesLeftToStart: routeStop.arrives_in})
                    if (routeStop.arrives_in < 0)
                    {
                        this.setState({minutesLeftToStart: strings.vehiclePassedStop})
                    }
                    else if (routeStop.arrives_in == 0)
                    {
                        this.setState({minutesLeftToStart: strings.now})
                    }
                    else
                    {
                        this.setState({minutesLeftToStart: routeStop.arrives_in + ' ' + strings.minutes})
                    }
                }
                else if (routeStop.stop_code == this.props.stop.stopCode)
                {
                    this.setState({minutesLeftToEnd: routeStop.arrives_in})
                    if (routeStop.arrives_in < 0)
                    {
                        this.setState({minutesLeftToEnd: strings.vehiclePassedStop})
                    }
                    else if (routeStop.arrives_in == 0)
                    {
                        this.setState({minutesLeftToEnd: strings.now})
                    }
                    else
                    {
                        this.setState({minutesLeftToEnd: routeStop.arrives_in + ' ' + strings.minutes})
                    }
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
        return (
          <View>
            <View style={styles.flex1}>
              <TitleBar title={this.props.startStop.stopName + '  (' + this.props.startStop.stopCode + ')'} />
              <RouteInfo title={strings.aboutToStop} vehicleType={this.props.vehicle.vehicle_type} vehicleLine={this.props.vehicle.line} vehicleDestination={this.props.vehicle.destination} vehicleMinutesLeft={this.state.minutesLeftToStart}/>
            </View>
            <View style={styles.flex1}>
              <TitleBar title={this.props.stop.stopName + '  (' + this.props.stop.stopCode + ')'} />
              <RouteInfo title={strings.aboutToStop} vehicleType={this.props.vehicle.vehicle_type} vehicleLine={this.props.vehicle.line} vehicleDestination={this.props.vehicle.destination} vehicleMinutesLeft={this.state.minutesLeftToEnd}/>
            </View>
          </View>
        )
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
          <View style={{flex: 5}}>
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
    stop: React.PropTypes.shape({
        stopCode: React.PropTypes.string.isRequired,
        stopName: React.PropTypes.string.isRequired,
        stopId: React.PropTypes.string.isRequired
    }),
    sendStoprequest: React.PropTypes.func.isRequired,
    sent: React.PropTypes.bool.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(RouteStopRequestPage)
