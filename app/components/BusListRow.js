import React, { Component } from 'react'
import { View, Image } from 'react-native'
import { DefaultText } from '../components/textComponents'

import styles from '../styles/stylesheet'

class BusListRow extends Component {
  constructor(props)
  {
      super(props)

      this.state = {}

      this.iconTram = require('../resources/icons/hsl_reittiopas_tram.png')
      this.iconBus = require('../resources/icons/hsl_reittiopas_bus.png')
  }

  render()
  {
    const vehicleTypes = 'tram metro train bus ferry'.split(' ')

    return(
      <View style={styles.busrow}>
        <View style={styles.flex1}>
          {(this.props.vehicleType == 1 || this.props.vehicleType == 2 || this.props.vehicleType == 4) ? <DefaultText>strings[vehicleTypes[this.props.vehicle.vehicle_type]]</DefaultText> : <Image style={{
              width: 20,
              height: 20,
              marginLeft: 5
          }} resizeMode="contain" source={this.props.vehicleType == 0 ? this.iconTram : this.iconBus}/>}
        </View>
        <DefaultText style={styles.busrowText}>{this.props.line}</DefaultText>
        <DefaultText style={styles.busrowTextBlack2}>{this.props.destination}</DefaultText>
        <DefaultText style={styles.busrowTextBlack}>{this.props.arrival} min</DefaultText>
      </View>)
  }
}

BusListRow.propTypes = {
    vehicleType: React.PropTypes.number.isRequired,
    line: React.PropTypes.string.isRequired,
    destination: React.PropTypes.string.isRequired,
    arrival: React.PropTypes.number.isRequired
}

export default BusListRow
