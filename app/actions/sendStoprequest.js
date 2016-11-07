import config from '../config/config'

export const SEND_STOPREQUEST = 'SEND_STOPREQUEST'
export const RECEIVE_CONFIRM = 'RECEIVE_CONFIRM'

export let requestStoprequest = function(tripId, stopId, requestType)
{
    return {
        type: SEND_STOPREQUEST,
        sentStoprequest: false,
        tripId: tripId,
        stopId: stopId,
        requestType: requestType
    }
}

export let receiveConfirm = function()
{
    return {
        type: RECEIVE_CONFIRM,
        sentStoprequest: true
    }
}

export let sendStoprequest = function(tripId, stopId, requestType)
{
    return dispatch =>
    {
        dispatch(requestStoprequest(tripId, stopId, requestType))

        let stopRequest = JSON.stringify({
            trip_id: tripId,
            stop_id: stopId,
            request_type: requestType
        })

        return fetch(config.API_URL + '/stoprequests', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: stopRequest
        })
      .then(dispatch(receiveConfirm()))
    }
}
