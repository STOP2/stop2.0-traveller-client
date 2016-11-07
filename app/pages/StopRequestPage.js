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

class StopRequestPage extends Component{
    constructor(props)
  {
        super(props)
        this.state = {renderConfirm: true}
    }

    componentWillReceiveProps = (nextProps) =>
      {
        this.setState({renderConfirm: !nextProps.sent})
        BackAndroid.addEventListener('hardwareBackPress', this.backAndroidHandler)
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

    renderSlider = () =>
  {
        const sendStoprequest = () =>
      {
            this.props.sendStoprequest(this.props.vehicle.trip_id, this.props.stop.stopId, 'stop')
        }

        if (this.state.renderConfirm)
      {
            return (<SlideConfirmButton onSlideSuccess={sendStoprequest} text={strings.slide} />)
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

        if (!this.state.renderConfirm)
        {
            return (
          <TouchableOpacity style={styles.goToRouteViewButton} onPress={goToStopRequestPage}>
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
          <RouteInfo vehicleType={this.props.vehicle.vehicle_type} vehicleLine={this.props.vehicle.line} vehicleDestination={this.props.vehicle.destination}/>
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
    return { sent: state.fetchReducer.sentStoprequest }
}

const mapDispatchToProps = (dispatch) =>
{
    return {
        sendStoprequest: (busId, stopId, requestType) =>
       {
            dispatch(sendStoprequest(busId, stopId, requestType))
        }
    }
}

StopRequestPage.propTypes = {
    vehicle: React.PropTypes.shape({
        trip_id: React.PropTypes.string.isRequired,
        vehicle_type: React.PropTypes.number.isRequired,
        line: React.PropTypes.string.isRequired,
        destination: React.PropTypes.string.isRequired
    }),
    stop: React.PropTypes.shape({
        stopCode: React.PropTypes.string.isRequired,
        stopName: React.PropTypes.string.isRequired,
        stopId: React.PropTypes.string.isRequired
    }),
    sendStoprequest: React.PropTypes.func.isRequired,
    sent: React.PropTypes.bool.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(StopRequestPage)
