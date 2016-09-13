import { combineReducers } from 'redux'

import test from './test'
import routes from './routes'

const reducers = combineReducers({
  test,
  routes
})

export default reducers
