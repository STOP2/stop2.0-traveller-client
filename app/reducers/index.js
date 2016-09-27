import { combineReducers } from 'redux'

import fetchReducer from './fetchReducer'
import locationReducer from './locationReducer'
import routes from './routes'

const reducers = combineReducers({
  fetchReducer,
  locationReducer,
  routes
})

export default reducers
