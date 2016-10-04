const API_URL = 'https://stop20.herokuapp.com'

export const SEND_STOPREQUEST = 'SEND_STOPREQUEST'
export const RECEIVE_CONFIRM = 'RECEIVE_CONFIRM'

let requestStoprequest = function(bus_id, stop_id, request_type)
{
    return {
        type: SEND_STOPREQUEST,
        bus_id: bus_id,
        stop_id: stop_id,
        request_type: request_type
    }
}

let receiveConfirm = function()
{
    return {type: RECEIVE_CONFIRM}
}

export let sendStoprequest = function(bus_id, stop_id, request_type)
{
    return dispatch => {
        dispatch(requestStoprequest(bus_id, stop_id, request_type))

        return fetch(API_URL + '/stoprequests', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                bus_id: bus_id,
                stop_id: stop_id,
                request_type: request_type
            })
        })
      .then(dispatch(receiveConfirm()))
    }
}
