import React, { Component } from 'react'
import { connect } from 'react-redux'
import { PermissionsAndroid } from 'react-native'
import styles from '../styles/stylesheet'
import strings from '../resources/translations'

import StartViewButtons from '../components/StartViewButtons'
import AccessibilityView from '../components/AccessibilityView'

import { resetState } from '../actions/resetStateAction'
import { getGpsLocation } from '../actions/gpsLocationActions'
import { getBeaconData } from '../actions/beaconLocationActions'

class StartView extends Component {
    constructor()
    {
        super()

        this.state = {locationPermissionsError: false}

        this.sceneName = 'start'
    }

    async requestLocationPermission()
    {
        try
        {
            const granted = await PermissionsAndroid.requestPermission(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    'title': strings.locationPermissionTitle,
                    'message': strings.locationPermissionMessage
                }
            )

            if (granted)
            {
                this.props.getGpsLocation(navigator.geolocation.getCurrentPosition)
            }
            else
            {
                this.setState({locationPermissionsError: true})
            }
        }
        catch (error)
        {
            this.setState({locationError: true})
        }
    }

    componentWillMount = () =>
    {
        this.props.resetState()
        this.requestLocationPermission()
        this.props.getBeaconData()
    }

    render()
    {
        return (
            <AccessibilityView style={styles.start} name={this.sceneName}>
                <StartViewButtons />
            </AccessibilityView>
        )
    }
}

StartView.propTypes = {
    gettingGpsLocation: React.PropTypes.bool.isRequired,
    locationError: React.PropTypes.string,
    locationPermissionError: React.PropTypes.string,
    getGpsLocation: React.PropTypes.func.isRequired,
    getBeaconData: React.PropTypes.func.isRequired,
    resetState: React.PropTypes.func.isRequired
}

const mapStateToProps = (state) =>
{
    return {
        gettingGpsLocation: state.gpsLocation.gettingGpsLocation,
        locationError: state.gpsLocation.error,
        locationPermissionError: state.gpsLocation.locationPermissionError
    }
}

const mapDispatchToProps = (dispatch) =>
{
    return {
        getGpsLocation: () =>
        {
            dispatch(getGpsLocation(navigator.geolocation.getCurrentPosition))
        },
        getBeaconData: () =>
        {
            dispatch(getBeaconData())
        },
        resetState: () =>
        {
            dispatch(resetState())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StartView)
