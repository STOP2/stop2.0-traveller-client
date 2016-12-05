import React, { Component } from 'react';
import { View } from 'react-native';
import { DefaultText } from '../components/textComponents';

import styles from '../styles/stylesheet';

const RouteStopsRow = ({ stopId, stopName, arrivalTime }) => (
  <View style={styles.busrow}>
    <DefaultText style={styles.busrowText}>{stopId}</DefaultText>
    <DefaultText style={styles.busrowTextBlack2}>{stopName}</DefaultText>
    <DefaultText style={styles.busrowTextBlack}>{arrivalTime}</DefaultText>
  </View>
);

RouteStopsRow.propTypes = {
    stopId: React.PropTypes.string.isRequired,
    stopName: React.PropTypes.string.isRequired,
    arrivalTime: React.PropTypes.number.isRequired,
};

export default RouteStopsRow;
