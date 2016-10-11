import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ActivityIndicator, Text, View, TouchableOpacity } from 'react-native'
import { checkPermission, requestPermission } from 'react-native-android-permissions'

import styles from '../styles/stylesheet'
import strings from '../resources/translations'

import StartViewButtons from './StartViewButtons'

import { setLocation } from '../actions/locationActions'

class StartView extends Component {
    constructor(props)
    {
        super(props)

        this.state = {
            locationData: '',
            gotLocation: false,
            locationError: false
        }
    }

    componentWillMount = () =>
    {
        checkPermission('android.permission.ACCESS_FINE_LOCATION').then(() =>
        {
            this.getCurrentLocation()
        }, () =>
        {
            setTimeout(() =>
            {
                requestPermission('android.permission.ACCESS_FINE_LOCATION').then(() =>
            {
                    this.getCurrentLocation()
                }, () =>
            {
                    alert(strings.locationPermissionsError)
                })
          // for the correct StatusBar behaviour with translucent={true} we need to wait a bit and ask for permission after the first render cycle
          // (check https://github.com/facebook/react-native/issues/9413 for more info)
            }, 0)
        })
    }

    getCurrentLocation = () =>
    {
        navigator.geolocation.getCurrentPosition((position) =>
        {
            this.props.setLocation(position.coords)

            this.setState({
                locationData: position.coords,
                gotLocation: true
            })
        },
      () =>
      {
          this.setState(
              {
                  locationData: '',
                  locationError: true
              }
          )
      },
            {
                enableHighAccuracy: false,
                timeout: 20000,
                maximumAge: 1000
            })
    }

    render()
    {
        let viewElement

        if (this.state.locationError) {
            viewElement = <View>
        <Text style={styles.locationErrorText}>{strings.locationError}</Text>
        <TouchableOpacity onPress={this.getCurrentLocation()}><Text style={{
            textAlign: 'center',
            color: '#0000ff'
        }}>{strings.tryAgain}</Text></TouchableOpacity>
        </View>
      } else {
          if (this.state.gotLocation) {
              viewElement = <StartViewButtons />
          } else {
              viewElement = <View><Text style={styles.gettingLocationText}>{strings.gettingLocation}</Text><ActivityIndicator /></View>
          }
      }

        return (
      <View style={styles.start}>
        {viewElement}
      </View>
    )
    }
}

const mapStateToProps = () =>
{
    return {}
}

const mapDispatchToProps = (dispatch) =>
{
    return {
        setLocation: (locationData) =>
        {
            dispatch(setLocation(locationData))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StartView)
