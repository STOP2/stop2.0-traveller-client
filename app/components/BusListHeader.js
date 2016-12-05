import React, { Component } from 'react';
import { View } from 'react-native';

import { DefaultText } from '../components/textComponents';

import styles from '../styles/stylesheet';
import strings from '../resources/translations';

const BusListHeader = () => (
          <View style={styles.busrowheader}>
            <DefaultText style={styles.busrowText}>{strings.type}</DefaultText>
            <DefaultText style={styles.busrowText}>{strings.line}</DefaultText>
            <DefaultText style={styles.busrowText2}>{strings.dest}</DefaultText>
            <DefaultText style={styles.busrowText}>{strings.leaves}</DefaultText>
          </View>
);

const RouteListHeader = () => (
          <View style={styles.busrowheader}>
            <DefaultText style={styles.busrowText}>{strings.stopCode}</DefaultText>
            <DefaultText style={styles.busrowText2}>{strings.stopName}</DefaultText>
            <DefaultText style={styles.busrowText}>{strings.arrivesIn}</DefaultText>
          </View>
);
