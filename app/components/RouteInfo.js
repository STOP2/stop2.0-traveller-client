import React, { Component } from 'react'
import { View, Image } from 'react-native'

import {DefaultText} from '../components/textComponents'

import styles from '../styles/stylesheet'
import strings from '../resources/translations'

class RouteInfo extends Component {
    constructor(props)
    {
        super(props)

        this.state = {}
        this.iconTram = require('../resources/icons/hsl_reittiopas_tram.png')
        this.iconBus = require('../resources/icons/hsl_reittiopas_bus.png')
    }

    render()
    {
        return (<View style={styles.stopRequestStyle}>
          <View style={styles.stopRequestVehicleInfo}>
            <Image style={styles.busIcon} resizeMode="contain"
            source={this.props.vehicleType == 0 ? this.iconTram : this.iconBus}/>
            <View style={styles.vehicleInfoWrapper}>
              <DefaultText style={styles.vehicleInfo}>{this.props.vehicleLine} {this.props.vehicleDestination}</DefaultText>
            </View>
          </View>
          <View style={styles.vehicleArrivesInWrapper}>
            <DefaultText style={styles.vehicleArrivesInText}>{strings.vehicleArrivesIn}</DefaultText>
          </View>
          <View>
            <DefaultText style={styles.vehicleMinutesLeft}>{this.props.vehicleMinutesLeft}</DefaultText>
          </View>
        </View>)
    }
}

RouteInfo.propTypes = {
    title: React.PropTypes.string.isRequired,
    vehicleType: React.PropTypes.number.isRequired,
    vehicleLine: React.PropTypes.string.isRequired,
    vehicleDestination: React.PropTypes.string.isRequired,
    vehicleMinutesLeft: React.PropTypes.string.isRequired
}

export default RouteInfo
