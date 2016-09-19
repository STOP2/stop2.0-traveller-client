import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Text, ListView, View, TouchableOpacity } from 'react-native'
import { Actions } from 'react-native-router-flux'

import styles from '../styles/stylesheet'
import strings from '../resources/translations'

class StartView extends Component{
  constructor(props) {
    super(props)


    this.state = {
    }
  }

  render(renderData) {
    const goToBusListView = () => Actions.departures()

    return (
      <View style={{
        flex:1,
        padding: 10,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <Text>Valitse kummassa olet</Text>
        <TouchableOpacity onPress={goToBusListView}>
          <Text style={{flex:1, color: '#007AC9', fontSize: 60}}>Pysäkillä</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={goToBusListView}>
          <Text style={{flex:1, color: '#007AC9', fontSize: 60}}>Bussissa</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

export default StartView;
