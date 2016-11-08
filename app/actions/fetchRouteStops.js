import config from '../config/config'

export const REQUEST_ROUTE_STOPS = 'REQUEST_ROUTE_STOPS'
export const RECEIVE_ROUTE_STOPS = 'RECEIVE_ROUTE_STOPS'
export const REQUEST_ROUTE_STOPS_ERROR = 'REQUEST_ROUTE_STOPS_ERROR'

export let requestRouteStops = function(tripId, stopId, current)
{
    return {
        type: REQUEST_ROUTE_STOPS,
        isFetching: true,
        tripId: tripId,
        stopId: stopId,
        current: current
    }
}

export let receiveRouteStops = function(json)
{
    return {
        type: RECEIVE_ROUTE_STOPS,
        isFetching: false,
        routeIsReady: true,
        error: false,
        stops: json.stops
    }
}

export let requestError = function(error)
{
    return {
        type: REQUEST_ROUTE_STOPS_ERROR,
        sentStoprequest: false,
        error: error
    }
}

export let fetchRouteStops = function(tripId, stopId, current)
{
    return dispatch =>
    {
        dispatch(requestRouteStops(tripId, stopId, current))

        let current_str = ''

        if(!current) current_str = 'false'

        return fetch(config.API_URL + '/routes?trip_id=' + tripId + '&stop_id=' + stopId + '&current=' + current_str)
      .then(response => response.json())
      .then(json => dispatch(receiveRouteStops(json)))
      .catch(error => dispatch(requestError(error)))
    }
}
