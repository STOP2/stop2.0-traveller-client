import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ActivityIndicator, View, TouchableOpacity, PermissionsAndroid } from 'react-native'
import { DefaultText } from '../components/textComponents'
import styles from '../styles/stylesheet'
import strings from '../resources/translations'

import StartViewButtons from '../components/StartViewButtons'
import AccessibilityView from '../components/AccessibilityView'

import { getLocation } from '../actions/locationActions'
import BeaconController from '../components/BeaconController'

class StartView extends Component {
    constructor()
    {
        super()

        this.state = {locationPermissionsError: false}
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
                this.props.getLocation()
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
        this.requestLocationPermission()
    }

    render()
    {
        return (
            <AccessibilityView style={styles.start} name="start">
                <StartViewButtons />
            </AccessibilityView>
        )
    }
}

StartView.propTypes = {
    gettingLocation: React.PropTypes.bool.isRequired,
    locationError: React.PropTypes.string,
    locationPermissionError: React.PropTypes.string,
    getLocation: React.PropTypes.func.isRequired
}

const mapStateToProps = (state) =>
{
    return {
        gettingLocation: state.locationReducer.gettingLocation,
        locationError: state.locationReducer.error,
        locationPermissionError: state.locationReducer.locationPermissionError
    }
}

const mapDispatchToProps = (dispatch) =>
{
    return {
        getLocation: () =>
        {
            dispatch(getLocation())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StartView)
