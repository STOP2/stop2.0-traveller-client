import { REQUEST_ROUTE_STOPS, RECEIVE_ROUTE_STOPS, REQUEST_ROUTE_STOPS_ERROR } from '../actions/fetchRouteStops';
import { RESET_STATE } from '../actions/resetStateAction';

const initialState = {
  isFetchingStops: false,
  routeIsReady: false,
  errorFetchingStops: false,
  routeStops: {},
};

const routeStops = (state = initialState, action) => {
  switch (action.type) {

    case REQUEST_ROUTE_STOPS:
      return Object.assign({}, state, { isFetchingStops: action.isFetching });

    case RECEIVE_ROUTE_STOPS:
      return Object.assign({}, state, {
        isFetchingStops: action.isFetching,
        routeIsReady: action.routeIsReady,
        errorFetchingStops: action.error,
        routeStops: action.stops,
      });

    case REQUEST_ROUTE_STOPS_ERROR:
      return Object.assign({}, state, { sentStoprequest: action.sentStoprequest });

    case RESET_STATE:
      return Object.assign({}, state, initialState);

    default:
      return state;
  }
};

export default routeStops;
