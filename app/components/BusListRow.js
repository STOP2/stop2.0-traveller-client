import React, { Component } from 'react';
import { View } from 'react-native';
import { DefaultText } from '../components/textComponents';
import VehicleImage from '../components/VehicleImage';

import styles from '../styles/stylesheet';

const BusListRow = ({ vehicleType, line, destination, arrival }) => (
          <View style={styles.busrow}>
            <View style={styles.flex1}>
              <VehicleImage style={styles.busrowImage} vehicleType={vehicleType}/>
            </View>
            <DefaultText style={styles.busrowText}>{line}</DefaultText>
            <DefaultText style={styles.busrowTextBlack2}>{destination}</DefaultText>
            <DefaultText style={styles.busrowTextBlack}>{arrival} min</DefaultText>
          </View>
);

BusListRow.propTypes = {
    vehicleType: React.PropTypes.number.isRequired,
    line: React.PropTypes.string.isRequired,
    destination: React.PropTypes.string.isRequired,
    arrival: React.PropTypes.number.isRequired,
};

export default BusListRow;
