import { combineReducers } from 'redux'

import fetchDeparturesReducer from './fetchDeparturesReducer'
import stopRequestReducer from './stopRequestReducer'
import fetchRouteStopsReducer from './fetchRouteStopsReducer'
import gpsLocationReducer from './gpsLocationReducer'
import beaconLocationReducer from './beaconLocationReducer'
import fcmReducer from './fcmReducer'
import routes from './routes'

const reducers = combineReducers({
    fetchDeparturesReducer,
    stopRequestReducer,
    fetchRouteStopsReducer,
    gpsLocationReducer,
    beaconLocationReducer,
    fcmReducer,
    routes
})

export default reducers
