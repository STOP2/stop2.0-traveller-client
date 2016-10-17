import React, { Component } from 'react'
import { View } from 'react-native'

import { DefaultText } from '../components/textComponents'

import styles from '../styles/stylesheet'
import strings from '../resources/translations'

class BusListHeader extends Component {
    constructor(props)
    {
        super(props)

        this.state = {}
    }

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

export default BusListHeader
