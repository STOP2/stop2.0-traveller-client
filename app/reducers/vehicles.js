import { REQUEST_VEHICLES, RECEIVE_VEHICLES, REQUEST_VEHICLES_ERROR } from '../actions/fetchVehiclesActions';
import { RESET_STATE } from '../actions/resetStateAction';

const initialState = {
  vehicles: [],
  isFetching: false,
  isReady: false,
  error: false,
};

const fetchDepartures = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_VEHICLES:
      return Object.assign({}, state, { isFetching: action.isFetching });

    case RECEIVE_VEHICLES:
      return Object.assign({}, state, {
        isFetching: action.isFetching,
        isReady: action.isReady,
        error: action.error,
        vehicles: action.vehicles,
      });

    case REQUEST_VEHICLES_ERROR:
      return Object.assign({}, state, { error: action.error });

    case RESET_STATE:
      return Object.assign({}, state, initialState);

    default:
      return state;
  }
};

export default fetchDepartures;
