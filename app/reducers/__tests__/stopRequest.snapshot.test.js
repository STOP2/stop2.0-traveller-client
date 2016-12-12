import stopRequest, { initialState } from '../../reducers/stopRequest';
import { sendStoprequest, receiveConfirm, setStopRequestRequestId } from '../../actions/sendStoprequest';
import { resetState } from '../../actions/resetStateAction';

describe('stopRequest reducer', () => {
  it('returns the same state on an unhandled action', () => {
    expect(stopRequest(initialState, { type: '_NULL' })).toMatchSnapshot();
  });

  it('handles RECEIVE_CONFIRM (fromVehicle true) action', () => {
    expect(stopRequest(initialState, receiveConfirm({}, {}, true))).toMatchSnapshot();
  });

  it('handles RECEIVE_CONFIRM (fromVehicle false) action', () => {
    expect(stopRequest(initialState, receiveConfirm({}, {}, false))).toMatchSnapshot();
  });

  it('handles SEND_STOPREQUEST (fromVehicle true) action', () => {
    expect(stopRequest(initialState, sendStoprequest({}, {}, 123, true))).toMatchSnapshot();
  });

  it('handles SEND_STOPREQUEST (fromVehicle false) action', () => {
    expect(stopRequest(initialState, sendStoprequest({}, {}, 123, false))).toMatchSnapshot();
  });

  it('handles SET_STOPREQUEST_REQUEST_ID_DESTINATION action', () => {
    expect(stopRequest(initialState, setStopRequestRequestId(false, 123))).toMatchSnapshot();
  });

  it('handles SET_STOPREQUEST_REQUEST_ID_FROM action', () => {
    expect(stopRequest(initialState, setStopRequestRequestId(true, 123))).toMatchSnapshot();
  });

  it('handles RESET_STATE action', () => {
    expect(stopRequest(initialState, resetState())).toMatchSnapshot();
  });
});
