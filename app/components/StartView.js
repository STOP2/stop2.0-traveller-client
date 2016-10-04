import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ActivityIndicator, Text, ListView, View, TouchableOpacity } from 'react-native'


import styles from '../styles/stylesheet'
import strings from '../resources/translations'

import StartViewButtons from './StartViewButtons'

import { setLocation } from '../actions/locationActions'

class StartView extends Component{
  constructor(props) {
    super(props)

    this.state = {
      locationData: '',
      gotLocation: false,
      locationError: false
    }

    this.getCurrentLocation()
  }

  getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) =>
      {
        this.props.setLocation(position.coords)
        this.setState({locationData: position.coords, gotLocation: true})
      },
      (error) =>
      {
        this.setState({locationData: '', locationError: true})
      },
      {
        enableHighAccuracy: false,
        timeout: 20000,
        maximumAge: 1000
      })
  }

  render() {
    let viewElement

    if(this.state.locationError) {
        viewElement = <View>
        <Text style={styles.locationErrorText}>{strings.locationError}</Text>
        <TouchableOpacity onPress={this.getCurrentLocation()}><Text style={{textAlign: 'center', color: '#0000ff'}}>{strings.tryAgain}</Text></TouchableOpacity>
        </View>
    } else {
      if(this.state.gotLocation) {
        viewElement = <StartViewButtons />
      } else {
        viewElement = <View><Text style={styles.gettingLocationText}>{strings.gettingLocation}</Text><ActivityIndicator /></View>
      }
    }

    return (
      <View style={styles.start}>
<<<<<<< HEAD
        {viewElement}
=======
        <TouchableOpacity style={styles.startUpper} onPress={goToBusListView}>
          <Image style={styles.startImageStop} source={require('../resources/images/rinkeli.png')}></Image>
          <Text style={styles.startText}>{strings.onStop}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.startLower}>
          <Image style={styles.startImageVehicle} source={require('../resources/images/bussi.png')}></Image>
          <Text style={styles.startText}>{strings.onBus}</Text>
        </TouchableOpacity>
>>>>>>> 103d3688af69689566a1ac134e14837cc46d6f56
      </View>
    )
  }
}
const mapStateToProps = (state) => {
  return {

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      setLocation: (locationData) => {
        dispatch(setLocation(locationData))
      }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StartView);
