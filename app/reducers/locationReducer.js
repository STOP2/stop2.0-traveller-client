import { SET_LOCATION } from '../actions/locationActions'

let initialState = {locationData: {}}

const locationReducer = (state = initialState, action) =>
{
    switch (action.type)
  {
    case SET_LOCATION:
        return Object.assign({}, state, {locationData: action.locationData})

    default:
        return state
    }
}

export default locationReducer
