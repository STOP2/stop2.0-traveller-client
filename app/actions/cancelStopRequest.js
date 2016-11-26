import config from '../config/config'

export const SEND_STOPREQUEST_CANCELLATION = 'SEND_STOPREQUEST_CANCELLATION'
export const STOPREQUEST_CANCELLED = 'STOPREQUEST_CANCELLED'
export const STOPREQUEST_CANCELLATION_ERROR ='STOPREQUEST_CANCELLATION_ERROR'

const API_ENDPOINT = '/stoprequests/cancel'

export let requestStopRequestCancellation = function()
{
    return {
        type: SEND_STOPREQUEST_CANCELLATION,
        stopRequestCancelled: false,
        isCancellingStopRequest: true
    }
}

export let receiveStopRequestCancellationConfirmation = function()
{
    return {
        type: STOPREQUEST_CANCELLED,
        stopRequestCancelled: true,
        isCancellingStopRequest: false
    }
}

export let stopRequestCancellationError = function(error)
{
    return {
        type: STOPREQUEST_CANCELLATION_ERROR,
        stopRequestCancelled: false,
        isCancellingStopRequest: false,
        stopRequestCancellationError: error
    }
}

export let cancelStopRequest = function(requestId)
{
    return dispatch =>
    {
        dispatch(requestStopRequestCancellation())

        return fetch(config.API_URL + API_ENDPOINT + '?request_id=' + requestId, {
            method: 'POST',
            headers:
            {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                dispatch(receiveStopRequestCancellationConfirmation())
            }
            else {
                dispatch(stopRequestCancellationError())
            }
        })
        .catch(error => dispatch(stopRequestCancellationError(error)))
    }
}
