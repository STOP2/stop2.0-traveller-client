import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ActivityIndicator, ListView, View, TouchableOpacity, ScrollView } from 'react-native'
import { Actions } from 'react-native-router-flux'

import { DefaultText } from '../components/textComponents'

import StopTitle from '../components/StopTitle'
import BusListHeader from '../components/BusListHeader'
import BusListRow from '../components/BusListRow'

import styles from '../styles/stylesheet'
import strings from '../resources/translations'

import { fetchDepartures } from '../actions/fetchDeparturesActions'

const UPDATE_INTERVAL_IN_SECS = 10

class BusListPage extends Component {
    constructor(props)
    {
        super(props)

        this.state = {dataSources: null}
    }

    componentWillMount = () =>
    {
        this.props.fetchDepartures(this.props.locationData.latitude, this.props.locationData.longitude)

        this.fetchInterval = setInterval(() =>
        {
            if (!this.props.isFetching)
            {
                this.props.fetchDepartures(this.props.locationData.latitude, this.props.locationData.longitude)
            }
        }, UPDATE_INTERVAL_IN_SECS * 1000)
    }

  /* DOESN'T WORK
    componentWillUnmount = () => {
      clearInterval(this.fetchInterval)
  }*/

    componentWillReceiveProps = (nextProps) =>
    {
    // this.props.fetchDepartures(nextProps.locationData.latitude, nextProps.locationData.longitude)
        if (nextProps.stops.length > 0)
        {
            if (!this.state.dataSources)
            {
                let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
                let dataSources = []

                for (let index = 0; index < nextProps.stops.length; index++)
                {
                    dataSources.push({ds: ds.cloneWithRows([])})
                }
                this.setState({dataSources: dataSources})
            }

            let dataSources = this.state.dataSources

            for (let index = 0; index < nextProps.stops.length; index++)
            {
                dataSources[index] = {ds: this.state.dataSources[index].ds.cloneWithRows(nextProps.stops[index].stop.schedule)}
            }

            this.setState({dataSources: dataSources})
        }
    }

    renderRow = (renderData) =>
    {
        const goToStopRequestPage = () =>
        {
            Actions.stopRequest({
                vehicle: renderData,
                stop: {
                    stopName: this.props.stops[0].stop.stop_name,
                    stopId: this.props.stops[0].stop.stop_code
                }
            })
        }

        return (
          <TouchableOpacity accessibilityComponentType="button" onPress={goToStopRequestPage}>
            <BusListRow vehicleType={renderData.vehicle_type} line={renderData.line} destination={renderData.destination} arrival={renderData.arrival} />
          </TouchableOpacity>)
    }

    renderFooter = () =>
    {
        return (
        <View>
          <ActivityIndicator
            animating={this.props.isFetching}
          />
        </View>
        )
    }

    renderList = () =>
    {
        return (
          <View style={styles.flex1}>
          {this.props.error ? <DefaultText style={styles.error}>{strings.backendError}</DefaultText> : null}
          <BusListHeader />
          <ScrollView style={{height: 100}}>
          {this.props.stops.map(function(stop, index)
            {
              return (
                <View key={index}>
                  <StopTitle name={stop.stop.stop_name} line={stop.stop.stop_code} />
                  <ListView
                    enableEmptySections={true}
                    dataSource={this.state.dataSources[index].ds}
                    renderRow={this.renderRow}
                    renderFooter={this.renderFooter}
                  />
                </View>
              )
          }, this)}
          </ScrollView>
          </View>
        )
    }

    renderSpinner = () =>
    {
        return (
          <View style={styles.spinnerContainer}>
            <View style={styles.spinnerBackground}>
              <ActivityIndicator
                size="large"
                animating={true}
              />
            </View>
          </View>
        )
    }

    render()
    {
        if (this.props.isReady)
        {
            return (
              this.renderList()
            )
        }
        else
        {
            return (
              this.renderSpinner()
            )
        }
    }
}

const mapStateToProps = (state) =>
{
    return {
        stops: state.fetchReducer.stops,
        isFetching: state.fetchReducer.isFetching,
        isReady: state.fetchReducer.isReady,
        error: state.fetchReducer.error,
        locationData: state.locationReducer.locationData
    }
}

const mapDispatchToProps = (dispatch) =>
{
    return {
        fetchDepartures: (latitude, longitude) =>
        {
            dispatch(fetchDepartures(latitude, longitude))
        }
    }
}

BusListPage.propTypes = {
    fetchDepartures: React.PropTypes.func.isRequired,
    locationData: React.PropTypes.shape({
        latitude: React.PropTypes.number.isRequired,
        longitude: React.PropTypes.number.isRequired
    }),
    stops: React.PropTypes.array.isRequired,
    isFetching: React.PropTypes.bool.isRequired,
    error: React.PropTypes.bool.isRequired,
    isReady: React.PropTypes.bool.isRequired
}


export default connect(mapStateToProps, mapDispatchToProps)(BusListPage)
