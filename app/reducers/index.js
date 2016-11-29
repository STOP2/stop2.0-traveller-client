import { combineReducers } from 'redux'

import departures from './departures'
import stopRequest from './stopRequest'
import routeStops from './routeStops'
import gpsLocation from './gpsLocation'
import beacons from './beacons'
import pushNotifications from './pushNotifications'
import routes from './routes'

const reducers = combineReducers({
    departures,
    stopRequest,
    routeStops,
    gpsLocation,
    beacons,
    pushNotifications,
    routes
})

export default reducers
