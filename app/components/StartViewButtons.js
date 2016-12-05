import React, { Component } from 'react'
import { View, Alert } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import StartButton from './StartButton'
import BluetoothSerial from 'react-native-bluetooth-serial'
import styles from '../styles/stylesheet'
import strings from '../resources/translations'
import { getBeaconData } from '../actions/beaconLocationActions'

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
        // routeStopsView is only allowed if bluetooth is enabled
        const goToRouteStopsView = () =>
        {
            BluetoothSerial.isEnabled()
          .then((enabled) =>
          {
              if (!enabled)
              {
                  Alert.alert('BLUETOOTH is on')
                  BluetoothSerial.enable()
                  .then((success) =>
                  {
                      if (success)
                      {
                          this.props.getBeaconData()
                          Actions.vehicles()
                      }
                      else
                      {
                          Alert.alert('Enable fail')
                      }
                  })
                  .catch((error) => Alert.alert(error))
              }
              else
              {
                  Actions.vehicles()
              }
          })
          .catch((error) => Alert.alert(error))
        }

        return (
        <View style={styles.start}>
          <StartButton style={styles.startUpper} imageStyle={styles.startImageStop} onPress={goToBusListView} buttonText={strings.onStop} image={this.icons.stop} />
          <StartButton style={styles.startLower} imageStyle={styles.startImageVehicle} onPress={goToRouteStopsView} buttonText={strings.onBus} image={this.icons.vehicle} />
        </View>)
    }
}

const mapDispatchToProps = (dispatch) =>
{
    return {
        getBeaconData: () =>
        {
            dispatch(getBeaconData())
        }
    }
}

export default connect(mapDispatchToProps)(StartViewButtons)
