import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, TouchableOpacity, BackAndroid, Alert } from 'react-native'
import { sendStoprequest } from '../actions/sendStoprequest'
import { Actions } from 'react-native-router-flux'

import { TitleBar, BoldTitleBar } from '../components/TitleBar'
import RouteInfo from '../components/RouteInfo'
import SlideConfirmButton from '../components/SlideConfirmButton'
import AccessibilityView from '../components/AccessibilityView'
import {DefaultText} from '../components/textComponents'

import styles from '../styles/stylesheet'
import strings from '../resources/translations'

import PushController from '../components/PushController'

import { fetchRouteStops } from '../actions/fetchRouteStops'
import { cancelStopRequest } from '../actions/cancelStopRequest'

const UPDATE_INTERVAL_IN_SECS = 10

class StopRequestPage extends Component{
    constructor()
    {
        super()

        this.state = {
            renderConfirm: true,
            minutesLeft: ''
        }

        this.sceneName = 'stopRequest'
    }


    createInterval = (props) =>
    {
        this.fetchInterval = setInterval(() =>
        {
            if (!props.isFetchingStops)
            {
                props.fetchRouteStops(this.props.vehicle.trip_id, this.props.stop.stopId, true)
            }
        }, UPDATE_INTERVAL_IN_SECS * 1000)
    }

    componentWillMount = () =>
    {
        this.props.fetchRouteStops(this.props.vehicle.trip_id, this.props.stop.stopId, true)
        this.setState({minutesLeft: this.props.vehicle.arrival + ' ' + strings.minutes})
        this.createInterval(this.props)
        BackAndroid.addEventListener('hardwareBackPress', this.backAndroidHandler)
    }

    componentWillUnmount = () =>
    {
        clearInterval(this.fetchInterval)
        BackAndroid.removeEventListener('hardwareBackPress', this.backAndroidHandler)
    }

    componentWillReceiveProps = (nextProps) =>
      {
        this.setState({renderConfirm: !nextProps.successfulStopRequest})

        for (let index in nextProps.routeStops)
        {
            let routeStop = nextProps.routeStops[index]

            if (routeStop.stop_code == this.props.stop.stopCode)
            {
                this.setState({minutesLeft: routeStop.arrives_in})

                if (routeStop.arrives_in < 0)
                {
                    this.setState({minutesLeft: strings.vehiclePassedStop})
                }
                else if (routeStop.arrives_in == 0)
                {
                    this.setState({minutesLeft: strings.now})
                }
                else
                {
                    this.setState({minutesLeft: routeStop.arrives_in + ' ' + strings.minutes})
                }
            }
        }
    }

    backAndroidHandler = () =>
   {
        if (this.state.renderConfirm)
        {
            return false
        }

        this.showStopRequestCancelConfirmation()

        return true
    }

    showStopRequestCancelConfirmation = () =>
    {
        function cancelStopRequestCallback(error) {
            if(!error) {
                Actions.pop()
            } else {
                Alert.alert( strings.stopRequestCancellationErrorTitle, strings.stopRequestCancellationErrorMsg,
                    [ {text: 'Ok', onPress: () => {}}] )
            }
        }

        Alert.alert(
        strings.cancelStopRequest, '',
        [
            {text: strings.no, onPress: () => {
            }},
    {text: strings.yes, onPress: () => {
            this.props.cancelStopRequest(this.props.fromRequestId, cancelStopRequestCallback)
    }},
    ],
    {
        cancelable: false
    }
    )
    }

    renderRouteInfo = () =>
    {
        return (this.state.renderConfirm ? <RouteInfo vehicleType={this.props.vehicle.vehicle_type} vehicleLine={this.props.vehicle.line} vehicleDestination={this.props.vehicle.destination} vehicleMinutesLeft={this.state.minutesLeft}/> : <RouteInfo vehicleType={this.props.vehicle.vehicle_type} vehicleLine={this.props.vehicle.line} vehicleDestination={this.props.vehicle.destination} vehicleMinutesLeft={this.state.minutesLeft}/>)
    }

    renderSlider = () =>
    {
        const sendStoprequest = () =>
        {
            this.props.sendStoprequest(this.props.vehicle, this.props.stop, this.props.fcmToken, false)
        }

        if (!this.props.successfulStopRequest)
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
            BackAndroid.removeEventListener('hardwareBackPress', this.backAndroidHandler)
            Actions.routeStops()
        }

        if (this.props.successfulStopRequest)
        {
            return (
          <TouchableOpacity accessibilityComponentType="button" accessibilityLabel={strings.goToRouteStopsView} style={styles.goToRouteViewButton} onPress={goToStopRequestPage}>
            <DefaultText style={styles.goToRouteViewButtonText}>{strings.goToRouteStopsView}</DefaultText>
          </TouchableOpacity>)
        }
    }

    render()
  {
        return (
        <AccessibilityView style={styles.flex1} name="stopRequest">
        <BoldTitleBar title={strings.stopRequest}/>
          <PushController vehicleType={this.props.vehicle.vehicle_type} vehicleLine={this.props.vehicle.line} />
          <TitleBar title={this.props.stop.stopName + '  (' + this.props.stop.stopCode + ')'} />

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
        fcmToken: state.fcmReducer.token,
        successfulStopRequest: state.stopRequestReducer.sentStoprequestFromStop,
        routeStops: state.fetchRouteStopsReducer.routeStops,
        isFetchingStops: state.fetchRouteStopsReducer.isFetchingStops,
        errorFetchingStops: state.fetchRouteStopsReducer.errorFetchingStops,
        stopRequestFailed: state.stopRequestReducer.error,
        scene: state.routes.scene,
        fromRequestId: state.stopRequestReducer.fromRequestId
    }
}

const mapDispatchToProps = (dispatch) =>
{
    return {
        sendStoprequest: (vehicle, stop, fcmToken, fromVehicle) =>
       {
            dispatch(sendStoprequest(vehicle, stop, fcmToken, fromVehicle))
        },
        fetchRouteStops: (tripId, BusId, current) =>
        {
            dispatch(fetchRouteStops(tripId, BusId, current))
        },
        cancelStopRequest: (requestId, cancelStopRequestCallback) =>
        {
            dispatch(cancelStopRequest(requestId, false))
            .then((stopRequestCancellationError) => cancelStopRequestCallback(stopRequestCancellationError))
        }
    }
}


StopRequestPage.propTypes = {
    fetchRouteStops: React.PropTypes.func.isRequired,
    stopRequestFailed: React.PropTypes.bool.isRequired,
    vehicle: React.PropTypes.shape({
        trip_id: React.PropTypes.string.isRequired,
        vehicle_type: React.PropTypes.number.isRequired,
        line: React.PropTypes.string.isRequired,
        destination: React.PropTypes.string.isRequired,
        arrival: React.PropTypes.number.isRequired
    }),
    stop: React.PropTypes.shape({
        stopCode: React.PropTypes.string.isRequired,
        stopName: React.PropTypes.string.isRequired,
        stopId: React.PropTypes.string.isRequired
    }),
    sendStoprequest: React.PropTypes.func.isRequired,
    fcmToken: React.PropTypes.string,
    successfulStopRequest: React.PropTypes.bool.isRequired,
    fromRequestId: React.PropTypes.number.isRequired,
    cancelStopRequest: React.PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(StopRequestPage)
