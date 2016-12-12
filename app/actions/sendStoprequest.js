import { Alert } from 'react-native';

import config from '../config/config';
import strings from '../resources/translations';

export const SEND_STOPREQUEST = 'SEND_STOPREQUEST';
export const RECEIVE_CONFIRM = 'RECEIVE_CONFIRM';
export const REQUEST_ERROR = 'REQUEST_ERROR';
export const SET_STOPREQUEST_REQUEST_ID_FROM = 'SET_STOPREQUEST_REQUEST_ID_FROM';
export const SET_STOPREQUEST_REQUEST_ID_DESTINATION = 'SET_STOPREQUEST_REQUEST_ID_DESTINATION';

const API_ENDPOINT = '/stoprequests';

export const requestStoprequest = function requestStoprequest(tripId, stopId, fromVehicle) {
  return {
    type: SEND_STOPREQUEST,
    stopRequestSent: false,
    trip_id: tripId,
    stop_id: stopId,
    fromVehicle,
  };
};

export const receiveConfirm = function receiveConfirm(vehicle, stop, fromVehicle) {
  return {
    type: RECEIVE_CONFIRM,
    stopRequestSent: true,
    vehicle,
    stop,
    fromVehicle,
    error: false,
  };
};

export const requestError = function requestError() {
  Alert.alert('Error', strings.stopRequestError,
      [{ text: 'OK' }],
      { cancelable: false });

  return {
    type: REQUEST_ERROR,
    error: true,
  };
};

export const setStopRequestRequestId = (fromVehicle, requestId) => ({
  type: fromVehicle ? SET_STOPREQUEST_REQUEST_ID_FROM : SET_STOPREQUEST_REQUEST_ID_DESTINATION,
  requestId,
});

export const sendStoprequest = function sendStoprequest(vehicle, stop, fcmToken, fromVehicle) {
  return (dispatch) => {
    dispatch(requestStoprequest(vehicle.trip_id, stop.stopId, fromVehicle));

    const stopRequest = JSON.stringify({
      trip_id: vehicle.trip_id,
      stop_id: stop.stopId,
      device_id: fcmToken,
    });

    return fetch(config.API_URL + API_ENDPOINT, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: stopRequest,
    })
    .then((response) => {
      if (response.ok) {
        dispatch(receiveConfirm(vehicle, stop, fromVehicle));

        return response.json();
      }

      dispatch(requestError());

      return null;
    })
    .then((json) => {
      dispatch(setStopRequestRequestId(fromVehicle, json.request_id));
    })
    .catch(error => dispatch(requestError(error)));
  };
};
