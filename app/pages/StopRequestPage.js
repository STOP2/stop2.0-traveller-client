import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, TouchableOpacity, BackAndroid } from 'react-native'
import { sendStoprequest } from '../actions/sendStoprequest'
import { Actions } from 'react-native-router-flux'

import { TitleBar, BoldTitleBar } from '../components/TitleBar'
import RouteInfo from '../components/RouteInfo'
import SlideConfirmButton from '../components/SlideConfirmButton'
import AccessibilityView from '../components/AccessibilityView'
import {DefaultText} from '../components/textComponents'

import styles from '../styles/stylesheet'
import strings from '../resources/translations'

import { fetchRouteStops } from '../actions/fetchRouteStops'

const UPDATE_INTERVAL_IN_SECS = 10

class StopRequestPage extends Component{
    constructor(props)
    {
        super(props)

        this.state = {
            renderConfirm: true,
            minutesLeft: this.props.vehicle.arrival + ' ' + strings.minutes,
            fetchIntervalRunning: false
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
        return (this.state.renderConfirm ? <RouteInfo title={strings.aboutToStop} vehicleType={this.props.vehicle.vehicle_type} vehicleLine={this.props.vehicle.line} vehicleDestination={this.props.vehicle.destination} vehicleMinutesLeft={this.state.minutesLeft}/> : <RouteInfo title={strings.aboutToStop} vehicleType={this.props.vehicle.vehicle_type} vehicleLine={this.props.vehicle.line} vehicleDestination={this.props.vehicle.destination} vehicleMinutesLeft={this.state.minutesLeft}/>)
    }

    renderSlider = () =>
  {
        const sendStoprequest = () =>
        {
            this.props.sendStoprequest(this.props.vehicle.trip_id, this.props.stop.stopId, 'stop')
        }

        if (!this.props.sent || this.props.error)
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
            Actions.routeStops({
                tripId: this.props.vehicle.trip_id,
                stopId: this.props.stop.stopId,
                vehicleLine: this.props.vehicle.line,
                vehicleDestination: this.props.vehicle.destination

            })
        }

        if (this.props.sent && !this.props.error)
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
        sent: state.fetchReducer.sentStoprequest,
        routeStops: state.fetchRouteStopsReducer.routeStops,
        isFetchingStops: state.fetchRouteStopsReducer.isFetchingStops,
        routeIsReady: state.fetchRouteStopsReducer.routeIsReady,
        errorFetchingStops: state.fetchRouteStopsReducer.errorFetchingStops,
        error: state.fetchReducer.error,
        scene: state.routes.scene
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


StopRequestPage.propTypes = {
    fetchRouteStops: React.PropTypes.func.isRequired,
    error: React.PropTypes.bool.isRequired,
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
    sent: React.PropTypes.bool.isRequired,
    routeIsReady: React.PropTypes.bool
}

export default connect(mapStateToProps, mapDispatchToProps)(StopRequestPage)
