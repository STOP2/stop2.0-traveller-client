import { combineReducers } from 'redux'

import fetchDeparturesReducer from './fetchDeparturesReducer'
import stopRequestReducer from './stopRequestReducer'
import fetchRouteStopsReducer from './fetchRouteStopsReducer'
import locationReducer from './locationReducer'
import fcmReducer from './fcmReducer'
import routes from './routes'

const reducers = combineReducers({
    fetchDeparturesReducer,
    stopRequestReducer,
    fetchRouteStopsReducer,
    locationReducer,
    fcmReducer,
    routes
})

export default reducers
