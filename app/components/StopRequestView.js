import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Text, ListView, View, TouchableOpacity } from 'react-native'
import { Actions } from 'react-native-router-flux'

import styles from '../styles/stylesheet'

class StopRequestView extends Component{
  constructor(props) {
    super(props)


    this.state = {
    }
  }

  render() {
    const goBack = () => Actions.pop();

    return (
      <View style={{padding: 10}}>
        <Text>Valitun bussin id on {this.props.vehicle.vehicleId}</Text>
        <TouchableOpacity onPress={goBack}>
          <Text style={{color: '#ff0000'}}>Takaisin</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

export default StopRequestView;
