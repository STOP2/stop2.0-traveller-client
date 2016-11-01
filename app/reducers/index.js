import { combineReducers } from 'redux'

import fetchReducer from './fetchReducer'
import locationReducer from './locationReducer'
import fcmReducer from './fcmReducer'
import routes from './routes'

const reducers = combineReducers({
    fetchReducer,
    locationReducer,
    fcmReducer,
    routes
})

export default reducers
