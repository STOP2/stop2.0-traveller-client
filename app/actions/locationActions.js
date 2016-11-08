import { checkPermission, requestPermission } from 'react-native-android-permissions'

export const SET_LOCATION = 'SET_LOCATION'
export const LOCATION_ERROR = 'LOCATION_ERROR'
export const REQUEST_LOCATION = 'REQUEST_LOCATION'

export const LOCATION_PERMISSION_ERROR = 'LOCATION_PERMISSION_ERROR'

export let checkLocationPermissionAndGetLocation = function()
{
    return dispatch => {
        checkPermission('android.permission.ACCESS_FINE_LOCATION').then(() => {
            dispatch(getLocation())
        }, () => {
            setTimeout(() => {
                requestPermission('android.permission.ACCESS_FINE_LOCATION').then(() => {
                    dispatch(getLocation())
                }, (error) => {
                    dispatch(locationPermissionError(error))
                })
                // for the correct StatusBar behaviour with translucent={true} we need to wait a bit and ask for permission after the first render cycle
                // (check https://github.com/facebook/react-native/issues/9413 for more info)
            }, 0)
        })
    }
}

export let locationPermissionError = function(error)
{
    return {
        type: LOCATION_PERMISSION_ERROR,
        error: error
    }
}



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

export let getLocation = function() {
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