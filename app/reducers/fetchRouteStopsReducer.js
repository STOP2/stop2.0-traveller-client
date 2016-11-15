import { REQUEST_ROUTE_STOPS, RECEIVE_ROUTE_STOPS, REQUEST_ROUTE_STOPS_ERROR } from '../actions/fetchRouteStops'

let initialState = {
    isFetchingStops: false,
    routeIsReady: false,
    errorFetchingStops: false,
    routeStops: {}
}

const fetchRouteStopsReducer = (state = initialState, action) =>
{
    switch (action.type)
    {

    case REQUEST_ROUTE_STOPS:
        return Object.assign({}, state, {isFetching: action.isFetching})

    case RECEIVE_ROUTE_STOPS:
        return Object.assign({}, state, {
            isFetchingStops: action.isFetching,
            routeIsReady: action.routeIsReady,
            errorFetchingStops: action.error,
            routeStops: action.stops
        })

    case REQUEST_ROUTE_STOPS_ERROR:
        return Object.assign({}, state, {sentStoprequest: action.sentStoprequest})

    default:
        return state
    }
}

export default fetchRouteStopsReducer
