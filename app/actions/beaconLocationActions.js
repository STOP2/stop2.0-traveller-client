import Beacons from 'react-native-beacons-android'
import { DeviceEventEmitter } from 'react-native'

export const SET_BEACON_DATA = 'SET_BEACON_DATA'
export const BEACON_ERROR = 'BEACON_ERROR'
export const REQUEST_BEACON_DATA = 'REQUEST_BEACON_DATA'

const FOREGROUND_SCAN_PERIOD = 1000
const BACKGROUND_SCAN_PERIOD = 1000

let beacons = [{
    id: 'ebefd083-70a2-47c8-9837-e7b5634df524',
    latitude: 60.19942,
    longitude: 24.93461
}]

let beaconDetected = false
let attempts = 0

export let setBeaconData = function(beaconData)
{
    return {
        type: SET_BEACON_DATA,
        beaconData: beaconData,
        gettingBeaconData: false
    }
}

export let setBusBeaconData = function(beaconData)
{
    return {
        type: SET_BEACON_DATA,
        beaconData: beaconData,
        gettingBeaconData: false
    }
}

export let requestBeaconData = function()
{
    return {
        type: REQUEST_BEACON_DATA,
        gettingBeaconData: true
    }
}

export let beaconError = function(error)
{
    return {
        type: BEACON_ERROR,
        beaconError: error,
        gettingBeaconData: false
    }
}

export let getBeaconData = function(dispatch)
{
    return dispatch =>
    {
        getData(dispatch)
        dispatch(requestBeaconData())
    }
}

let getData = async function(dispatch)
{
    Beacons.detectIBeacons()
    Beacons.setForegroundScanPeriod(FOREGROUND_SCAN_PERIOD)
    Beacons.setBackgroundScanPeriod(BACKGROUND_SCAN_PERIOD)

    try
    {
        await Beacons.startRangingBeaconsInRegion('REGION1', beacons[0].id)
    }
    catch (error)
    {
    }

  // Print a log of the detected iBeacons (1 per 5 second)
    DeviceEventEmitter.addListener('beaconsDidRange', (data) =>
    {
        if (attempts == 5)
        {
            Beacons.stopRangingBeaconsInRegion('REGION1', beacons[0].id)
            dispatch(beaconError('Beacon not found in 5 seconds'))
        }
        if (data.beacons.length > 0)
        {
            if (!beaconDetected)
            {
                let closestBeaconIndex = 0
                let closestBeaconDistance = 999999

                for (let beaconIndex in data.beacons)
                {
                    if (data.beacons[beaconIndex].distance < closestBeaconDistance)
                    {
                        closestBeaconIndex = beaconIndex
                    }
                }
                let beaconData = {
                    major: data.beacons[closestBeaconIndex].major,
                    minor: data.beacons[closestBeaconIndex].minor
                }

                dispatch(setBeaconData(beaconData))
                Beacons.stopRangingBeaconsInRegion('REGION1', beacons[0].id)
                beaconDetected = true
            }
        }
        else
        {
          if (beaconDetected)
          {
              beaconDetected = false
          }
        }
        attempts++
    })
}
