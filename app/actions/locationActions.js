export const SET_LOCATION = 'SET_LOCATION'
export const LOCATION_ERROR = 'LOCATION_ERROR'
export const REQUEST_LOCATION = 'REQUEST_LOCATION'

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