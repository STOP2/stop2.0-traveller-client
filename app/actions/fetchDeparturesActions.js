import config from '../config/config'

const USE_LOCATION_RADIUS = true
const LOCATION_RADIUS = 500

export const REQUEST_DEPARTURES = 'REQUEST_DEPARTURES'
export const RECEIVE_DEPARTURES = 'RECEIVE_DEPARTURES'
export const REQUEST_ERROR = 'REQUEST_ERROR'

let requestDepartures = function(latitude, longitude)
{
    return {
        type: REQUEST_DEPARTURES,
        latitude: latitude,
        longitude: longitude
    }
}

let receiveDepartures = function(json)
{
    return {
        type: RECEIVE_DEPARTURES,
        departures: json.stops
    }
}

let requestError = function(error)
{
    return {
        type: REQUEST_ERROR,
        error: error
    }
}

export let fetchDepartures = function(latitude, longitude)
{
    let radiusString = ''

    if (USE_LOCATION_RADIUS) radiusString = '&rad=' + LOCATION_RADIUS

    return dispatch =>
    {
        dispatch(requestDepartures(latitude, longitude))

        return fetch(config.API_URL + '/stops?lat=' + latitude + '&lon=' + longitude + radiusString)
      .then(response => response.json())
      .then(json => dispatch(receiveDepartures(json)))
      .catch(error => dispatch(requestError(error)))
    }
}
