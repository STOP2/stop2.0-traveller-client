import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Text, ListView, View, TouchableOpacity } from 'react-native'
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
    <TouchableOpacity onPress={goToBusListView}>
    <Text style={styles.startText}>{strings.onStop}</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={goToBusListView}>
    <Text style={styles.startText}>{strings.onBus}</Text>
    </TouchableOpacity>
    </View>)
  }
}

export default StartViewButtons;
