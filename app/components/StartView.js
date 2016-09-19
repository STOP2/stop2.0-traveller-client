import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Text, ListView, View, TouchableOpacity } from 'react-native'
import { Actions } from 'react-native-router-flux'

import styles from '../styles/stylesheet'

class StartView extends Component{
  constructor(props) {
    super(props)


    this.state = {
    }
  }

  render(renderData) {
    const goToBusListView = () => Actions.departures()

    return (
      <View style={{padding: 10}}>
        <Text>Valitse kummassa olet</Text>
        <TouchableOpacity onPress={goToBusListView}>
          <Text style={{color: '#007AC9', fontSize: 40}}>Olen pysäkillä</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={goToBusListView}>
          <Text style={{color: '#007AC9', fontSize: 40}}>Olen bussissa</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

export default StartView;
