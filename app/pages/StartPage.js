import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ActivityIndicator, View, TouchableOpacity } from 'react-native'

import { DefaultText } from '../components/textComponents'
import styles from '../styles/stylesheet'
import strings from '../resources/translations'

import StartViewButtons from '../components/StartViewButtons'
import AccessibilityView from '../components/AccessibilityView'

import { checkLocationPermissionAndGetLocation } from '../actions/locationActions'

import BeaconController from '../components/BeaconController'

class StartView extends Component {
    constructor(props)
    {
        super(props)
    }

    componentWillMount = () =>
    {
        this.props.getLocation()
    }

    render()
    {
        let viewElement

        if (this.props.locationPermissionError)
        {
            viewElement = <View>
                          <DefaultText style={styles.locationErrorText}>{strings.locationPermissionsError}</DefaultText>
                        </View>
        }
        else if (this.props.locationError)
            {
            viewElement = <View>
                              <DefaultText style={styles.locationErrorText}>{strings.locationError}</DefaultText>
                              <TouchableOpacity onPress={this.props.getLocation}>
                                <DefaultText style={styles.tryAgain}>{strings.tryAgain}</DefaultText>
                              </TouchableOpacity>
                            </View>
        }
        else if (this.props.gettingLocation == false)
        {
            viewElement = <View style={styles.start}><BeaconController /><StartViewButtons /></View>
        }
        else
        {
            viewElement = <View><DefaultText style={styles.gettingLocationText}>{strings.gettingLocation}</DefaultText><ActivityIndicator /></View>
        }


        return (
      <AccessibilityView style={styles.start} name="start">
        {viewElement}
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
            dispatch(checkLocationPermissionAndGetLocation())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StartView)
