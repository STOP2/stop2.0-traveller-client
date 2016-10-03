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
        enableHighAccuracy: true,
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
      {viewElement}
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
