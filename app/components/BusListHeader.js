import React, { Component } from 'react'
import { View } from 'react-native'

import {DefaultText} from '../components/textComponents'

import styles from '../styles/stylesheet'
import strings from '../resources/translations'

export default class BusListHeader extends Component {
    render()
    {
        return (
          <View style={styles.busrowheader}>
            <DefaultText style={styles.busrowText}>{strings.type}</DefaultText>
            <DefaultText style={styles.busrowText}>{strings.line}</DefaultText>
            <DefaultText style={styles.busrowText2}>{strings.dest}</DefaultText>
            <DefaultText style={styles.busrowText}>{strings.leaves}</DefaultText>
          </View>)
    }
}

export class RouteListHeader extends Component {
    render()
    {
        return (
          <View style={styles.busrowheader}>
            <DefaultText style={styles.busrowText}>{strings.stopCode}</DefaultText>
            <DefaultText style={styles.busrowText}>{strings.stopName}</DefaultText>
            <DefaultText style={styles.busrowText2}>{strings.arrivesIn}</DefaultText>
          </View>)
    }
}
