import React, { Component } from 'react'
import { View } from 'react-native'
import { Actions } from 'react-native-router-flux'
import StartButton from './StartButton'

import styles from '../styles/stylesheet'
import strings from '../resources/translations'

class StartViewButtons extends Component {
    constructor()
    {
        super()

        this.icons = {
            stop: require('../resources/images/rinkeli.png'),
            vehicle: require('../resources/images/bussi.png')
        }
    }

    render()
    {
        const goToBusListView = () => Actions.departures()
        const goToRouteStopsView = () => null

        return (
        <View style={styles.start}>
          <StartButton style={styles.startUpper} imageStyle={styles.startImageStop} onPress={goToBusListView} buttonText={strings.onStop} image={this.icons.stop} />
          <StartButton style={styles.startLower} imageStyle={styles.startImageVehicle} onPress={goToRouteStopsView} buttonText={strings.onBus} image={this.icons.vehicle} />
        </View>)
    }
}

export default StartViewButtons
