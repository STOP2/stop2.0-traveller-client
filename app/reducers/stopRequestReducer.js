import { SEND_STOPREQUEST, RECEIVE_CONFIRM } from '../actions/sendStoprequest'
import { ActionConst } from 'react-native-router-flux'

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
    let stop = state.startStop == null ? action.stop : state.startStop

    switch (action.type)
    {
    case SEND_STOPREQUEST:
        return Object.assign({}, state, {sentStoprequest: action.sentStoprequest})


    case RECEIVE_CONFIRM:
        return Object.assign({}, state, {
            sentStoprequest: action.sentStoprequest,
            startStop: stop,
            currentVehicle: action.vehicle
        })

    case ActionConst.FOCUS:
        return Object.assign({}, state, { sentStoprequest: false })

    default:
        return state
    }
}

export default stopRequestReducer
