import { SET_GPS_LOCATION, GPS_LOCATION_ERROR, REQUEST_GPS_LOCATION } from '../actions/gpsLocationActions';
import { RESET_STATE } from '../actions/resetStateAction';

export const initialState = {
  gpsLocationData: {},
  error: null,
  locationPermissionError: null,
  gettingGpsLocation: false,
};

const gpsLocation = (state = initialState, action) => {
  switch (action.type) {
    case SET_GPS_LOCATION:
      return Object.assign({}, state, {
        gpsLocationData: action.gpsLocationData,
        gettingGpsLocation: action.gettingGpsLocation,
      });

    case REQUEST_GPS_LOCATION:
      return Object.assign({}, state, { gettingGpsLocation: action.gettingGpsLocation });

    case GPS_LOCATION_ERROR:
      return Object.assign({}, state, {
        error: action.error,
        gettingGpsLocation: action.gettingGpsLocation,
      });

    case RESET_STATE:
      return Object.assign({}, state, initialState);

    default:
      return state;
  }
};

export default gpsLocation;
