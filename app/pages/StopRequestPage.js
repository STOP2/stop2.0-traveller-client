import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, BackAndroid, Alert } from 'react-native'
import AwesomeButton from 'react-native-awesome-button'
import { Actions } from 'react-native-router-flux'

import { TitleBar } from '../components/TitleBar'
import RouteInfo from '../components/RouteInfo'
import AccessibilityView from '../components/AccessibilityView'
import {DefaultText} from '../components/textComponents'

import PushController from '../components/PushController'

import { sendStoprequest } from '../actions/sendStoprequest'
import { fetchRouteStops } from '../actions/fetchRouteStops'
import { cancelStopRequest } from '../actions/cancelStopRequest'

import styles from '../styles/stylesheet'
import strings from '../resources/translations'
import colors from '../styles/colors'
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
        this.fetchInterval = false
        BackAndroid.removeEventListener('hardwareBackPress', this.backAndroidHandler)
    }

    componentWillReceiveProps = (nextProps) =>
      {
        if (nextProps.scene.name != this.sceneName) return

        this.setState({renderConfirm: !nextProps.successfulStopRequest})

        if (!this.fetchInterval)
        {
            this.createInterval(this.props)
            BackAndroid.addEventListener('hardwareBackPress', this.backAndroidHandler)
        }

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
                {
                    text: strings.no,
                    onPress: () =>
                    {}
                },
                {
                    text: strings.yes,
                    onPress: () =>
                    {
                        this.props.cancelStopRequest(this.props.fromRequestId, cancelStopRequestCallback)
                    }
                }
            ],
          { cancelable: false }
        )
    }

    renderRouteInfo = () =>
    {
        return (<RouteInfo mode={this.state.renderConfirm ? 'arrive' : 'stop'}
        vehicleType={this.props.vehicle.vehicle_type} vehicleLine={this.props.vehicle.line}
        vehicleDestination={this.props.vehicle.destination}
        vehicleMinutesLeft={this.state.minutesLeft} />)
    }

    renderSlider = () =>
    {
        const sendStopRequest = () =>
        {
            Alert.alert(
                strings.doYouReallyWantToMakeTheStopRequest, '',
                [
                    {
                        text: strings.no,
                        onPress: () =>
                        {}
                    },
                    {
                        text: strings.yes,
                        onPress: () =>
                        {
                            this.props.sendStoprequest(this.props.vehicle, this.props.stop, this.props.fcmToken, false)
                        }
                    }
                ],
                { cancelable: false }
            )
        }

        if (!this.props.successfulStopRequest)
        {
            return (<View style={styles.padding10}>
                      <AwesomeButton labelStyle={styles.buttonLabel} states={{
                          default: {
                              text: strings.stop,
                              onPress: sendStopRequest,
                              backgroundColor: colors.HSLgreen
                          }
                      }} />
                    </View>)
        }
        else
        {
            let goToStopRequestPage = () =>
            {
                clearInterval(this.fetchInterval)
                this.fetchInterval = false
                BackAndroid.removeEventListener('hardwareBackPress', this.backAndroidHandler)
                Actions.routeStops()
            }

            return (<View style={styles.padding10}>
                      <AwesomeButton labelStyle={styles.buttonLabel} states={{
                          default: {
                              text: strings.goToRouteStopsView,
                              onPress: goToStopRequestPage,
                              backgroundColor: colors.HSLpink
                          }
                      }} />
                    </View>)
        }
    }

    render()
  {
      function cancelStopRequestCallback(error) {
          if(!error) {
              BackAndroid.removeEventListener('hardwareBackPress', this.backAndroidHandler)

              Actions.pop()
          } else {
              Alert.alert( strings.stopRequestCancellationErrorTitle, strings.stopRequestCancellationErrorMsg,
                  [ {text: 'Ok', onPress: () => {}}] )
          }
      }


        const cancelStopRequest = () =>
        {
            Alert.alert(
              strings.cancelStopRequest, '',
                [
                    {
                        text: strings.no,
                        onPress: () =>
                        {}
                    },
                    {
                        text: strings.yes,
                        onPress: () =>
                        {
                            this.props.cancelStopRequest(this.props.fromRequestId, cancelStopRequestCallback)
                        }
                    }
                ],
              { cancelable: false }
          )
        }

        return (
          <AccessibilityView style={styles.flex1} name={this.sceneName}>
            <PushController vehicleType={this.props.vehicle.vehicle_type} vehicleLine={this.props.vehicle.line} />

            {this.props.successfulStopRequest && <View style={styles.stopRequestSentBackground}>
                <DefaultText style={styles.stopRequestSentText}>{strings.stopsent}</DefaultText>
                <AwesomeButton labelStyle={styles.buttonLabel} states={{
                    default: {
                        text: strings.cancel,
                        onPress: cancelStopRequest,
                        backgroundColor: colors.HSLalarmRed
                    }
                }} />
            </View>}

            <TitleBar title={this.props.stop.stopName + '  (' + this.props.stop.stopCode + ')'} />


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
        fcmToken: state.pushNotifications.token,
        successfulStopRequest: state.stopRequest.sentStoprequestFromStop,
        routeStops: state.routeStops.routeStops,
        isFetchingStops: state.routeStops.isFetchingStops,
        errorFetchingStops: state.routeStops.errorFetchingStops,
        stopRequestFailed: state.stopRequest.error,
        scene: state.routes.scene,
        fromRequestId: state.stopRequest.fromRequestId
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
