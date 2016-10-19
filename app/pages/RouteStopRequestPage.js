import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, TouchableOpacity, BackAndroid } from 'react-native'
import { sendStoprequest } from '../actions/sendStoprequest'
import { Actions } from 'react-native-router-flux'

import TitleBar from '../components/TitleBar'
import RouteInfo from '../components/RouteInfo'
import SlideConfirmButton from '../components/SlideConfirmButton'
import AccessibilityView from '../components/AccessibilityView'
import {DefaultText} from '../components/textComponents'

import styles from '../styles/stylesheet'
import strings from '../resources/translations'

class RouteStopRequestPage extends Component{
    constructor(props)
  {
        super(props)
        this.state = {renderConfirm: true}
    }

    componentWillReceiveProps = (nextProps) =>
      {
        this.setState({renderConfirm: !nextProps.sent})
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

    render()
  {
        /*return (
        <View style={styles.flex1}>
          <TitleBar title={this.props.stop.stopName + '  (' + this.props.stop.stopId + ')'} />
          <RouteInfo vehicleType={this.props.vehicle.vehicle_type} vehicleLine={this.props.vehicle.line} vehicleDestination={this.props.vehicle.destination}/>
          {this.renderSlider()}
        </View>
      )*/
        return(
            <AccessibilityView name="routeStopRequest">
                <DefaultText>Heloooo</DefaultText>
            </AccessibilityView>
        )
    }
}

const mapStateToProps = (state) =>
{
    return {
        sent: state.fetchReducer.sentStoprequest,
        scene: state.routes.scene
    }
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

RouteStopRequestPage.propTypes = {

}

export default connect(mapStateToProps, mapDispatchToProps)(RouteStopRequestPage)
