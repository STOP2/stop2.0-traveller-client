<<<<<<< HEAD
import { BEACON_ERROR, VEHICLE_BEACON_ERROR, SET_BEACON_DATA, SET_VEHICLE_BEACON_DATA, REQUEST_BEACON_DATA } from '../actions/beaconLocationActions';
import { RESET_STATE } from '../actions/resetStateAction';

export let initialState = {
  beaconData: {},
  vehicleBeaconData: [],
  beaconError: null,
  vehicleBeaconError: null,
  gettingBeaconData: false,
  gettingVehicleBeaconData: false,
=======
import { BEACON_ERROR, SET_BEACON_DATA, REQUEST_BEACON_DATA } from '../actions/beaconLocationActions';
import { RESET_STATE } from '../actions/resetStateAction';

export const initialState = {
  beaconData: {},
  beaconError: null,
  gettingBeaconData: false,
>>>>>>> origin
};

const beacons = (state = initialState, action) => {
  switch (action.type) {
    case SET_BEACON_DATA:

      return Object.assign({}, state, {
        beaconData: action.beaconData,
        gettingBeaconData: action.gettingBeaconData,
      });
<<<<<<< HEAD

    case SET_VEHICLE_BEACON_DATA:

      return Object.assign({}, state, {
        vehicleBeaconData: action.beaconData,
        gettingVehicleBeaconData: action.gettingVehicleBeaconData,
      });

    case REQUEST_BEACON_DATA:

      return Object.assign({}, state, {
        gettingBeaconData: action.gettingBeaconData,
        gettingVehicleBeaconData: action.gettingVehicleBeaconData,
      });
=======

    case REQUEST_BEACON_DATA:

      return Object.assign({}, state, { gettingBeaconData: action.gettingBeaconData });
>>>>>>> origin

    case BEACON_ERROR:
      return Object.assign({}, state, {
        beaconError: action.beaconError,
        gettingBeaconData: action.gettingBeaconData,
      });

<<<<<<< HEAD
    case VEHICLE_BEACON_ERROR:
      return Object.assign({}, state, {
        vehicleBeaconError: action.beaconError,
        gettingVehicleBeaconData: action.gettingBeaconData,
      });
=======
    case RESET_STATE:
      return Object.assign({}, state, initialState);
>>>>>>> origin

    default:
      return state;
  }
};

export default beacons;
