import React, { Component } from 'react';
import { View, Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import BluetoothSerial from 'react-native-bluetooth-serial';
import StartButton from './StartButton';
import styles from '../styles/stylesheet';
import strings from '../resources/translations';
import { getBeaconData } from '../actions/beaconLocationActions';
import { getGpsLocation, clearWatchLocation } from '../actions/gpsLocationActions';
import { resetState } from '../actions/resetStateAction';

class StartViewButtons extends Component {
  constructor() {
    super();

    this.icons = {
      stop: require('../resources/images/rinkeli.png'),
      vehicle: require('../resources/images/bussi.png'),
    };
  }

  componentWillReceiveProps = (props) => {
    if (props.scene.name === 'start') {
      this.props.resetState();
      this.props.getGpsLocation();
      this.props.getBeaconData();
    }
  }

  render() {
    const goToBusListView = () => {
      Actions.departures();
    };
    // routeStopsView is only allowed if bluetooth is enabled
    const goToRouteStopsView = () => {
      BluetoothSerial.isEnabled()
      .then((enabled) => {
        if (!enabled) {
          Alert.alert('BLUETOOTH is on');
          BluetoothSerial.enable()
          .then((success) => {
            if (success) {
              this.props.getBeaconData();
              this.props.clearWatchLocation();
              Actions.vehicles();
            }
            else { Alert.alert('Enable fail') }
          })
          .catch((error) => Alert.alert(error))
        } else {
          this.props.getBeaconData();
          this.props.clearWatchLocation();
          Actions.vehicles();
        }
      })
      .catch((error) => Alert.alert(error))
    };

    return (
      <View style={styles.start}>
        <StartButton
          style={styles.startUpper}
          imageStyle={styles.startImageStop}
          onPress={goToBusListView}
          buttonText={strings.onStop}
          image={this.icons.stop}
        />
        <StartButton
          style={styles.startLower}
          imageStyle={styles.startImageVehicle}
          onPress={goToRouteStopsView}
          buttonText={strings.onBus}
          image={this.icons.vehicle}
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return { scene: state.routes.scene }
};

const mapDispatchToProps = (dispatch) => {
  return {
    getBeaconData: () => {
      dispatch(getBeaconData());
    },
    getGpsLocation: () => {
      dispatch(getGpsLocation());
    },
    clearWatchLocation: () => {
      dispatch(clearWatchLocation());
    },
    resetState: () => {
      dispatch(resetState());
    },
  };
};

StartViewButtons.propTypes = {
  getBeaconData: React.PropTypes.func.isRequired,
  getGpsLocation: React.PropTypes.func.isRequired,
  clearWatchLocation: React.PropTypes.func.isRequired,
  resetState: React.PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(StartViewButtons);
