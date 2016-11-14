import config from '../config/config'

export const SEND_STOPREQUEST = 'SEND_STOPREQUEST'
export const RECEIVE_CONFIRM = 'RECEIVE_CONFIRM'

export let requestStoprequest = function(tripId, stopId)
{
    return {
        type: SEND_STOPREQUEST,
        sentStoprequest: false,
        trip_id: tripId,
        stop_id: stopId
    }
}

export let receiveConfirm = function()
{
    return {
        type: RECEIVE_CONFIRM,
        sentStoprequest: true
    }
}

export let sendStoprequest = function(tripId, stopId, fcmToken)
{
    return dispatch =>
    {
        dispatch(requestStoprequest(tripId, stopId))

        console.log(fcmToken)

        let stopRequest = JSON.stringify({
            trip_id: tripId,
            stop_id: stopId,
            device_id: fcmToken
        })

        return fetch(config.API_URL + '/stoprequests', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: stopRequest
        })
      .then(dispatch(receiveConfirm()))
    }
}
