import React, { Component } from 'react';
import { View } from 'react-native';

import { DefaultText } from '../components/textComponents';
import VehicleImage from '../components/VehicleImage';

import styles from '../styles/stylesheet';
import strings from '../resources/translations';

const RouteInfo = ({ vehicleType, vehicleLine, vehicleDestination, mode, vehicleMinutesLeft }) => (
    <View style={styles.stopRequestStyle}>
      <View style={styles.stopRequestVehicleInfo}>
        <VehicleImage style={styles.busIcon} vehicleType={vehicleType} />

        <View style={styles.vehicleInfoWrapper}>
          <DefaultText style={styles.vehicleInfo}>{vehicleLine} {vehicleDestination}</DefaultText>
        </View>
      </View>

      <View style={styles.vehicleArrivesInWrapper}>
        <DefaultText style={styles.vehicleArrivesInText}>{mode == 'stop' ? strings.vehicleStopsIn : strings.vehicleArrivesIn} {vehicleMinutesLeft == strings.now || vehicleMinutesLeft == strings.vehiclePassedStop ? '' : strings.in }</DefaultText>
      </View>

      <View>
        <DefaultText style={styles.vehicleMinutesLeft}>{vehicleMinutesLeft}</DefaultText>
      </View>
    </View>
);


RouteInfo.propTypes = {
    vehicleType: React.PropTypes.number.isRequired,
    vehicleLine: React.PropTypes.string.isRequired,
    vehicleDestination: React.PropTypes.string.isRequired,
    vehicleMinutesLeft: React.PropTypes.string.isRequired,
};

const RouteInfoForStop = ({ stopName, stopCode, vehicleMinutesLeft }) => (
    <View style={styles.stopRequestStyle}>
      <View style={styles.vehicleArrivesInWrapper}>
        <DefaultText style={styles.vehicleArrivesInText}>{strings.arrives} {stopName} ({stopCode}) {vehicleMinutesLeft == strings.now || vehicleMinutesLeft == strings.vehiclePassedStop ? '' : strings.in}:</DefaultText>
      </View>

      <View>
        <DefaultText style={styles.vehicleMinutesLeft}>{vehicleMinutesLeft}</DefaultText>
      </View>
    </View>
);

RouteInfoForStop.propTypes = {
    stopName: React.PropTypes.string.isRequired,
    stopCode: React.PropTypes.string.isRequired,
    vehicleMinutesLeft: React.PropTypes.string.isRequired,
};
