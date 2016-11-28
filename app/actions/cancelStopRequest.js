import config from '../config/config'

export const SEND_STOPREQUEST_FROM_CANCELLATION = 'SEND_STOPREQUEST_CANCELLATION'
export const STOPREQUEST_FROM_CANCELLED = 'STOPREQUEST_CANCELLED'
export const STOPREQUEST_FROM_CANCELLATION_ERROR ='STOPREQUEST_CANCELLATION_ERROR'

export const SEND_STOPREQUEST_DESTINATION_CANCELLATION = 'SEND_STOPREQUEST_CANCELLATION'
export const STOPREQUEST_DESTINATION_CANCELLED = 'STOPREQUEST_CANCELLED'
export const STOPREQUEST_DESTINATION_CANCELLATION_ERROR ='STOPREQUEST_CANCELLATION_ERROR'

const API_ENDPOINT = '/stoprequests/cancel'

export let requestStopRequestCancellation = function(fromVehicle)
{
    return {
        type: fromVehicle ? SEND_STOPREQUEST_FROM_CANCELLATION : SEND_STOPREQUEST_DESTINATION_CANCELLATION,
        stopRequestCancelled: false,
        isCancellingStopRequest: true
    }
}

export let receiveStopRequestCancellationConfirmation = function(fromVehicle)
{
    return {
        type: fromVehicle ? STOPREQUEST_FROM_CANCELLED : STOPREQUEST_DESTINATION_CANCELLED,
        stopRequestCancelled: true,
        isCancellingStopRequest: false
    }
}

export let stopRequestCancellationError = function(fromVehicle, error)
{
    return {
        type: fromVehicle ? STOPREQUEST_FROM_CANCELLATION_ERROR : STOPREQUEST_DESTINATION_CANCELLATION_ERROR,
        stopRequestCancelled: false,
        isCancellingStopRequest: false,
        stopRequestCancellationError: error
    }
}

export let cancelStopRequest = function(requestId, fromVehicle)
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
                dispatch(receiveStopRequestCancellationConfirmation(fromVehicle))

                // return false as there are no errors
                return false
            }
            else {
                dispatch(stopRequestCancellationError(fromVehicle))

                // return true as there is an error
                return true
            }
        })
        .catch(error => {
            dispatch(stopRequestCancellationError(error, fromVehicle))

            // return true as there is an error
            return true
        })
    }
}
