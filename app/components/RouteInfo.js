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
          <View style={styles.doYouWantToStopWrapper}>
            <DefaultText style={styles.doYouWantToStop}>{strings.doYouWantToStop}</DefaultText>
          </View>
          <View style={styles.flexRow}>
            <Image style={styles.busIcon} resizeMode="contain"
            source={this.props.vehicleType == 0 ? this.iconTram : this.iconBus}/>
            <View style={styles.vehicleInfoWrapper}>
              <DefaultText style={styles.vehicleInfo}>{this.props.vehicleLine} {this.props.vehicleDestination}</DefaultText>
            </View>
          </View>
        </View>)
    }
}

RouteInfo.propTypes = {
    vehicleType: React.PropTypes.number.isRequired,
    vehicleLine: React.PropTypes.string.isRequired,
    vehicleDestination: React.PropTypes.string.isRequired
}

export default RouteInfo
