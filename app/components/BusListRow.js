import React, { Component } from 'react'
import { View } from 'react-native'
import { DefaultText } from '../components/textComponents'
import VehicleImage from '../components/VehicleImage'

import styles from '../styles/stylesheet'

class BusListRow extends Component {
    render()
    {
        return (
          <View style={styles.busrow}>
            <View style={styles.flex1}>
              <VehicleImage style={styles.busrowImage} vehicleType={this.props.vehicleType}/>
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
