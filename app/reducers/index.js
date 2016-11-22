import { combineReducers } from 'redux'

import fetchDeparturesReducer from './fetchDeparturesReducer'
import stopRequestReducer from './stopRequestReducer'
import fetchRouteStopsReducer from './fetchRouteStopsReducer'
import locationReducer from './locationReducer'
import routes from './routes'

const reducers = combineReducers({
    fetchDeparturesReducer,
    stopRequestReducer,
    fetchRouteStopsReducer,
    locationReducer,
    routes
})

export default reducers
