import { REQUEST_DEPARTURES, RECEIVE_DEPARTURES } from '../actions/fetchDeparturesActions'

let initialState = {
  stop: [],
  isFetching: false
}

const fetchReducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_DEPARTURES:
      return Object.assign({}, state, {isFetching: true});
    break

    case RECEIVE_DEPARTURES:
      return Object.assign({}, state, {isFetching: false, stop: action.departures[0].stop}); // return only the first stop (temporarily)
    break

    default:
      return state
  }
}

export default fetchReducer