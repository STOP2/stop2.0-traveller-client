import { SET_LOCATION, LOCATION_ERROR, REQUEST_LOCATION, LOCATION_PERMISSION_ERROR } from '../actions/locationActions'

export let initialState = {
    locationData: {},
    error: null,
    locationPermissionError: null,
    gettingLocation: false
}

const locationReducer = (state = initialState, action) =>
{
    switch (action.type)
  {
    case SET_LOCATION:
        return Object.assign({}, state, {
            locationData: action.locationData,
            gettingLocation: action.gettingLocation
        })

    case REQUEST_LOCATION:
        return Object.assign({}, state, {gettingLocation: action.gettingLocation})

    case LOCATION_ERROR:
        return Object.assign({}, state, {error: action.error})

    case LOCATION_PERMISSION_ERROR:
        return Object.assign({}, state, {locationPermissionError: action.error})


    default:
        return state
    }
}

export default locationReducer
