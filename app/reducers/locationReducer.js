import { SET_GPS_LOCATION, SET_BEACON, LOCATION_ERROR, REQUEST_LOCATION, LOCATION_PERMISSION_ERROR } from '../actions/locationActions'
import {RESET_STATE} from '../actions/resetStateAction'

export let initialState = {
    locationData: {},
    beaconData: {},
    error: null,
    locationPermissionError: null,
    gettingLocation: false
}

const locationReducer = (state = initialState, action) =>
{
    switch (action.type)
  {
    case SET_GPS_LOCATION:
        return Object.assign({}, state, {
            locationData: action.locationData,
            gettingLocation: action.gettingLocation
        })
    case SET_BEACON:
        return Object.assign({}, state, {
            beaconData: action.beaconData,
            gettingLocation: action.gettingLocation
        })

    case REQUEST_LOCATION:
        return Object.assign({}, state, {gettingLocation: action.gettingLocation})

    case LOCATION_ERROR:
        return Object.assign({}, state, {error: action.error})

    case LOCATION_PERMISSION_ERROR:
        return Object.assign({}, state, {locationPermissionError: action.error})

    case RESET_STATE:
        return Object.assign({}, state, initialState)

    default:
        return state
    }
}

export default locationReducer
