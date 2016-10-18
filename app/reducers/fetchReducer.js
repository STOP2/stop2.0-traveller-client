import { REQUEST_DEPARTURES, RECEIVE_DEPARTURES, REQUEST_ERROR } from '../actions/fetchDeparturesActions'
import { SEND_STOPREQUEST, RECEIVE_CONFIRM } from '../actions/sendStoprequest'

let initialState = {
    stop: {schedule: []},
    isFetching: false,
    isReady: false,
    sentStoprequest: false,
    error: false
}

const fetchReducer = (state = initialState, action) =>
{
    switch (action.type)
    {
    case REQUEST_DEPARTURES:
        return Object.assign({}, state, {isFetching: true})

    case RECEIVE_DEPARTURES:
        return Object.assign({}, state, {
            isFetching: false,
            isReady: true,
            error: false,
            stop: action.departures[0].stop
        }) // return only the first stop (temporarily)


    case SEND_STOPREQUEST:
        return Object.assign({}, state, {sentStoprequest: false})

    case RECEIVE_CONFIRM:
        return Object.assign({}, state, {sentStoprequest: true})

    case REQUEST_ERROR:
        return Object.assign({}, state, {error: true})

    default:
        return state
    }
}

export default fetchReducer
