import { REQUEST_DEPARTURES, RECEIVE_DEPARTURES } from '../actions/fetchDeparturesActions'
import { SEND_STOPREQUEST, RECEIVE_CONFIRM } from '../actions/sendStoprequest'

let initialState = {
  stop: [],
  isFetching: false,
  isSending: false
}

const fetchReducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_DEPARTURES:
      return Object.assign({}, state, {isFetching: true});
    break

    case RECEIVE_DEPARTURES:
      return Object.assign({}, state, {isFetching: false, stop: action.departures[0].stop}); // return only the first stop (temporarily)
    break

    case SEND_STOPREQUEST:
      return Object.assign({}, state, {isSending: true});
    break

    case RECEIVE_CONFIRM:
      return Object.assign({}, state, {isSending: false});
    break

    default:
      return state
  }
}

export default fetchReducer
