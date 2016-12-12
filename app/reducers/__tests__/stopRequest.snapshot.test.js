import stopRequest, { initialState } from '../../reducers/stopRequest';
import { requestStoprequest, receiveConfirm } from '../../actions/sendStoprequest';
import { resetState } from '../../actions/resetStateAction';

describe('fetch reducer', () => {
  it('returns the same state on an unhandled action', () => {
    expect(stopRequest(initialState, { type: '_NULL' })).toMatchSnapshot();
  });

  it('handles RECEIVE_CONFIRM action', () => {
    expect(stopRequest(initialState, receiveConfirm())).toMatchSnapshot();
  });

  it('handles SEND_STOPREQUEST action', () => {
    expect(stopRequest(initialState, requestStoprequest(1, 2, 'stop'))).toMatchSnapshot();
  });

  it('handles RESET_STATE action', () => {
    expect(stopRequest(initialState, resetState())).toMatchSnapshot();
  });
});
