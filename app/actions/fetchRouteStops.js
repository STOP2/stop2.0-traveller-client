import config from '../config/config'

export const REQUEST_ROUTE_STOPS = 'REQUEST_ROUTE_STOPS'
export const RECEIVE_ROUTE_STOPS = 'RECEIVE_ROUTE_STOPS'
export const REQUEST_ROUTE_STOPS_ERROR = 'REQUEST_ROUTE_STOPS_ERROR'

let requestRouteStops = function(tripId, stopId)
{
    return {
        type: REQUEST_ROUTE_STOPS,
        trip_id: tripId,
        stop_id: stopId
    }
}

let receiveRouteStops = function(json)
{
    return {
        type: RECEIVE_ROUTE_STOPS,
        stops: json.stops
    }
}

let requestError = function(error)
{
    return {
        type: REQUEST_ROUTE_STOPS_ERROR,
        error: error
    }
}

export let fetchRouteStops = function(tripId, stopId)
{
    return dispatch =>
    {
        dispatch(requestRouteStops(tripId, stopId))

        return fetch(config.API_URL + '/routes?trip_id=' + tripId + '&stop_code=' + stopId)
      .then(response => response.json())
      .then(json => dispatch(receiveRouteStops(json)))
      .catch(error => dispatch(requestError(error)))
    }
}
