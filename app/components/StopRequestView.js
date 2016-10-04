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
      renderConfirm: true
    }
  }

  componentWillReceiveProps = (nextProps) => {
    this.setState({
      renderConfirm: !nextProps.sent
    })
  }

  renderCancel = () => {
    const sendStoprequest = () => this.props.sendStoprequest(this.props.vehicle.vehicle_id, this.props.stop.stopId, "stop")
        if (this.state.renderConfirm) {
            return (
              <View>
                <TouchableOpacity onPress={sendStoprequest} style={styles.button}>
                  <Text style={styles.confirmText}>{strings.confirm}</Text>
                </TouchableOpacity>
              </View>

            );
        } else {
            return <Text style={styles.confirmedText}>{strings.stopsent}</Text>;
        }
    }

  render() {
    const goBack = () => Actions.departures()
    const vehicleTypes = 'tram metro train bus ferry'.split(' ')

    return (
      <View style={styles.stopRequestStyle}>
      <View>
        <Text style={styles.busStopsAtText}>{strings[vehicleTypes[this.props.vehicle.vehicle_type]]} {this.props.vehicle.line} to {this.props.vehicle.destination} {strings.stopsAt} {this.props.stop.stopName} ({this.props.stop.stopId})</Text>
        {this.renderCancel()}
        <TouchableOpacity onPress={goBack}>
          <Text style={styles.backText}>{strings.back}</Text>
        </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    sent: state.fetchReducer.sentStoprequest
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
