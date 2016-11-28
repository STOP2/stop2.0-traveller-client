import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, TouchableOpacity, BackAndroid, Alert } from 'react-native'
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
        return (this.state.renderConfirm ?
<RouteInfo mode="arrive" vehicleType={this.props.vehicle.vehicle_type} vehicleLine={this.props.vehicle.line} vehicleDestination={this.props.vehicle.destination} vehicleMinutesLeft={this.state.minutesLeft}/> : <RouteInfo mode="stop" vehicleType={this.props.vehicle.vehicle_type} vehicleLine={this.props.vehicle.line} vehicleDestination={this.props.vehicle.destination} vehicleMinutesLeft={this.state.minutesLeft}/>)
    }

    renderSlider = () =>
    {
        const sendStopRequest = () =>
        {
            Alert.alert(
                strings.doYouReallyWantToMakeTheStopRequest, '',
                [
                    {text: strings.no, onPress: () => {
                    }},
                    {text: strings.yes, onPress: () => {
                        this.props.sendStoprequest(this.props.vehicle, this.props.stop, this.props.fcmToken, false)
                    }},
                ],
                {
                    cancelable: false
                }
            )
    }

        if (!this.props.successfulStopRequest)
        {
            return(<View style={{padding: 10}}><AwesomeButton labelStyle={{fontSize: 20, color: '#ffffff', fontFamily: 'gotham-rounded-medium'}} states={{
                        default: {
                          text: strings.stop,
                          onPress: sendStopRequest,
                          backgroundColor: '#64BE14'
                        }
                       }} /></View>)
        }
        else
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

            let goToStopRequestPage = () =>
            {
              clearInterval(this.fetchInterval)
              this.fetchInterval = false
              BackAndroid.removeEventListener('hardwareBackPress', this.backAndroidHandler)
              Actions.routeStops()
            }


            /*return (
                <TouchableOpacity accessibilityComponentType="button" accessibilityLabel={strings.goToRouteStopsView} style={styles.goToRouteViewButton} onPress={goToStopRequestPage}>
                    <DefaultText style={styles.goToRouteViewButtonText}>{strings.goToRouteStopsView}</DefaultText>
                </TouchableOpacity>)*/
            return(<View style={{padding: 10}}><AwesomeButton labelStyle={{fontSize: 20, color: '#ffffff', fontFamily: 'gotham-rounded-medium'}} states={{
                        default: {
                          text: strings.goToRouteStopsView,
                          onPress: goToStopRequestPage,
                          backgroundColor: '#F092CD'
                        }
                       }} /></View>)

            //return (<SlideConfirmButton mode="cancel" onSlideSuccess={() => this.props.cancelStopRequest(this.props.fromRequestId, cancelStopRequestCallback)} text={'← ' + strings.slideToCancel} />)
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


      const cancelStopRequest = () => {
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

      return (
        <AccessibilityView style={styles.flex1} name="stopRequest">
          <PushController vehicleType={this.props.vehicle.vehicle_type} vehicleLine={this.props.vehicle.line} />

            {this.props.successfulStopRequest && <View style={{padding: 10, width: undefined, height: undefined, backgroundColor: '#BEE4F8'}}>
                <DefaultText style={{marginBottom: 10, fontWeight: 'bold', fontSize: 20}}>Pysäytyspyyntö lähetetty</DefaultText>
                <AwesomeButton labelStyle={{fontSize: 20, color: '#ffffff', fontFamily: 'gotham-rounded-medium'}} states={{
                        default: {
                          text: 'Peruuta',
                          onPress: cancelStopRequest,
                          backgroundColor: '#DC0451'
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
