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
          <Text>stop beacon:{'\n'}
          {this.props.beaconData.uuid}{'\n'}
          {this.props.beaconData.major}{'\n'}
          {this.props.beaconData.minor}{'\n'}
          </Text>
          </View>
        )
    }
  }

const mapStateToProps = (state) =>
  {
    return {
          beaconData: state.beacons.beaconData
      }
  }

  const mapDispatchToProps = (dispatch) =>
  {
      return {

      }
  }

export default connect(mapStateToProps,mapDispatchToProps)(VehiclesPage)
