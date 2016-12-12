import React, { Component } from 'react';
import { ActivityIndicator, ListView, View } from 'react-native';
import { connect } from 'react-redux';

import { DefaultText } from '../components/textComponents';
import { BoldTitleBar } from '../components/TitleBar';
import AccessibilityView from '../components/AccessibilityView';

import styles from '../styles/stylesheet';
import strings from '../resources/translations';

import { fetchVehicles } from '../actions/fetchVehiclesActions';

const UPDATE_INTERVAL_IN_SECS = 10;

class VehiclesPage extends Component {

  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
    });

    this.state = {
      dataBlob: {},
      dataSource: ds.cloneWithRowsAndSections({}, []),
      vehicles: [],
      stopCount: 0,
      locatingUser: true,
    };
    this.sceneName = 'vehicles';
  }

  componentWillMount = () => {
    this.checkIfLocationExists(this.props);
  }
  componentWillUnmount = () => {
    clearInterval(this.fetchInterval);
    this.fetchInterval = false;
  }

  createInterval = (props) => {
    this.fetchInterval = setInterval(() => {
      if (!props.isFetchingVehicles) {
        props.fetchVehicles(props.beaconData);
      }
    }, UPDATE_INTERVAL_IN_SECS * 1000);
  }

  checkIfLocationExists(props) {
    if (props.gettingBeaconData == false && props.beaconError == null) {
      console.log('####################!!!!##################');
      console.log(props.beaconData);
      props.fetchVehicles(props.beaconData);
      this.createInterval(props, true);
      this.setState({ locatingUser: false });
    } else if (props.gettingBeaconData == false && props.beaconError != null) {
      console.log('beacon fetch errored');
    } else {
      return false;
    }
  }

  componentWillReceiveProps = (nextProps) => {
    console.log('VEHICLES:');
    console.log(this.state.vehicles);
    console.log(nextProps.vehicles);
    if (nextProps.scene.name != this.sceneName) return;

    if (this.state.locatingUser) {
      this.checkIfLocationExists(nextProps);
    } else {
      if (!this.fetchInterval) {
              //  this.props.getGpsLocation()
              //  this.checkIfLocationExists(nextProps)
      }

      if (nextProps.stops.length > 0) {
        const tempDataBlob = Object.assign({}, this.state.dataBlob);
        const stopsTemp = this.state.stops;
        const sections = [];

        for (let index = 0; index < nextProps.stops.length; index++) {
          const sectionID = nextProps.stops[index].stop.stop_id;

          sections.push(sectionID);
          tempDataBlob[sectionID] = nextProps.stops[index].stop.schedule;

          stopsTemp[nextProps.stops[index].stop.stop_id] = nextProps.stops[index].stop;
        }
        this.setState({
          dataBlob: tempDataBlob,
          dataSource: this.state.dataSource.cloneWithRowsAndSections(tempDataBlob, sections),
          stops: stopsTemp,
          stopCount: nextProps.stops.length,
        });
      }
    }
  }

  render() {
    let viewElement;

    if (!this.state.locatingUser) // fetchingVehicles
        {
      viewElement = (<DefaultText>stop beacon:{'\n'}
        {this.props.beaconData[0].major}
        {this.props.beaconData[0].minor}
      </DefaultText>);
    } else if (this.props.beaconError != null) {
      viewElement = this.renderFetchError();
    } else if (this.state.locatingUser) {
      viewElement = this.renderSpinner(strings.gettingLocation);
    } else {
      viewElement = this.renderSpinner(strings.loadingDepartures);
    }

    return (
      <AccessibilityView style={styles.flex1} name={this.sceneName}>
        <BoldTitleBar title={strings.nearestVehicles} noBorder />
        {viewElement}
      </AccessibilityView>
    );
  }

  renderSeparator = (sectionID, rowID) =>

         (<View key={`${sectionID}-${rowID}`} style={styles.rowSeparator} />)


  renderFetchError = () =>

         (
           <View style={styles.spinnerContainer}>
             <View style={styles.spinnerBackground}>
               <DefaultText style={styles.fetchDeparturesError}>
                 {strings.fetchDeparturesError}
               </DefaultText>
             </View>
           </View>
        )

  renderSpinner = text =>

         (
           <View style={styles.spinnerContainer}>
             <View style={styles.spinnerBackground}>
               <DefaultText style={styles.loadingDeparturesText}>
                 {text}
               </DefaultText>
               <ActivityIndicator
                 size="large"
                 animating
               />
             </View>
           </View>
        )

  }

const mapStateToProps = state =>
   ({
     beaconData: state.beacons.vehicleBeaconData,
     gettingBeaconData: state.beacons.gettingVehicleBeaconData,
     beaconError: state.beacons.vehicleBeaconError,
     scene: state.routes.scene,
     vehicles: state.vehicles.vehicles,
   })
;

const mapDispatchToProps = dispatch =>
     ({

       fetchVehicles: (beaconData) => {
         dispatch(fetchVehicles(beaconData));
       },
     })
  ;

export default connect(mapStateToProps, mapDispatchToProps)(VehiclesPage);
