import { combineReducers } from 'redux'

import fetchReducer from './fetchReducer'
import fetchRouteStopsReducer from './fetchRouteStopsReducer'
import locationReducer from './locationReducer'
import routes from './routes'

const reducers = combineReducers({
    fetchReducer,
    fetchRouteStopsReducer,
    locationReducer,
    routes
})

export default reducers
