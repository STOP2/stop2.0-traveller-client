import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ActivityIndicator, View, TouchableOpacity } from 'react-native'
import { checkPermission, requestPermission } from 'react-native-android-permissions'

import { DefaultText } from '../components/textComponents'
import styles from '../styles/stylesheet'
import strings from '../resources/translations'

import StartButton from '../components/StartButton'

import { setLocation } from '../actions/locationActions'

class StartView extends Component {
    constructor(props)
    {
        super(props)

        this.state = {
            locationData: '',
            gotLocation: false,
            locationPermissionsError: false,
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

    goToBusListView = () =>
    {
        this.props.navigator.push({id: 'BusListPage'})
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
                    viewElement = <View style={styles.start}>
                                  <StartButton style={styles.startUpper} imageStyle={styles.startImageStop} onPress={this.goToBusListView} buttonText={strings.onStop} image={require('../resources/images/rinkeli.png')}/>
                                  <StartButton style={styles.startLower} imageStyle={styles.startImageVehicle} buttonText={strings.onBus} image={require('../resources/images/bussi.png')}/>
                                  </View>
                }
                else
             {
                    viewElement = <View><DefaultText style={styles.gettingLocationText}>{strings.gettingLocation}</DefaultText><ActivityIndicator /></View>
                }
            }
        }

        return (
      <View style={styles.start}>
        {viewElement}
      </View>
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
