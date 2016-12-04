export const SET_GPS_LOCATION = 'SET_GPS_LOCATION'
export const GPS_LOCATION_ERROR = 'GPS_LOCATION_ERROR'
export const REQUEST_GPS_LOCATION = 'REQUEST_GPS_LOCATION'

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

        navigator.geolocation.watchPosition((position) =>
        {
            console.log(position.coords)
            dispatch(setGpsLocation(position.coords))
        },
           (error) =>
           {
           },
            {
                enableHighAccuracy: false,
                timeout: 60000,
                maximumAge: 1000
            })
    }
}
