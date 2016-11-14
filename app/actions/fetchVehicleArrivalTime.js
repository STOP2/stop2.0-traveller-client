import config from '../config/config'

export const REQUEST_VEHICLE_ARRIVAL_TIME = 'REQUEST_VEHICLE_ARRIVAL_TIME'
export const RECEIVE_ARRIVAL_TIME = 'RECEIVE_ARRIVAL_TIME'
export const REQUEST_ARRIVAL_TIME_ERROR = 'REQUEST_ARRIVAL_TIME_ERROR'

export let requestRouteStops = function(requestId)
{
    return {
        type: REQUEST_VEHICLE_ARRIVAL_TIME,
        isFetching: true,
        requestId: requestId
    }
}

export let receiveRouteStops = function(json)
{
    return {
        type: RECEIVE_ARRIVAL_TIME,
        isFetching: false,
        error: false,
        time: json.time
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

export let fetchRouteStops = function(tripId, stopId)
{
    return dispatch =>
    {
        dispatch(requestRouteStops(tripId, stopId))

        return fetch(config.API_URL + '/routes?trip_id=' + tripId + '&stop_id=' + stopId)
      .then(response => response.json())
      .then(json => dispatch(receiveRouteStops(json)))
      .catch(error => dispatch(requestError(error)))
    }
}
