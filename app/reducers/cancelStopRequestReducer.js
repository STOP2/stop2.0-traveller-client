import { STOPREQUEST_CANCELLED, SEND_STOPREQUEST_CANCELLATION, STOPREQUEST_CANCELLATION_ERROR } from '../actions/cancelStopRequest'

export let initialState = {
    stopRequestCancelled: false,
    isCancellingStopRequest: false,
    stopRequestCancellationError: null
}

const fetchReducer = (state = initialState, action) =>
{
    switch (action.type)
    {
        case SEND_STOPREQUEST_CANCELLATION:
            return Object.assign({}, state, {stopRequestCancelled: action.stopRequestCancelled,
                isCancellingStopRequest: action.isCancellingStopRequest})

        case STOPREQUEST_CANCELLED:
            return Object.assign({}, state, {stopRequestCancelled: action.stopRequestCancelled,
                isCancellingStopRequest: action.isCancellingStopRequest})

        case STOPREQUEST_CANCELLATION_ERROR:
            return Object.assign({}, state, {stopRequestCancelled: action.stopRequestCancelled,
                isCancellingStopRequest: action.isCancellingStopRequest,
                stopRequestCancellationError: action.stopRequestCancellationError})

        default:
            return state
    }
}

export default fetchReducer
