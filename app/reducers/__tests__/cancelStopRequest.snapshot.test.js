import cancelStopRequestReducer, { initialState } from '../../reducers/cancelStopRequest'
import { cancelStopRequest, receiveStopRequestCancellationConfirmation, requestStopRequestCancellation, stopRequestCancellationError } from '../../actions/cancelStopRequest'
import { resetState } from '../../actions/resetStateAction'

describe('cancelStopRequest reducer', () =>
{
    it('returns the same state on an unhandled action', () =>
    {
        expect(cancelStopRequestReducer(initialState, {type: '_NULL'})).toMatchSnapshot()
    })

    it('handles SEND_STOPREQUEST_CANCELLATION action', () =>
    {
        expect(cancelStopRequestReducer(initialState, cancelStopRequest(123))).toMatchSnapshot()
    })

    it('handles STOPREQUEST_CANCELLED action', () =>
    {
        expect(cancelStopRequestReducer(initialState, receiveStopRequestCancellationConfirmation())).toMatchSnapshot()
    })

    it('handles STOPREQUEST_CANCELLATION_ERROR action', () => {
        expect(cancelStopRequestReducer(initialState, stopRequestCancellationError('error'))).toMatchSnapshot()
    })

    it('handles RESET_STATE action', () =>
    {
        expect(cancelStopRequestReducer(initialState, resetState())).toMatchSnapshot()
    })

})
