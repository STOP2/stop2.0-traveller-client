export const SET_BEACON_DATA = 'SET_BEACON_DATA'
export const BEACON_ERROR = 'BEACON_ERROR'
export const REQUEST_BEACON_DATA = 'REQUEST_BEACON_DATA'

export let setBeaconData = function(beaconData)
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
