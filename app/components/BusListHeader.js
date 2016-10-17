import React, { Component } from 'react'
import { Text, View } from 'react-native'

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
            <Text style={styles.busrowText}>{strings.type}</Text>
            <Text style={styles.busrowText}>{strings.line}</Text>
            <Text style={styles.busrowText2}>{strings.dest}</Text>
            <Text style={styles.busrowText}>{strings.leaves}</Text>
          </View>)
    }
}

export default BusListHeader
