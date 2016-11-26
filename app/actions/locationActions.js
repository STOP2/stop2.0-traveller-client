import Beacons from 'react-native-beacons-android'
import { DeviceEventEmitter } from 'react-native'

export const SET_LOCATION = 'SET_LOCATION'
export const LOCATION_ERROR = 'LOCATION_ERROR'
export const REQUEST_LOCATION = 'REQUEST_LOCATION'

const FOREGROUND_SCAN_PERIOD = 1000
const BACKGROUND_SCAN_PERIOD = 1000
const BEACON_ID = 'ebefd083-70a2-47c8-9837-e7b5634df524'

let beaconDetected = false
let attempts = 0


export let setLocation = function(locationData)
{
    return {
        type: SET_LOCATION,
        gettingLocation: false,
        locationData: locationData
    }
}

export let requestLocation = function()
{
    return {
        type: REQUEST_LOCATION,
        gettingLocation: true
    }
}

export let locationError = function(error)
{
    return {
        type: LOCATION_ERROR,
        error: error
    }
}

export let getLocation = function()
{
    return dispatch =>
   {
        dispatch(requestLocation())
        navigator.geolocation.getCurrentPosition((position) =>
        {
            dispatch(setLocation(position.coords))
        },
           (error) =>
           {
               dispatch(locationError(error))
           },
            {
                enableHighAccuracy: false,
                timeout: 60000,
                maximumAge: 1000
            })
    }
}

export let getBeacons = function()
{
    Beacons.detectIBeacons()
    Beacons.setForegroundScanPeriod(FOREGROUND_SCAN_PERIOD)
    Beacons.setBackgroundScanPeriod(BACKGROUND_SCAN_PERIOD)

    try
    {
        await Beacons.startRangingBeaconsInRegion('REGION1', this.beacons[0].id)
        console.log('Beacons ranging started succesfully!')
    }
    catch (error)
    {
        console.log(`Beacons ranging not started, error: ${error}`)
    }

    // Print a log of the detected iBeacons (1 per 5 second)
    DeviceEventEmitter.addListener('beaconsDidRange', (data) =>
    {
        console.log(data)
        console.log("yritykset" + this.state.attempts)
        if (this.state.attempts == 5)
{
            Beacons.stopRangingBeaconsInRegion('REGION1', this.beacons[0].id)
        }
        if (data.beacons.length > 0)
        {
            if (!this.state.beaconDetected)
            {
                this.props.setLocation({latitude: this.beacons[0].latitude, longitude: this.beacons[0].longitude})
                Beacons.stopRangingBeaconsInRegion('REGION1', this.beacons[0].id)
                alert('Olet pysäkillä Pasilan asema (2181)')
                this.setState({beaconDetected: true})
            }
        }
        else
        {
            if (this.state.beaconDetected)
                alert('Poistuit pysäkiltä Pasilan asema (2181)')
            this.setState({beaconDetected: false})
        }
        this.setState({attempts: this.state.attempts++})
    })
}
