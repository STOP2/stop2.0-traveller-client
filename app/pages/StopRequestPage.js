import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View } from 'react-native'
import { sendStoprequest } from '../actions/sendStoprequest'

import TitleBar from '../components/TitleBar'
import RouteInfo from '../components/RouteInfo'
import SlideConfirmButton from '../components/SlideConfirmButton'
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
    }

    renderSlider = () =>
  {
        const sendStoprequest = () =>
      {
            this.props.sendStoprequest(this.props.vehicle.vehicle_id, this.props.stop.stopId, 'stop')
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
        return (
        <View style={styles.flex1}>
          <TitleBar title={this.props.stop.stopName + '  (' + this.props.stop.stopId + ')'} />
          <RouteInfo vehicleType={this.props.vehicle.vehicle_type} vehicleLine={this.props.vehicle.line} vehicleDestination={this.props.vehicle.destination}/>
          {this.renderSlider()}
        </View>
      )
    }
}

const mapStateToProps = (state) =>
{
    return {sent: state.fetchReducer.sentStoprequest}
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
        vehicle_id: React.PropTypes.number.isRequired,
        vehicle_type: React.PropTypes.number.isRequired,
        line: React.PropTypes.string.isRequired,
        destination: React.PropTypes.string.isRequired
    }),
    stop: React.PropTypes.shape({
        stopId: React.PropTypes.string.isRequired,
        stopName: React.PropTypes.string.isRequired
    }),
    sendStoprequest: React.PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(StopRequestPage)
