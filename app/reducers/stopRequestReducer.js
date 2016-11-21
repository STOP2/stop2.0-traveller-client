import { SEND_STOPREQUEST, RECEIVE_CONFIRM } from '../actions/sendStoprequest'

let initialState = {
    stops: [],
    isFetching: false,
    isReady: false,
    sentStoprequest: false,
    error: false,
    startStop: null,
    currentVehicle: null
}

const stopRequestReducer = (state = initialState, action) =>
{
    switch (action.type)
    {
    case SEND_STOPREQUEST:
        return Object.assign({}, state, {sentStoprequest: action.sentStoprequest})


    case RECEIVE_CONFIRM:
        return Object.assign({}, state, {
            sentStoprequest: action.sentStoprequest,
            startStop: action.stop,
            currentVehicle: action.vehicle
        })

    default:
        return state
    }
}

export default stopRequestReducer
