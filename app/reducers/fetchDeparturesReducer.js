import { REQUEST_DEPARTURES, RECEIVE_DEPARTURES, REQUEST_ERROR } from '../actions/fetchDeparturesActions'
import {RESET_STATE} from '../actions/resetStateAction'

let initialState = {
    stops: [],
    isFetching: false,
    isReady: false,
    sentStoprequest: false,
    error: false
}

const fetchDepartures = (state = initialState, action) =>
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
        })

    case REQUEST_ERROR:
        return Object.assign({}, state, {error: action.error})

    case RESET_STATE:
        return Object.assign({}, state, initialState)

    default:
        return state
    }
}

export default fetchDepartures
