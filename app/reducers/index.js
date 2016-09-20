import { combineReducers } from 'redux'

import fetch from './fetch'
import routes from './routes'

const reducers = combineReducers({
  fetch,
  routes
})

export default reducers
