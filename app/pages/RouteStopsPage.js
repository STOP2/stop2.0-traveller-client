import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ActivityIndicator, ListView, View, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';

import { TitleBar, BoldTitleBar } from '../components/TitleBar';
import { DefaultText } from '../components/textComponents';
import RouteStopsRow from '../components/RouteStopsRow';
import AccessibilityView from '../components/AccessibilityView';
import { RouteListHeader } from '../components/BusListHeader';

import styles from '../styles/stylesheet';
import strings from '../resources/translations';

import { fetchRouteStops } from '../actions/fetchRouteStops';

const UPDATE_INTERVAL_IN_SECS = 10;

class RouteStopsPage extends Component {
  constructor() {
    super();

    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

    this.state = {
      dataSource: ds.cloneWithRows([]),
    };

    this.sceneName = 'routeStops';
  }

  createInterval = (props) => {
    this.fetchInterval = setInterval(() => {
      if (!props.isFetchingStops) {
        props.fetchRouteStops(props.vehicle.trip_id);
      }
    }, UPDATE_INTERVAL_IN_SECS * 1000);
  }

  componentWillMount = () => {
    this.props.fetchRouteStops(this.props.vehicle.trip_id);
    this.createInterval(this.props);
  }

  componentWillUnmount = () => {
    clearInterval(this.fetchInterval);
    this.fetchInterval = false;
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.scene.name != this.sceneName) return;

    if (!this.fetchInterval) this.createInterval(this.props);

    const rawData = JSON.parse(JSON.stringify(nextProps.routeStops));
    let beforeCurrent = true;

    for (const index in rawData) {
      if (beforeCurrent || rawData[index].arrives_in < 0) {
        if (this.props.stop && rawData[index].stop_code == this.props.stop.stopCode) {
          beforeCurrent = false;
        }
        delete rawData[index];
      } else if (rawData[index].arrives_in == 0) {
        rawData[index].arrives_in = strings.now;
      } else {
        rawData[index].arrives_in += ' min';
      }
    }
    this.setState({ dataSource: this.state.dataSource.cloneWithRows(rawData) });
  }

  renderRow = (renderData) => {
    const goToStopVehicleRequestPage = () => {
      clearInterval(this.fetchInterval);
      this.fetchInterval = false;

      Actions.routeStopRequest({
        stop: {
          stopName: renderData.stop_name,
          stopCode: renderData.stop_code,
          stopId: renderData.stop_id,
        },
      });
    };

    return (
      <TouchableOpacity accessibilityComponentType="button" onPress={goToStopVehicleRequestPage}>
        <RouteStopsRow stopId={renderData.stop_code} stopName={renderData.stop_name} arrivalTime={renderData.arrives_in} />
      </TouchableOpacity>);
  }

  renderSeparator = () =>

         (<View style={styles.rowSeparator} />)


  renderFooter = () =>

         (
           <View>
             <ActivityIndicator
               animating={this.props.isFetchingStops}
             />
           </View>
        )


  renderList = () =>

         (
           <View style={styles.flex1}>
             <TitleBar title={`${this.props.vehicle.line} ${this.props.vehicle.destination}`} />
             {this.props.errorFetchingStops ? <DefaultText style={styles.error}>{strings.backendError}</DefaultText> : null}
             <RouteListHeader />
             <ListView
               enableEmptySections
               dataSource={this.state.dataSource}
               renderRow={this.renderRow}
               renderFooter={this.renderFooter}
               renderSeparator={this.renderSeparator}
             />
           </View>
        )


  renderSpinner = () =>

         (
           <View style={styles.spinnerContainer}>
             <View style={styles.spinnerBackground}>
               <ActivityIndicator
                 size="large"
                 animating
               />
             </View>
           </View>
        )


  render() {
    let viewElement;

    if (this.props.routeIsReady) {
      viewElement = this.renderList();
    } else if (this.props.errorFetchingStops) {
      viewElement = (
        <View style={styles.spinnerContainer}>
          <View style={styles.spinnerBackground}>
            <DefaultText style={styles.fetchDeparturesError}>
              {strings.fetchDeparturesError}
            </DefaultText>
          </View>
        </View>);
    } else {
      viewElement = this.renderSpinner();
    }

    return (<AccessibilityView name={this.sceneName} style={styles.flex1}>
      <BoldTitleBar title={strings.routeStops} />
      {viewElement}
    </AccessibilityView>);
  }
}

const mapStateToProps = (state, ownprops) => ({
  routeStops: state.routeStops.routeStops,
  isFetchingStops: state.routeStops.isFetchingStops,
  routeIsReady: state.routeStops.routeIsReady,
  errorFetchingStops: state.routeStops.errorFetchingStops,
  scene: state.routes.scene,
  vehicle: ownprops.vehicle ? ownprops.vehicle : state.stopRequest.currentVehicle,
  stop: state.stopRequest.startStop,
});

const mapDispatchToProps = dispatch =>
   ({
     fetchRouteStops: (tripId) => {
       dispatch(fetchRouteStops(tripId));
     },
   });

RouteStopsPage.propTypes = {
  fetchRouteStops: React.PropTypes.func.isRequired,
  isFetchingStops: React.PropTypes.bool.isRequired,
  routeIsReady: React.PropTypes.bool.isRequired,
  errorFetchingStops: React.PropTypes.bool,
  stop: React.PropTypes.object.isRequired,
  vehicle: React.PropTypes.object.isRequired,
  scene: React.PropTypes.object.isRequired,
};


export default connect(mapStateToProps, mapDispatchToProps)(RouteStopsPage);
