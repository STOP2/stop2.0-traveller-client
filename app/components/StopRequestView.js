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
    console.log(1)
    this.setState({
      renderConfirm: !nextProps.sent
    })
  }

  renderCancel = () => {
    console.log(2)
        if (this.state.renderConfirm) {
            return (
              <View>
                <TouchableOpacity onPress={sendStoprequest} style={styles.button}>
                  <Text style={{fontSize: 40, textAlign: 'center', color: '#ffffff'}}>{strings.confirm}</Text>
                </TouchableOpacity>
              </View>

            );
        } else {
            return <Text style={{fontSize: 40, textAlign: 'center', color: '#ffffff'}}>{strings.stopsent}</Text>;
        }
    }

  render() {
    const goBack = () => Actions.departures()
    const sendStoprequest = () => this.props.sendStoprequest(this.props.vehicle.vehicle_id, this.props.stop.stopId, "stop")

    const vehicleTypes = 'tram metro train bus ferry'.split(' ')

    return (
      <View style={styles.stopRequestStyle}>
      <View>
        <Text style={{fontSize: 20, textAlign: 'center', margin: 20}}>{strings[vehicleTypes[this.props.vehicle.vehicle_type]]} {this.props.vehicle.line} to {this.props.vehicle.destination} {strings.stopsAt} {this.props.stop.stopName} ({this.props.stop.stopId})</Text>
        {this.renderCancel()}
        <TouchableOpacity onPress={goBack}>
          <Text style={{fontSize: 20, color: '#666666', textAlign: 'center'}}>{strings.back}</Text>
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
