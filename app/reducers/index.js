import { combineReducers } from 'redux'

import fetchReducer from './fetchReducer'
import routes from './routes'

const reducers = combineReducers({
  fetchReducer,
  routes
})

export default reducers
