import React, { Component } from 'react';
import { connect } from 'react-redux';

import { DeviceEventEmitter } from 'react-native';
import Beacons from 'react-native-beacons-android';

import { setBeaconData, beaconError, requestBeaconData } from '../actions/beaconLocationActions';

const FOREGROUND_SCAN_PERIOD = 1000;
const BACKGROUND_SCAN_PERIOD = 1000;

class BeaconController extends Component {
  constructor(props) {
    super(props);

    this.state = {
      beaconDetected: false,
      attempts: 0,
    };

    this.beacons = [{
      id: 'ebefd083-70a2-47c8-9837-e7b5634df524',
      latitude: 60.19942,
      longitude: 24.93461,
    }];
  }

  componentWillMount() {
    this.getBeacons();
  }

  async getBeacons() {
    this.props.requestBeaconData();
    Beacons.detectIBeacons();
    Beacons.setForegroundScanPeriod(FOREGROUND_SCAN_PERIOD);
    Beacons.setBackgroundScanPeriod(BACKGROUND_SCAN_PERIOD);

    try {
      await Beacons.startRangingBeaconsInRegion('REGION1', this.beacons[0].id);
    } catch (error) {
      // Continue regardless of error
    }

    // Print a log of the detected iBeacons (1 per 5 second)
    DeviceEventEmitter.addListener('beaconsDidRange', (data) => {
      if (this.state.attempts === 5) {
        Beacons.stopRangingBeaconsInRegion('REGION1', this.beacons[0].id);
        this.props.beaconError('Beacon not found in 5 seconds');
      }
      if (data.beacons.length > 0) {
        if (!this.state.beaconDetected) {
          let closestBeaconIndex = 0;
          let closestBeaconDistance = data.beacons[0].distance;

          for (let beaconIndex = 1; beaconIndex < data.beacons.length; beaconIndex++) {
            if (data.beacons[beaconIndex].distance < closestBeaconDistance) {
              closestBeaconIndex = beaconIndex;
              closestBeaconDistance = data.beacons[beaconIndex].distance;
            }
          }

          const beaconData = {
            major: data.beacons[closestBeaconIndex].major,
            minor: data.beacons[closestBeaconIndex].minor,
          };

          this.props.setBeaconData(beaconData);
          Beacons.stopRangingBeaconsInRegion('REGION1', this.beacons[0].id);
          // alert('Olet pysäkillä Pasilan asema (2181)')
          this.setState({ beaconDetected: true });
        }
      } else if (this.state.beaconDetected) {
        this.setState({ beaconDetected: false });
      }

      this.setState({ attempts: this.state.attempts + 1 });
    });
  }


  render() {
    return null;
  }
}

BeaconController.propTypes = {
  setBeaconData: React.PropTypes.func,
  beaconError: React.PropTypes.func,
  requestBeaconData: React.PropTypes.func,
};

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
  setBeaconData: (beaconData) => {
    dispatch(setBeaconData(beaconData));
  },
  beaconError: (error) => {
    dispatch(beaconError(error));
  },
  requestBeaconData: () => {
    dispatch(requestBeaconData());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(BeaconController);
