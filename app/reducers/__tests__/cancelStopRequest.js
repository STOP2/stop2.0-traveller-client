import cancelstopRequest, { initialState } from '../../reducers/cancelstopRequest'
import { cancelStopRequest, receiveStopRequestCancellationConfirmation, requestStopRequestCancellation, stopRequestCancellationError } from '../../actions/cancelStopRequest'
describe('cancelStopRequest reducer', () =>
{
    it('returns the same state on an unhandled action', () =>
    {
        expect(cancelstopRequest(initialState, {type: '_NULL'})).toMatchSnapshot()
    })

    it('handles SEND_STOPREQUEST_CANCELLATION action', () =>
    {
        expect(cancelstopRequest(initialState, cancelStopRequest(123))).toMatchSnapshot()
    })

    it('handles STOPREQUEST_CANCELLED action', () =>
    {
        expect(cancelstopRequest(initialState, receiveStopRequestCancellationConfirmation())).toMatchSnapshot()
    })

    it('handles STOPREQUEST_CANCELLATION_ERROR action', () => {
        expect(cancelstopRequest(initialState, stopRequestCancellationError('error'))).toMatchSnapshot()
    })
})
