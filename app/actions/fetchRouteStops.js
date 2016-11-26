import config from '../config/config'

export const REQUEST_ROUTE_STOPS = 'REQUEST_ROUTE_STOPS'
export const RECEIVE_ROUTE_STOPS = 'RECEIVE_ROUTE_STOPS'
export const REQUEST_ROUTE_STOPS_ERROR = 'REQUEST_ROUTE_STOPS_ERROR'

export let requestRouteStops = function(tripId)
{
    return {
        type: REQUEST_ROUTE_STOPS,
        isFetching: true,
        tripId: tripId
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

export let fetchRouteStops = function(tripId)
{
    return dispatch =>
    {
        dispatch(requestRouteStops(tripId))

        return fetch(config.API_URL + '/routes?trip_id=' + tripId,
        {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
      .then(response => response.json())
      .then(json => dispatch(receiveRouteStops(json)))
      .catch(error => dispatch(requestError(error)))
    }
}
