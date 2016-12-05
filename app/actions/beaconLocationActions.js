import Beacons from 'react-native-beacons-android'
import { DeviceEventEmitter } from 'react-native'

export const SET_BEACON_DATA = 'SET_BEACON_DATA'
export const SET_VEHICLE_BEACON_DATA = 'SET_VEHICLE_BEACON_DATA'
export const BEACON_ERROR = 'BEACON_ERROR'
export const REQUEST_BEACON_DATA = 'REQUEST_BEACON_DATA'

const FOREGROUND_SCAN_PERIOD = 1000
const BACKGROUND_SCAN_PERIOD = 1000

let beaconId = 'ebefd083-70a2-47c8-9837-e7b5634df524'
let vehicleBeaconId = 'f7826da6-4fa2-4e98-8024-bc5b71e0893e'

let beaconFound = false
let vehicleBeaconsFound = false

let tryingToFindBeacons = false
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
        type: SET_VEHICLE_BEACON_DATA,
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

export let getBeaconData = function()
{
    return dispatch =>
    {
        getData(dispatch)
        dispatch(requestBeaconData())
    }
}

let getData = async function(dispatch)
{
    if (tryingToFindBeacons) return
    tryingToFindBeacons = true

    attempts = 0
    beaconFound = false
    vehicleBeaconsFound = false

    Beacons.detectIBeacons()
    Beacons.setForegroundScanPeriod(FOREGROUND_SCAN_PERIOD)
    Beacons.setBackgroundScanPeriod(BACKGROUND_SCAN_PERIOD)

    try
    {
        await Beacons.startRangingBeaconsInRegion('STOPS', beaconId)
        await Beacons.startRangingBeaconsInRegion('BUSSES', vehicleBeaconId)
    }
    catch (error)
    {}

  // Print a log of the detected iBeacons (1 per 5 second)
    DeviceEventEmitter.addListener('beaconsDidRange', (data) =>
    {
        if (attempts == 5)
        {
            Beacons.stopRangingBeaconsInRegion('STOPS', beaconId)
            Beacons.stopRangingBeaconsInRegion('BUSSES', vehicleBeaconId)
            tryingToFindBeacons = false
            dispatch(beaconError('Beacon not found in 5 seconds'))
        }
        if (data.beacons.length > 0)
        {
            let closestBeaconIndex = 0
            let closestBeaconDistance = 999999

            let vehicleBeacons = []

            for (let beaconIndex in data.beacons)
            {
                let beacon = data.beacons[beaconIndex]

                if (beacon.uuid == beaconId && beacon.distance < closestBeaconDistance)
                {
                    closestBeaconIndex = beaconIndex
                    closestBeaconDistance = beacon.distance
                }

                if (beacon.uuid == vehicleBeaconId)
                {
                    vehicleBeacons.push({
                        major: beacon.major,
                        minor: beacon.minor
                    })
                }
            }

            let beaconData = {
                uuid: data.beacons[closestBeaconIndex].uuid,
                major: data.beacons[closestBeaconIndex].major,
                minor: data.beacons[closestBeaconIndex].minor
            }

            if (beaconData.uuid == beaconId)
            {
                dispatch(setBeaconData(beaconData))
                Beacons.stopRangingBeaconsInRegion('STOPS', beaconId)
                if (beaconFound)
            }

            if (vehicleBeacons.length > 0)
            {
                dispatch(setBusBeaconData(vehicleBeacons))
                Beacons.stopRangingBeaconsInRegion('BUSSES', vehicleBeaconId)
            }
        }
        attempts++
    })
}
