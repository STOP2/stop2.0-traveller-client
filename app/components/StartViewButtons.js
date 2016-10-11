import React, { Component } from 'react'
import { View } from 'react-native'
import { Actions } from 'react-native-router-flux'
import StartButton from './StartButton'

import styles from '../styles/stylesheet'
import strings from '../resources/translations'

class StartViewButtons extends Component {
    constructor(props)
    {
        super(props)

        this.state = {}
    }

    render()
    {
        const goToBusListView = () => Actions.departures()

        return (
        <View style={styles.start}>
          <StartButton style={styles.startUpper} onPress={goToBusListView} buttonText={strings.onBus} image={require('../resources/images/rinkeli.png')}/>
          <StartButton style={styles.startLower} buttonText={strings.onStop} image={require('../resources/images/bussi.png')}/>
        </View>)
    }
}

export default StartViewButtons
