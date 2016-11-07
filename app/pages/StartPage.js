import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ActivityIndicator, View, TouchableOpacity } from 'react-native'
import { checkPermission, requestPermission } from 'react-native-android-permissions'

import { DefaultText } from '../components/textComponents'
import styles from '../styles/stylesheet'
import strings from '../resources/translations'

import StartViewButtons from '../components/StartViewButtons'
import AccessibilityView from '../components/AccessibilityView'

import { setLocation } from '../actions/locationActions'

import { DeviceEventEmitter } from 'react-native'
import Beacons from 'react-native-beacons-android'

class StartView extends Component {
    constructor(props)
    {
        super(props)

        this.state = {
            locationData: '',
            gotLocation: false,
            locationPermissionsError: false,
            locationError: false,
            beaconDetected: false
        }
    }

    async getBeacons() {
        Beacons.setForegroundScanPeriod(5000)
        Beacons.setBackgroundScanPeriod(5000)

        try {
            await Beacons.startRangingBeaconsInRegion('REGION1', 'ebefd083-70a2-47c8-9837-e7b5634df524')
            console.log(`Beacons ranging started succesfully!`)
        } catch (err) {
            console.log(`Beacons ranging not started, error: ${error}`)
        }

        // Print a log of the detected iBeacons (1 per second)
        DeviceEventEmitter.addListener('beaconsDidRange', (data) => {
            console.log(data)
            if(data.beacons.length > 0) {
                if(!this.state.beaconDetected) {
                    this.props.setLocation({latitude: 60.19942, longitude: 24.93461})

                    this.setState({
                        locationData: {latitude: 60.19942, longitude: 24.93461},
                        gotLocation: true
                    })
                    alert('Olet pysäkillä Pasilan asema (2181)')
                }
                this.setState({beaconDetected: true})
            } else {
                if(this.state.beaconDetected)
                    alert('Poistuit pysäkiltä Pasilan asema (2181)')
                this.setState({beaconDetected: false})
            }
        })
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
                    this.setState({locationPermissionsError: true})
                })
          // for the correct StatusBar behaviour with translucent={true} we need to wait a bit and ask for permission after the first render cycle
          // (check https://github.com/facebook/react-native/issues/9413 for more info)
            }, 0)
        })
    }

    getCurrentLocation = () =>
    {
        this.setState({locationError: false})

        navigator.geolocation.getCurrentPosition((position) =>
        {
            this.props.setLocation(position.coords)

            this.setState({
                locationData: position.coords,
                gotLocation: true
            })

            Beacons.detectIBeacons()
            this.getBeacons()
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

        if (this.state.locationPermissionsError)
        {
            viewElement = <View>
                          <DefaultText style={styles.locationErrorText}>{strings.locationPermissionsError}</DefaultText>
                        </View>
        }
        else
        {
            if (this.state.locationError)
          {
                viewElement = <View>
                              <DefaultText style={styles.locationErrorText}>{strings.locationError}</DefaultText>
                              <TouchableOpacity onPress={this.getCurrentLocation}>
                                <DefaultText style={styles.tryAgain}>{strings.tryAgain}</DefaultText>
                              </TouchableOpacity>
                            </View>
            }
            else
          {
                if (this.state.gotLocation)
             {
                    viewElement = <StartViewButtons />
                }
                else
             {
                    viewElement = <View><DefaultText style={styles.gettingLocationText}>{strings.gettingLocation}</DefaultText><ActivityIndicator /></View>
                }
            }
        }

        return (
      <AccessibilityView style={styles.start} name="start">
        {viewElement}
      </AccessibilityView>
    )
    }
}

StartView.propTypes = {
    coords: React.PropTypes.object,
    setLocation: React.PropTypes.func.isRequired
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
