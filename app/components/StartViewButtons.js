import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Text, ListView, View, TouchableOpacity, Image } from 'react-native'
import { Actions } from 'react-native-router-flux'

import styles from '../styles/stylesheet'
import strings from '../resources/translations'

class StartViewButtons extends Component{
  constructor(props) {
    super(props)

    this.state = {

    }

  }
  render() {
    const goToBusListView = () => Actions.departures()
    return (
    <View style={styles.start}>
    <TouchableOpacity style={styles.startUpper} onPress={goToBusListView}>
      <Image style={styles.startImageStop} source={require('../resources/images/rinkeli.png')}></Image>
      <Text style={styles.startText}>{strings.onStop}</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.startLower}>
      <Image style={styles.startImageVehicle} source={require('../resources/images/bussi.png')}></Image>
      <Text style={styles.startText}>{strings.onBus}</Text>
    </TouchableOpacity>
    </View>)
  }
}

export default StartViewButtons;
