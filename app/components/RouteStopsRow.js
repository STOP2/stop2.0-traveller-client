import React, { Component } from 'react'
import { View } from 'react-native'
import { DefaultText } from '../components/textComponents'

import styles from '../styles/stylesheet'

class RouteStopsRow extends Component {
    constructor(props)
  {
        super(props)

        this.state = {}
    }

    render()
  {
        return (
      <View style={styles.busrow}>
        <DefaultText style={styles.busrowText}>{this.props.stopId}</DefaultText>
        <DefaultText style={styles.busrowTextBlack2}>{this.props.stopName}</DefaultText>
        <DefaultText style={styles.busrowTextBlack}>{this.props.arrivalTime} min</DefaultText>
      </View>)
    }
}

RouteStopsRow.propTypes = {
    stopId: React.PropTypes.string.isRequired,
    stopName: React.PropTypes.string.isRequired,
    arrivalTime: React.PropTypes.number.isRequired
}

export default RouteStopsRow
