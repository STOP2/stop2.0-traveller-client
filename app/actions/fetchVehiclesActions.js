import config from '../config/config';

export const REQUEST_VEHICLES = 'REQUEST_VEHICLES';
export const RECEIVE_VEHICLES = 'RECEIVE_VEHICLES';
export const REQUEST_VEHICLES_ERROR = 'REQUEST_VEHICLES_ERROR';

const API_ENDPOINT = '/vehicles/beacons';

export const requestVehicles = function requestVehicles(beacons) {
  return {
    type: REQUEST_VEHICLES,
    isFetching: true,
    beacons,
  };
};

export const receiveVehicles = function receiveVehicles(json) {
  return {
    type: RECEIVE_VEHICLES,
    isFetching: false,
    isReady: true,
    error: false,
    vehicles: json.vehicles,
  };
};

export const requestVehiclesError = function requestVehiclesError(error) {
  console.log('FETCH ERRORED');
  console.log(error)
  return {
    type: REQUEST_VEHICLES_ERROR,
    error: true,
  };
};

export const fetchVehicles = function fetchVehicles(beacons) {
  return (dispatch) => {
    console.log('DOING THE FETCH');
    console.log(JSON.stringify({ beacons }));
    return fetch(config.API_URL + API_ENDPOINT,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ beacons }),
      })
            .then((response) => {
              if (response.ok) {
                return response.json();
              } else {
                console.log('ERROR1')
                dispatch(requestVehiclesError());
              }
            })
            .then(json => dispatch(receiveVehicles(json)))
            .catch(error => dispatch(requestVehiclesError(error)));
  };
};
