import React, { Component } from 'react'
import {View, Text} from 'react-native'
import { connect } from 'react-redux'

class VehiclesPage extends Component {

    constructor(props)
  {
        super(props)
    }
    render()
    {
        return (
          <View>
          <Text>{this.props.beaconData}</Text>
          </View>
        )
    }
  }

export default VehiclesPage
