import Beacons from 'react-native-beacons-android'
import { DeviceEventEmitter } from 'react-native'

export const SET_BEACON_DATA = 'SET_BEACON_DATA'
export const SET_VEHICLE_BEACON_DATA = 'SET_VEHICLE_BEACON_DATA'
export const BEACON_ERROR = 'BEACON_ERROR'
export const VEHICLE_BEACON_ERROR = 'VEHICLE_BEACON_ERROR'
export const REQUEST_BEACON_DATA = 'REQUEST_BEACON_DATA'
export const REQUESTING_DATA = 'REQUESTING_DATA'

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

export let vehicleBeaconError = function(error)
{
    return {
        type: VEHICLE_BEACON_ERROR,
        beaconError: error,
        gettingBeaconData: false
    }
}

export let getBeaconData = function()
{
    if (!tryingToFindBeacons)
    {
        return dispatch =>
        {
            getData(dispatch)
            dispatch(requestBeaconData())
        }
    }
    else
    {
        return { type: REQUESTING_DATA }
    }
}

let getData = async function(dispatch)
{
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
        console.log(data)
        if (attempts == 15)
        {
            Beacons.stopRangingBeaconsInRegion('STOPS', beaconId)
            Beacons.stopRangingBeaconsInRegion('BUSSES', vehicleBeaconId)
            if (!beaconFound) dispatch(beaconError('Beacon not found in 5 seconds'))
            if (!vehicleBeaconsFound) dispatch(vehicleBeaconError('Beacon not found in 5 seconds'))
            tryingToFindBeacons = false

            return
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
                beaconFound = true
            }

            if (vehicleBeacons.length > 0)
            {
                console.log('vehicleBeacons')
                dispatch(setBusBeaconData(vehicleBeacons))
                Beacons.stopRangingBeaconsInRegion('BUSSES', vehicleBeaconId)
                vehicleBeaconsFound = true
            }
        }
        attempts++
        if (beaconFound && vehicleBeaconsFound) tryingToFindBeacons = false
    })
}
