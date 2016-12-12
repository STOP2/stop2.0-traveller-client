import { SEND_STOPREQUEST, RECEIVE_CONFIRM, SET_STOPREQUEST_REQUEST_ID_DESTINATION, SET_STOPREQUEST_REQUEST_ID_FROM } from '../actions/sendStoprequest';
import { RESET_STATE } from '../actions/resetStateAction';

const initialState = {
  stops: [],
  isFetching: false,
  isReady: false,
  error: false,
  startStop: null,
  currentVehicle: null,
  fromRequestId: null,
  destinationRequestId: null,
};

const stopRequest = (state = initialState, action) => {
  switch (action.type) {
    case SEND_STOPREQUEST:
      if (action.fromVehicle) {
        return Object.assign({}, state, { sentStoprequestFromVehicle: action.stopRequestSent });
      } else {
        return Object.assign({}, state, { sentStoprequestFromStop: action.stopRequestSent });
      }


    case RECEIVE_CONFIRM:
      if (action.fromVehicle) {
        return Object.assign({}, state, { sentStoprequestFromVehicle: action.stopRequestSent });
      } else {
        return Object.assign({}, state, {
          sentStoprequestFromStop: action.stopRequestSent,
          startStop: action.stop,
          currentVehicle: action.vehicle,
        });
      }

    case RESET_STATE:
      return Object.assign({}, state, initialState);

    case SET_STOPREQUEST_REQUEST_ID_DESTINATION:
      return Object.assign({}, state, { fromRequestId: action.requestId });

    case SET_STOPREQUEST_REQUEST_ID_FROM:
      return Object.assign({}, state, { destinationRequestId: action.requestId });

    default:
      return state;
  }
};

export default stopRequest;
