import { SEND_STOPREQUEST, RECEIVE_CONFIRM } from '../actions/sendStoprequest'
import {RESET_STATE} from '../actions/resetStateAction'
import { ActionConst } from 'react-native-router-flux'

let initialState = {
    stops: [],
    isFetching: false,
    isReady: false,
    sentStoprequestFromStop: false,
    sentStoprequestFromVehicle: false,
    error: false,
    startStop: null,
    currentVehicle: null
}

const stopRequestReducer = (state = initialState, action) =>
{
    switch (action.type)
    {
    case SEND_STOPREQUEST:
        if (action.fromVehicle)
        {
            return Object.assign({}, state, {sentStoprequestFromVehicle: action.sentStoprequest})
        }
        else
        {
            return Object.assign({}, state, {sentStoprequestFromStop: action.sentStoprequest})
        }


    case RECEIVE_CONFIRM:
        if (action.fromVehicle)
        {
            return Object.assign({}, state, {sentStoprequestFromVehicle: action.sentStoprequest})
        }
        else
        {
            return Object.assign({}, state, {
                sentStoprequestFromStop: action.sentStoprequest,
                startStop: action.stop,
                currentVehicle: action.vehicle
            })
        }

    case RESET_STATE:
        return Object.assign({}, state, initialState)

    case ActionConst.FOCUS:
        return Object.assign({}, state, { sentStoprequest: false })

    default:
        return state
    }
}

export default stopRequestReducer
