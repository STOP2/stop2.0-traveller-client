import config from '../config/config'

export const REQUEST_ROUTE_STOPS = 'REQUEST_ROUTE_STOPS'
export const RECEIVE_ROUTE_STOPS = 'RECEIVE_ROUTE_STOPS'
export const REQUEST_ROUTE_STOPS_ERROR = 'REQUEST_ROUTE_STOPS_ERROR'

let requestDepartures = function(tripId, busId)
{
    return {
        type: REQUEST_ROUTE_STOPS,
        trip_id: tripId,
        bus_id: busId
    }
}

let receiveDepartures = function(json)
{
    return {
        type: RECEIVE_ROUTE_STOPS,
        departures: json.stops
    }
}

let requestError = function(error)
{
    return {
        type: REQUEST_ROUTE_STOPS_ERROR,
        error: error
    }
}

export let fetchDepartures = function(tripId, busId)
{
    return dispatch =>
    {
        dispatch(requestDepartures(tripId, busId))

        return fetch(config.API_URL + '/routes?trip_id=' + tripId + '&stop_id=' + busId)
      .then(response => response.json())
      .then(json => dispatch(receiveDepartures(json)))
      .catch(error => dispatch(requestError(error)))
    }
}
