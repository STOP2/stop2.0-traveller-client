import React, { Component } from 'react';
import { View } from 'react-native';

import { DefaultText } from '../components/textComponents';
import VehicleImage from '../components/VehicleImage';

import styles from '../styles/stylesheet';
import strings from '../resources/translations';

export default class RouteInfo extends Component {
  render() {
    let stopsText;
    let inText;

    if (this.props.mode === 'stop') {
      stopsText = strings.vehicleStopsIn;
    } else {
      stopsText = strings.vehicleArrivesIn;
    }

    if (this.props.vehicleMinutesLeft === strings.now
        || this.props.vehicleMinutesLeft === strings.vehiclePassedStop) {
      inText = '';
    } else {
      inText = strings.in;
    }

    return (
      <View accessibilityLiveRegion="polite" accessible style={styles.stopRequestStyle}>
        <View style={styles.stopRequestVehicleInfo}>
          <VehicleImage style={styles.busIcon} vehicleType={this.props.vehicleType} />
          <View style={styles.vehicleInfoWrapper}>
            <DefaultText style={styles.vehicleInfo}>
              {this.props.vehicleLine} {this.props.vehicleDestination}
            </DefaultText>
          </View>
        </View>
        <View style={styles.vehicleArrivesInWrapper}>
          <DefaultText style={styles.vehicleArrivesInText}>{stopsText} {inText}</DefaultText>
        </View>
        <View>
          <DefaultText style={styles.vehicleMinutesLeft}>
            {this.props.vehicleMinutesLeft}
          </DefaultText>
        </View>
      </View>
    );
  }
}

RouteInfo.propTypes = {
  vehicleType: React.PropTypes.number.isRequired,
  vehicleLine: React.PropTypes.string.isRequired,
  vehicleDestination: React.PropTypes.string.isRequired,
  vehicleMinutesLeft: React.PropTypes.string.isRequired,
};

export class RouteInfoForStop extends Component {
  render() {
    let inText;

    if (this.props.vehicleMinutesLeft === strings.now
        || this.props.vehicleMinutesLeft === strings.vehiclePassedStop) {
      inText = '';
    } else {
      inText = strings.in;
    }

    return (
      <View accessibilityLiveRegion="polite" accessible style={styles.stopRequestStyle}>
        <View style={styles.vehicleArrivesInWrapper}>
          <DefaultText style={styles.vehicleArrivesInText}>
            {strings.arrives} {this.props.stopName} ({this.props.stopCode}) {inText}:
          </DefaultText>
        </View>
        <View>
          <DefaultText style={styles.vehicleMinutesLeft}>
            {this.props.vehicleMinutesLeft}
          </DefaultText>
        </View>
      </View>
    );
  }
}

RouteInfoForStop.propTypes = {
  stopName: React.PropTypes.string.isRequired,
  stopCode: React.PropTypes.string.isRequired,
  vehicleMinutesLeft: React.PropTypes.string.isRequired,
};
