import cancelStopRequestReducer, { initialState } from '../../reducers/cancelStopRequest';
import { cancelStopRequest, receiveStopRequestCancellationConfirmation, requestStopRequestCancellation, stopRequestCancellationError } from '../../actions/cancelStopRequest';
import { resetState } from '../../actions/resetStateAction';

describe('cancelStopRequest reducer', () => {
  it('returns the same state on an unhandled action', () => {
    expect(cancelStopRequestReducer(initialState, { type: '_NULL' })).toMatchSnapshot();
  });

  it('handles SEND_STOPREQUEST_FROM_CANCELLATION action', () => {
    expect(cancelStopRequestReducer(initialState, cancelStopRequest(123, true))).toMatchSnapshot();
  });

  it('handles SEND_STOPREQUEST_DESTINATION_CANCELLATION action', () => {
    expect(cancelStopRequestReducer(initialState, cancelStopRequest(123, false))).toMatchSnapshot();
  });

  it('handles STOPREQUEST_FROM_CANCELLED action', () => {
    expect(cancelStopRequestReducer(initialState, receiveStopRequestCancellationConfirmation(true))).toMatchSnapshot();
  });

  it('handles STOPREQUEST_DESTINATION_CANCELLED action', () => {
    expect(cancelStopRequestReducer(initialState, receiveStopRequestCancellationConfirmation(false))).toMatchSnapshot();
  });

  it('handles STOPREQUEST_FROM_CANCELLATION_ERROR action', () => {
    expect(cancelStopRequestReducer(initialState, stopRequestCancellationError(true, 'error'))).toMatchSnapshot();
  });

  it('handles STOPREQUEST_DESTINATION_CANCELLATION_ERROR action', () => {
    expect(cancelStopRequestReducer(initialState, stopRequestCancellationError(false, 'error'))).toMatchSnapshot();
  });

  it('handles RESET_STATE action', () => {
    expect(cancelStopRequestReducer(initialState, resetState())).toMatchSnapshot();
  });
});
