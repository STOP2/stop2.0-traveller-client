import { REQUEST_DEPARTURES, RECEIVE_DEPARTURES, REQUEST_ERROR } from '../actions/fetchDeparturesActions'
import { SEND_STOPREQUEST, RECEIVE_CONFIRM } from '../actions/sendStoprequest'

let initialState = {
    stops: [],
    isFetching: false,
    isReady: false,
    sentStoprequest: false,
    error: false,
    routeStops: {}
}

const fetchReducer = (state = initialState, action) =>
{
    switch (action.type)
    {
    case REQUEST_DEPARTURES:
        return Object.assign({}, state, {isFetching: action.isFetching})

    case RECEIVE_DEPARTURES:
        return Object.assign({}, state, {
            isFetching: action.isFetching,
            isReady: action.isReady,
            error: action.error,
            stops: action.departures
        }) // return only the first stop (temporarily)


    case SEND_STOPREQUEST:
        return Object.assign({}, state, {sentStoprequest: action.sentStoprequest})


    case RECEIVE_CONFIRM:
        return Object.assign({}, state, {sentStoprequest: action.sentStoprequest})

    case REQUEST_ERROR:
        return Object.assign({}, state, {error: action.error})

    default:
        return state
    }
}

export default fetchReducer
