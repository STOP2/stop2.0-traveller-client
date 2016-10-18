import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ActivityIndicator, ListView, View, TouchableOpacity } from 'react-native'
import { Actions } from 'react-native-router-flux'

import TitleBar from '../components/TitleBar'
import {DefaultText} from '../components/textComponents'
import BusListRow from '../components/BusListRow'

import styles from '../styles/stylesheet'
import strings from '../resources/translations'

import { fetchRouteStops } from '../actions/fetchRouteStops'


class RouteStopsPage extends Component {
    constructor(props)
    {
        super(props)

        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})

        this.state = {dataSource: ds.cloneWithRows([])}
    }

    componentWillMount = () =>
    {
        console.log(this.props.tripId)
        console.log(this.props.stopId)
        this.props.fetchRouteStops(this.props.tripId, this.props.stopId)
    }

    componentWillReceiveProps = (nextProps) =>
    {
      console.log(nextProps.stops)
        //this.setState({dataSource: this.state.dataSource.cloneWithRows(nextProps.stops)})
    }

    renderRow = (renderData) =>
    {
        const goToStopVehicleRequestPage = () =>
        {
            Actions.stopRequest({

            })
        }

        return (
          <TouchableOpacity onPress={goToStopVehicleRequestPage}>
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
            <TitleBar title={strings.title} />
            {this.props.error ? <DefaultText style={styles.error}>{strings.backendError}</DefaultText> : null}
            <ListView
              enableEmptySections={true}
              dataSource={this.state.dataSource}
              renderRow={this.renderRow}
              renderFooter={this.renderFooter}
            />
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
        if (this.props.routeIsReady)
        {
            return (
              //this.renderList()
              <View>
                <DefaultText>{this.props.stops}</DefaultText>
              </View>
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
        stop: state.fetchReducer.stop,
        isFetching: state.fetchReducer.isFetching,
        routeIsReady: state.fetchReducer.routeIsReady,
        error: state.fetchReducer.error
    }
}

const mapDispatchToProps = (dispatch) =>
{
    return {
        fetchRouteStops: (tripId, BusId) =>
        {
            dispatch(fetchRouteStops(tripId, BusId))
        }
    }
}

RouteStopsPage.propTypes = {
    fetchRouteStops: React.PropTypes.func.isRequired,
    isFetching: React.PropTypes.bool.isRequired,
    routeIsReady: React.PropTypes.bool.isRequired,
    tripId: React.PropTypes.string.isRequired,
    stopId: React.PropTypes.string.isRequired,
    error: React.PropTypes.boolean
}


export default connect(mapStateToProps, mapDispatchToProps)(RouteStopsPage)
