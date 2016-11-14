import { combineReducers } from 'redux'

import fetchReducer from './fetchReducer'
import fetchRouteStopsReducer from './fetchRouteStopsReducer'
import locationReducer from './locationReducer'
import fcmReducer from './fcmReducer'
import routes from './routes'

const reducers = combineReducers({
    fetchReducer,
    fetchRouteStopsReducer,
    locationReducer,
    fcmReducer,
    routes
})

export default reducers
