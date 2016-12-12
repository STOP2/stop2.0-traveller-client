import { STOPREQUEST_FROM_CANCELLED, STOPREQUEST_DESTINATION_CANCELLED, SEND_STOPREQUEST_FROM_CANCELLATION, SEND_STOPREQUEST_DESTINATION_CANCELLATION, STOPREQUEST_FROM_CANCELLATION_ERROR, STOPREQUEST_DESTINATION_CANCELLATION_ERROR } from '../actions/cancelStopRequest';
import { RESET_STATE } from '../actions/resetStateAction';
export const initialState = {
  stopRequestFromCancelled: false,
  stopRequestDestinationCancelled: false,
  isCancellingFromStopRequest: false,
  isCancellingDestinationStopRequest: false,
  stopRequestFromCancellationError: null,
  stopRequestDestinationCancellationError: null,
};

const cancelStopRequest = (state = initialState, action) => {
  switch (action.type) {
    case SEND_STOPREQUEST_FROM_CANCELLATION:
      return Object.assign({}, state,
        {
          stopRequestFromCancelled: action.stopRequestCancelled,
          isCancellingFromStopRequest: action.isCancellingStopRequest,
        },
            );

    case STOPREQUEST_FROM_CANCELLED:
      return Object.assign({}, state,
        {
          stopRequestFromCancelled: action.stopRequestCancelled,
          isCancellingFromStopRequest: action.isCancellingStopRequest,
        },
            );

    case STOPREQUEST_FROM_CANCELLATION_ERROR:
      return Object.assign({}, state,
        {
          stopRequestFromCancelled: action.stopRequestCancelled,
          isCancellingFromStopRequest: action.isCancellingStopRequest,
          stopRequestFromCancellationError: action.stopRequestCancellationError,
        },
            );

    case SEND_STOPREQUEST_DESTINATION_CANCELLATION:
      return Object.assign({}, state,
        {
          stopRequestDestinationCancelled: action.stopRequestCancelled,
          isCancellingDestinationStopRequest: action.isCancellingStopRequest,
        },
            );

    case STOPREQUEST_DESTINATION_CANCELLED:
      return Object.assign({}, state,
        {
          stopRequestDestinationCancelled: action.stopRequestCancelled,
          isCancellingDestinationStopRequest: action.isCancellingStopRequest,
        },
            );

    case STOPREQUEST_DESTINATION_CANCELLATION_ERROR:
      return Object.assign({}, state,
        {
          stopRequestDestinationCancelled: action.stopRequestCancelled,
          isCancellingDestinationStopRequest: action.isCancellingStopRequest,
          stopRequestDestinationCancellationError: action.stopRequestCancellationError,
        },
            );

    case RESET_STATE:
      return Object.assign({}, state, initialState);

    default:
      return state;
  }
};

export default cancelStopRequest;
