const API_URL = 'https://stop20.herokuapp.com'

export const SEND_STOPREQUEST = 'SEND_STOPREQUEST'
export const RECEIVE_CONFIRM = 'RECEIVE_CONFIRM'

let requestStoprequest = function(busId, stopId, requestType)
{
    return {
        type: SEND_STOPREQUEST,
        bus_id: busId,
        stop_id: stopId,
        request_type: requestType
    }
}

let receiveConfirm = function()
{
    return {type: RECEIVE_CONFIRM}
}

export let sendStoprequest = function(busId, stopId, requestType)
{
    return dispatch =>
    {
        dispatch(requestStoprequest(busId, stopId, requestType))

        return fetch(API_URL + '/stoprequests', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                bus_id: busId,
                stop_id: stopId,
                request_type: requestType
            })
        })
      .then(dispatch(receiveConfirm()))
    }
}
