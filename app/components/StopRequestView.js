import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Text, ListView, View, TouchableOpacity } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { sendStoprequest } from '../actions/sendStoprequest'

import styles from '../styles/stylesheet'
import strings from '../resources/translations'

class StopRequestView extends Component{
  constructor(props) {
    super(props)


    this.state = {
    }
  }

  componentWillReceiveProps = (nextProps) => {
    console.log(nextProps.sent)
  }

  render() {
    const goBack = () => Actions.departures()
    const sendStoprequest = () => this.props.sendStoprequest("1234", this.props.stop.stopId, "stop")

    const vehicleTypes = 'tram metro train bus ferry'.split(' ')

    return (
      <View style={styles.stopRequestStyle}>
      <View>
        <Text style={{fontSize: 20, textAlign: 'center'}}>{strings[vehicleTypes[this.props.vehicle.vehicle_type]]} {this.props.vehicle.line} to {this.props.vehicle.destination} {strings.stopsAt} {this.props.stop.stopName} ({this.props.stop.stopId})</Text>
        <TouchableOpacity onPress={sendStoprequest}>
          <Text style={{color: '#ff0000', textAlign: 'center'}}>{strings.back}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={goBack}>
          <Text style={{color: '#ff0000', textAlign: 'center'}}>{strings.back}</Text>
        </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    sent: state.fetchReducer.isSending
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      sendStoprequest: (bus_id, stop_id, request_type) => {
        dispatch(sendStoprequest(bus_id, stop_id, request_type))
      }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StopRequestView);
