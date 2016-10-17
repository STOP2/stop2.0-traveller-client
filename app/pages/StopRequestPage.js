import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Text, View, Image } from 'react-native'
import { sendStoprequest } from '../actions/sendStoprequest'

import TitleBar from '../components/TitleBar'
import SlideConfirmButton from '../components/SlideConfirmButton'

import styles from '../styles/stylesheet'
import strings from '../resources/translations'

class StopRequestPage extends Component{
    constructor(props)
  {
        super(props)
        this.state = {renderConfirm: true}
        this.iconTram = require('../resources/icons/hsl_reittiopas_tram.png')
        this.iconBus = require('../resources/icons/hsl_reittiopas_bus.png')
    }

    componentWillReceiveProps = (nextProps) =>
  {
        this.setState({renderConfirm: !nextProps.sent})
    }

    renderCancel = () =>
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
              <Text style={styles.confirmedText}>{strings.stopsent}</Text>
            </View>
          )
        }
    }

    render()
  {
        return (
        <View style={styles.flex1}>
            <TitleBar title={this.props.stop.stopName + '  (' + this.props.stop.stopId + ')'} />
          <View style={styles.stopRequestStyle}>
            <View style={styles.doYouWantToStopWrapper}>
              <Text style={styles.doYouWantToStop}>{strings.doYouWantToStop}</Text>
            </View>
            <View style={styles.flexRow}>
              <Image style={styles.busIcon} resizeMode="contain"
              source={this.props.vehicle.vehicle_type == 0 ? this.iconTram : this.iconBus}/>
              <View style={styles.vehicleInfoWrapper}>
                <Text style={styles.vehicleInfo}>{this.props.vehicle.line} {this.props.vehicle.destination}</Text>
              </View>
            </View>
          </View>

          {this.renderCancel()}
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

export default connect(mapStateToProps, mapDispatchToProps)(StopRequestPage)
