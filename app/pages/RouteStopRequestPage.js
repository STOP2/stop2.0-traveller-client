import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, TouchableOpacity, BackAndroid, Alert } from 'react-native'
import { sendStoprequest } from '../actions/sendStoprequest'
import { Actions } from 'react-native-router-flux'

import { TitleBar, BoldTitleBar } from '../components/TitleBar'
import { RouteInfoForStop } from '../components/RouteInfo'
import SlideConfirmButton from '../components/SlideConfirmButton'
import AccessibilityView from '../components/AccessibilityView'
import {DefaultText} from '../components/textComponents'

import styles from '../styles/stylesheet'
import strings from '../resources/translations'

import { fetchRouteStops } from '../actions/fetchRouteStops'
import { resetState } from '../actions/resetStateAction'

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

                if (routeStop.stop_code == this.props.startStop.stopCode || routeStop.stop_code == this.props.stop.stopCode)
                {
                    let minutesLeft = ''

                    if (routeStop.arrives_in < 0)
                    {
                        minutesLeft = strings.vehiclePassedStop
                    }
                    else if (routeStop.arrives_in == 0)
                    {
                        minutesLeft = strings.now
                    }
                    else
                    {
                        minutesLeft = routeStop.arrives_in + ' ' + strings.minutes
                    }

                    if (routeStop.stop_code == this.props.startStop.stopCode)
                    {
                        this.setState({minutesLeftToStart: minutesLeft})
                    }
                    else
                    {
                        this.setState({minutesLeftToEnd: minutesLeft})
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
            Alert.alert(
                strings.cancelStopRequest, '',
                [
                    {text: strings.no, onPress: () => {
                        console.log('canceled cancel')
                    }},
                    {text: strings.yes, onPress: () => {
                        Actions.pop()
                        console.log('request canceled')
                    }},
                ],
                {
                    cancelable: false
                }
            )
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
            <View>
              <RouteInfoForStop stopName={this.props.startStop.stopName} stopCode={this.props.startStop.stopCode} vehicleMinutesLeft={this.state.minutesLeftToStart}/>
            </View>
            <View>
              <RouteInfoForStop stopName={this.props.stop.stopName} stopCode={this.props.stop.stopCode} vehicleMinutesLeft={this.state.minutesLeftToEnd}/>
            </View>
          </View>
        )
    }

    renderSlider = () =>
  {
        const sendStoprequest = () =>
        {
            this.props.sendStoprequest(this.props.vehicle, this.props.stop, 'stop', true)
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

    renderButton = () =>
    {
        const goToStopRequestPage = () =>
      {
            clearInterval(this.fetchInterval)
            this.props.resetState()
            Actions.start()
        }

        if (this.props.sent)
        {
            return (
          <TouchableOpacity accessibilityComponentType="button" accessibilityLabel={strings.goToBackToFrontPage} style={styles.goToRouteViewButton} onPress={goToStopRequestPage}>
            <DefaultText style={styles.goToRouteViewButtonText}>{strings.goToBackToFrontPage}</DefaultText>
          </TouchableOpacity>)
        }
    }

    render()
  {
        return (
        <AccessibilityView style={styles.flex1} name="stopRequest">
          <BoldTitleBar title={strings.stopRequest}/>
          <TitleBar title={this.props.vehicle.line + ' ' + this.props.vehicle.destination} />
          <View style={styles.flex3}>
            {this.renderRouteInfo()}
          </View>
          <View style={styles.flex1}>
            {this.renderButton()}
          </View>
          {this.renderSlider()}
        </AccessibilityView>
        )
    }
}

const mapStateToProps = (state) =>
{
    return {
        sent: state.stopRequestReducer.sentStoprequestFromVehicle,
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
        sendStoprequest: (busId, stopId, requestType, fromVehicle) =>
       {
            dispatch(sendStoprequest(busId, stopId, requestType, fromVehicle))
        },
        fetchRouteStops: (tripId, BusId, current) =>
        {
            dispatch(fetchRouteStops(tripId, BusId, current))
        },
        resetState: () =>
       {
            dispatch(resetState())
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
    sent: React.PropTypes.bool.isRequired,
    resetState: React.PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(RouteStopRequestPage)
