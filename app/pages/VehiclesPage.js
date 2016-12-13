import React, { Component } from 'react';
import { ActivityIndicator, ListView, View, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import { DefaultText } from '../components/textComponents';
import { BoldTitleBar } from '../components/TitleBar';
import AccessibilityView from '../components/AccessibilityView';
import VehicleListRow from '../components/VehicleListRow';

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
      dataSource: ds.cloneWithRows([]),
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
    if (nextProps.scene.name != this.sceneName) return;

    if (this.state.locatingUser) {
      this.checkIfLocationExists(nextProps);
    } else {
      if (!this.fetchInterval) {
        this.checkIfLocationExists(nextProps);
      }

      if (nextProps.vehicles.length > 0) {
        const vehicles = JSON.parse(JSON.stringify(nextProps.vehicles));

        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(vehicles),
        });
      }
    }
  }

  renderRow = (renderData) => {
    const goToRouteStopsPage = () => {
      clearInterval(this.fetchInterval);
      this.fetchInterval = false;

      Actions.routeStops({ vehicle: renderData });
    };

    return (
      <TouchableOpacity accessibilityComponentType="button" onPress={goToRouteStopsPage}>
        <VehicleListRow
          vehicleType={renderData.vehicle_type}
          line={renderData.line}
          destination={renderData.destination}
        />
      </TouchableOpacity>);
  }

  renderSeparator = () =>
     (<View style={styles.rowSeparator} />)


  renderFooter = () =>
     (
       <View>
         <ActivityIndicator animating={this.props.gettingBeaconData} />
       </View>
      )


  renderList = () =>
    (
      <View style={styles.flex1}>
        <ListView
          enableEmptySections
          dataSource={this.state.dataSource}
          renderRow={this.renderRow}
          renderFooter={this.renderFooter}
          renderSeparator={this.renderSeparator}
        />
      </View>)


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

  render() {
    let viewElement

    if (!this.state.locatingUser && this.props.vehiclesReady) {
      viewElement = this.renderList();
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
}

const mapStateToProps = state =>
   ({
     beaconData: state.beacons.vehicleBeaconData,
     gettingBeaconData: state.beacons.gettingVehicleBeaconData,
     beaconError: state.beacons.vehicleBeaconError,
     scene: state.routes.scene,
     vehicles: state.vehicles.vehicles,
     vehiclesReady: state.vehicles.isReady,
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
