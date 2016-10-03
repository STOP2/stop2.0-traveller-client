import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ActivityIndicator, Text, ListView, View, TouchableOpacity, Image } from 'react-native'
import { Actions } from 'react-native-router-flux'

import styles from '../styles/stylesheet'
import strings from '../resources/translations'

import { fetchDepartures } from '../actions/fetchDeparturesActions'

class BusListView extends Component{
  constructor(props) {
    super(props)

    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})

    let stopData = {
      stopId: 3029,
      stopName: 'Kumpulan kampus'
    }

    this.state = {
      dataSource: ds.cloneWithRows([]),
      stop: stopData
    }

    this.icon_tram = require('../resources/icons/hsl_reittiopas_tram.png')
    this.icon_bus = require('../resources/icons/hsl_reittiopas_bus.png')
  }

  componentWillMount = () => {
        this.props.fetchDepartures(this.props.locationData.latitude, this.props.locationData.longitude)
  }

  componentWillReceiveProps = (nextProps) => {
    this.props.fetchDepartures(nextProps.locationData.latitude, nextProps.locationData.longitude)

    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(nextProps.stop.schedule)
    })
  }

  renderRow = (renderData) => {
    const goToStopRequestPage = () => {
      Actions.stopRequest({vehicle: renderData, stop: {stopName: this.props.stop.stop_name, stopId: this.props.stop.stop_code}})
    }

    const vehicleTypes = 'tram metro train bus ferry'.split(' ')

    return (
      <TouchableOpacity onPress={goToStopRequestPage}>
        <View style={styles.busrow}>
          <View style={{flex:1}}>
            {(renderData.vehicle_type == 1 || renderData.vehicle_type == 2 || renderData.vehicle_type == 4) ?
            <Text>strings[vehicleTypes[this.props.vehicle.vehicle_type]]</Text> :
            <Image style={{width: 18, height: 18, marginLeft: 5}} resizeMode="contain"
            source={renderData.vehicle_type == 0 ? this.icon_tram : this.icon_bus}/>}
          </View>
          <Text style={{flex:1}}>{renderData.line}</Text>
          <Text style={{flex:4, color:'black'}}>{renderData.destination}</Text>
          <Text style={{flex:1, color:'black'}}>{renderData.arrival} min</Text>
        </View>
      </TouchableOpacity>
    )
  }

  renderHeader() {
    return (
      <View style={styles.busrowheader}>
        <Text style={{flex:1}}>{strings.type}</Text>
        <Text style={{flex:1}}>{strings.line}</Text>
        <Text style={{flex:4}}>{strings.dest}</Text>
        <Text style={{flex:1}}>{strings.leaves}</Text>
      </View>
    )
  }

  renderFooter = () => {
    return (
        <View>
        <ActivityIndicator
          animating={this.props.isFetching}
        />
      </View>
    )
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <Text style={styles.title}>{strings.title} {this.props.stop.stop_name} ({this.props.stop.stop_code})</Text>
        <ListView
          dataSource={this.state.dataSource}
          renderHeader={this.renderHeader}
          renderRow={this.renderRow}
          renderFooter={this.renderFooter}
        />
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    stop: state.fetchReducer.stop,
    isFetching: state.fetchReducer.isFetching,
    locationData: state.locationReducer.locationData
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      fetchDepartures: (latitude, longitude) => {
        dispatch(fetchDepartures(latitude, longitude))
      }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BusListView);
