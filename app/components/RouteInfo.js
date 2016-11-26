import React, { Component } from 'react'
import { View } from 'react-native'

import {DefaultText} from '../components/textComponents'
import VehicleImage from '../components/VehicleImage'

import styles from '../styles/stylesheet'
import strings from '../resources/translations'

export default class RouteInfo extends Component {
    render()
    {
        return (<View style={styles.stopRequestStyle}>
          <View style={styles.stopRequestVehicleInfo}>
            <VehicleImage style={styles.busIcon} vehicleType={this.props.vehicleType}/>
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
    vehicleType: React.PropTypes.number.isRequired,
    vehicleLine: React.PropTypes.string.isRequired,
    vehicleDestination: React.PropTypes.string.isRequired,
    vehicleMinutesLeft: React.PropTypes.string.isRequired
}

export class RouteInfoForStop extends Component {
    render()
    {
        return (<View style={styles.stopRequestStyle}>
          <View style={styles.vehicleArrivesInWrapper}>
            <DefaultText style={styles.vehicleArrivesInText}>{strings.arrives} {this.props.stopName} ({this.props.stopCode}) {strings.in}:</DefaultText>
          </View>
          <View>
            <DefaultText style={styles.vehicleMinutesLeft}>{this.props.vehicleMinutesLeft}</DefaultText>
          </View>
        </View>)
    }
}

RouteInfoForStop.propTypes = {
    stopName: React.PropTypes.string.isRequired,
    stopCode: React.PropTypes.string.isRequired,
    vehicleMinutesLeft: React.PropTypes.string.isRequired
}
