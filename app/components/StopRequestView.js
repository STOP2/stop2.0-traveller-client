import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Text, ListView, View, TouchableOpacity } from 'react-native'
import { Actions } from 'react-native-router-flux'

import styles from '../styles/stylesheet'
import strings from '../resources/translations'

class StopRequestView extends Component{
  constructor(props) {
    super(props)


    this.state = {
    }
  }

  render() {
    const goBack = () => Actions.departures();

    const vehicleTypes = 'tram metro train bus ferry'.split(' ')

    return (
      <View style={styles.stopRequestStyle}>
      <View>
        <Text style={{fontSize: 20, textAlign: 'center'}}>{strings[vehicleTypes[this.props.vehicle.vehicle_type]]} {this.props.vehicle.line} to {this.props.vehicle.destination} {strings.stopsAt} {this.props.stop.stopName} ({this.props.stop.stopId})</Text>
        <TouchableOpacity onPress={goBack}>
          <Text style={{color: '#ff0000', textAlign: 'center'}}>{strings.back}</Text>
        </TouchableOpacity>
        </View>
      </View>
    )
  }
}

export default StopRequestView;
