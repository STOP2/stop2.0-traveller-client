import stopRequestReducer, { initialState } from '../../reducers/stopRequestReducer'
import { requestStoprequest, receiveConfirm  } from '../../actions/sendStoprequest'

describe('fetch reducer', () =>
{
    it('returns the same state on an unhandled action', () =>
    {
        expect(stopRequestReducer(initialState, {type: '_NULL'})).toMatchSnapshot()
    })

    it('handles RECEIVE_CONFIRM action', () =>
    {
        expect(stopRequestReducer(initialState, receiveConfirm())).toMatchSnapshot()
    })

    it('handles SEND_STOPREQUEST action', () =>
    {
        expect(stopRequestReducer(initialState, requestStoprequest(1, 2, 'stop'))).toMatchSnapshot()
    })
})
