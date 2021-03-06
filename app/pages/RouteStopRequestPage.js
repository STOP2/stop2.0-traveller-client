import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, BackAndroid, Alert } from 'react-native'
import AwesomeButton from 'react-native-awesome-button'

import { Actions } from 'react-native-router-flux'

import { TitleBar } from '../components/TitleBar'
import { RouteInfoForStop } from '../components/RouteInfo'
import AccessibilityView from '../components/AccessibilityView'
import StopRequestCancellationBox from '../components/StopRequestCancellationBox'

import styles from '../styles/stylesheet'
import colors from '../styles/colors'
import strings from '../resources/translations'

import { fetchRouteStops } from '../actions/fetchRouteStops'
import { sendStoprequest } from '../actions/sendStoprequest'
import { cancelStopRequest } from '../actions/cancelStopRequest'

const UPDATE_INTERVAL_IN_SECS = 10

class RouteStopRequestPage extends Component{

    constructor(props)
  {
        super(props)

        this.state = {
            renderConfirm: true,
            minutesLeftToStart: strings.minutes,
            minutesLeftToEnd: strings.minutes
        }

        this.sceneName = 'routeStopRequest'
    }


    createInterval = (props) =>
    {
        this.fetchInterval = setInterval(() =>
        {
            if (!props.isFetchingStops)
            {
                props.fetchRouteStops(this.props.vehicle.trip_id)
            }
        }, UPDATE_INTERVAL_IN_SECS * 1000)
    }

    componentWillMount = () =>
    {
        this.props.fetchRouteStops(this.props.vehicle.trip_id)
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

        if (!this.fetchInterval)
        {
            this.createInterval(this.props)
            BackAndroid.addEventListener('hardwareBackPress', this.backAndroidHandler)
        }

        this.setState({renderConfirm: !nextProps.successfulStopRequest})

        for (let index in nextProps.routeStops)
        {
            let routeStop = nextProps.routeStops[index]

            if (this.props.startStop != null && routeStop.stop_code == this.props.startStop.stopCode ||
                routeStop.stop_code == this.props.stop.stopCode)
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

                if (routeStop.stop_code == this.props.stop.stopCode)
                {
                    this.setState({minutesLeftToEnd: minutesLeft})
                }
                else
                {
                    this.setState({minutesLeftToStart: minutesLeft})
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

        if(this.props.vehicle.supportsStopRequest) {
            Alert.alert(
                strings.cancelStopRequest, '',
                [
                    {
                        text: strings.no,
                        onPress: () => {
                        }
                    },
                    {
                        text: strings.yes,
                        onPress: () => {
                            this.props.cancelStopRequest(this.props.destinationRequestId, cancelStopRequestCallback)
                        }
                    }
                ],
                {cancelable: false}
            )
        } else {
            this.props.cancelStopRequest(this.props.destinationRequestId, cancelStopRequestCallback)
        }
    }


    renderRouteInfo = () =>
    {
        let startStopView = null

        if (this.props.startStop != null)
        {
            startStopView = <View>
                              <RouteInfoForStop stopName={this.props.startStop.stopName}
                                                stopCode={this.props.startStop.stopCode}
                                                vehicleMinutesLeft={this.state.minutesLeftToStart}/>
                            </View>
        }

        return (
          <View>
            {startStopView}
            <View>
              <RouteInfoForStop stopName={this.props.stop.stopName} stopCode={this.props.stop.stopCode} vehicleMinutesLeft={this.state.minutesLeftToEnd}/>
            </View>
          </View>
        )
    }

    renderSlider = () =>
  {
        const sendStopRequest = () =>
        {
            if(this.props.vehicle.supportsStopRequest) {
                Alert.alert(
                    strings.doYouReallyWantToMakeTheStopRequest, '',
                    [
                        {
                            text: strings.no,
                            onPress: () => {
                            }
                        },
                        {
                            text: strings.yes,
                            onPress: () => {
                                this.props.sendStoprequest(this.props.vehicle, this.props.stop, this.props.fcmToken, true)
                            }
                        }
                    ],
                    {cancelable: false}
                )
            } else {
                this.props.sendStoprequest(this.props.vehicle, this.props.stop, this.props.fcmToken, true)
            }
        }

        if (this.state.renderConfirm)
        {
            return (<View style={styles.padding10}>
                      <AwesomeButton labelStyle={styles.buttonLabel}
                      states={{
                          default: {
                              text: this.props.vehicle.supportsStopRequest ? strings.stop : strings.notifyArrival,
                              onPress: sendStopRequest,
                              backgroundColor: colors.HSLgreen
                          }
                      }} />
                    </View>)
        }
    }

    renderButton = () =>
    {
        const goToFrontPage = () =>
        {
            Alert.alert(
                strings.doYouReallyWantToGoToFrontPage, '',
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
                            clearInterval(this.fetchInterval)
                            this.fetchInterval = false
                            BackAndroid.removeEventListener('hardwareBackPress', this.backAndroidHandler)
                            Actions.start()
                        }
                    }
                ],
                { cancelable: false }
            )
        }

        if (this.props.successfulStopRequest)
        {
            return (<View style={styles.padding10}>
                      <AwesomeButton labelStyle={styles.buttonLabel}
                      states={{
                          default: {
                              text: strings.goToBackToFrontPage,
                              onPress: goToFrontPage,
                              backgroundColor: colors.HSLpink
                          }
                      }} />
                    </View>)
        }
    }

    render()
  {
      let { vehicle } = this.props

        return (
        <AccessibilityView style={styles.flex1} name={this.sceneName}>
            {this.props.successfulStopRequest && <StopRequestCancellationBox supportsStopRequest={vehicle.supportsStopRequest} onPress={this.showStopRequestCancelConfirmation} />}
          <TitleBar title={vehicle.line + ' ' + vehicle.destination} />
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
        routeStops: state.routeStops.routeStops,
        isFetchingStops: state.routeStops.isFetchingStops,
        routeIsReady: state.routeStops.routeIsReady,
        errorFetchingStops: state.routeStops.errorFetchingStops,
        error: state.stopRequest.error,
        scene: state.routes.scene,
        startStop: state.stopRequest.startStop,
        vehicle: state.stopRequest.currentVehicle,
        fcmToken: state.pushNotifications.token,
        destinationRequestId: state.stopRequest.destinationRequestId,
        successfulStopRequest: state.stopRequest.sentStoprequestFromVehicle
    }
}

const mapDispatchToProps = (dispatch) =>
{
    return {
        sendStoprequest: (busId, stopId, fcmToken, fromVehicle) =>
       {
            dispatch(sendStoprequest(busId, stopId, fcmToken, fromVehicle))
        },
        fetchRouteStops: (tripId) =>
        {
            dispatch(fetchRouteStops(tripId))
        },
        cancelStopRequest: (requestId, cancelStopRequestCallback) =>
        {
            dispatch(cancelStopRequest(requestId, true))
            .then((stopRequestCancellationError) => cancelStopRequestCallback(stopRequestCancellationError))
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
    successfulStopRequest: React.PropTypes.bool.isRequired,
    resetState: React.PropTypes.func.isRequired,
    fcmToken: React.PropTypes.string.token,
    destinationRequestId: React.PropTypes.number.isRequired,
    cancelStopRequest: React.PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(RouteStopRequestPage)
