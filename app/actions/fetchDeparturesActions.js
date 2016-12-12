import config from '../config/config';

const USE_LOCATION_RADIUS = true;
const LOCATION_RADIUS = 500;

export const REQUEST_DEPARTURES = 'REQUEST_DEPARTURES';
export const RECEIVE_DEPARTURES = 'RECEIVE_DEPARTURES';
export const REQUEST_ERROR = 'REQUEST_ERROR';

const API_ENDPOINT = '/stops';
const API_ENDPOINT_WITH_BEACONS = '/stops/beacons';

export const requestDepartures = function requestDepartures(latitude, longitude) {
  return {
    type: REQUEST_DEPARTURES,
    isFetching: true,
    latitude,
    longitude,
  };
};

export const requestDeparturesWithBeacons = function requestDeparturesWithBeacons(major, minor) {
  return {
    type: REQUEST_DEPARTURES,
    isFetching: true,
    major,
    minor,
  };
};

export const receiveDepartures = function receiveDepartures(json) {
  return {
    type: RECEIVE_DEPARTURES,
    isFetching: false,
    isReady: true,
    error: false,
    departures: json.stops,
  };
};

export const requestError = function requestError() {
  return {
    type: REQUEST_ERROR,
    error: true,
  };
};

export const fetchDepartures = function fetchDepartures(latitude, longitude, withBeacons) {
  let radiusString = '';

  if (USE_LOCATION_RADIUS) {
    radiusString = `&rad=${LOCATION_RADIUS}`;
  }

  return (dispatch) => {
    let fetchString;

    if (withBeacons) {
      // here latitude =  major and longtitude = minor
      dispatch(requestDeparturesWithBeacons(latitude, longitude));
      fetchString = `${config.API_URL}${API_ENDPOINT_WITH_BEACONS}?major=${latitude}&minor=${longitude}${radiusString}`;
    } else {
      dispatch(requestDepartures(latitude, longitude));
      fetchString = `${config.API_URL}${API_ENDPOINT}?lat=${latitude}&lon=${longitude}${radiusString}`;
    }


    return fetch(fetchString, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }

      dispatch(requestError());

      return null;
    })
    .then(json => dispatch(receiveDepartures(json)))
      .catch(error => dispatch(requestError(error)));
  };
};
