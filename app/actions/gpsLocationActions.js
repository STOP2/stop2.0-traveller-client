export const SET_GPS_LOCATION = 'SET_GPS_LOCATION'
export const GPS_LOCATION_ERROR = 'GPS_LOCATION_ERROR'
export const REQUEST_GPS_LOCATION = 'REQUEST_GPS_LOCATION'
export const CLEAR_LOCATION = 'CLEAR_LOCATION'

let watchId = false

export let setGpsLocation = function(gpsLocationData)
{
    return {
        type: SET_GPS_LOCATION,
        gettingGpsLocation: false,
        gpsLocationData: gpsLocationData
    }
}

export let requestGpsLocation = function()
{
    return {
        type: REQUEST_GPS_LOCATION,
        gettingGpsLocation: true
    }
}

export let gpsLocationError = function(error)
{
    return {
        type: GPS_LOCATION_ERROR,
        error: error,
        gettingGpsLocation: false
    }
}

export let getGpsLocation = function()
{
    return dispatch =>
   {
        if (!watchId)
        {
            dispatch(requestGpsLocation())
            navigator.geolocation.getCurrentPosition((position) =>
            {
                dispatch(setGpsLocation(position.coords))
            },
            (error) =>
            {
                dispatch(gpsLocationError(error))
            },
                {
                    enableHighAccuracy: false,
                    timeout: 60000,
                    maximumAge: 1000
                })


            watchId = navigator.geolocation.watchPosition((position) =>
            {
                dispatch(setGpsLocation(position.coords))
            },
              (error) =>
              {
              },
                {
                    enableHighAccuracy: true,
                    timeout: 60000,
                    maximumAge: 1000
                })
        }
    }
}

export let clearWatchLocation = function()
{
    navigator.geolocation.clearWatch(watchId)
    watchId = false

    return { type: CLEAR_LOCATION }
}
