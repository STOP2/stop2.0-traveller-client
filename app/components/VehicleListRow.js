import React, { Component } from 'react'
import { View } from 'react-native'
import { DefaultText } from '../components/textComponents'
import VehicleImage from '../components/VehicleImage'

import styles from '../styles/stylesheet'

class VehicleListRow extends Component {
    render()
    {
        return (
          <View style={styles.vehiclerow}>
            <View style={styles.flex1}>
              <VehicleImage style={styles.vehiclerowImage} vehicleType={this.props.vehicleType}/>
            </View>
            <DefaultText style={styles.vehiclerowText}>{this.props.line}</DefaultText>
            <DefaultText style={styles.vehiclerowTextBlack2}>{this.props.destination}</DefaultText>
          </View>)
    }
}

VehicleListRow.propTypes = {
    vehicleType: React.PropTypes.number.isRequired,
    line: React.PropTypes.string.isRequired,
    destination: React.PropTypes.string.isRequired
}

export default VehicleListRow
