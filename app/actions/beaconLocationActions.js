export const SET_BEACON_DATA = 'SET_BEACON_DATA';
export const BEACON_ERROR = 'BEACON_ERROR';
export const REQUEST_BEACON_DATA = 'REQUEST_BEACON_DATA';

export const setBeaconData = function setBeaconData(beaconData) {
  return {
    type: SET_BEACON_DATA,
    beaconData,
    gettingBeaconData: false,
  };
};

export const requestBeaconData = function requestBeaconData() {
  return {
    type: REQUEST_BEACON_DATA,
    gettingBeaconData: true,
  };
};

export const beaconError = function beaconError(error) {
  return {
    type: BEACON_ERROR,
    beaconError: error,
    gettingBeaconData: false,
  };
};
