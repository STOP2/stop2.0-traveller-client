import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import { createStore, applyMiddleware } from 'redux'
import rootReducer from '../reducers'

export default function configureStore ()
{
    const isDebuggingInChrome = __DEV__ && !!window.navigator.userAgent
    const logger = createLogger({
	  predicate: (getState, action) => isDebuggingInChrome,
	  collapsed: true,
	  duration: true
    })

    const store = createStore(rootReducer, applyMiddleware(thunkMiddleware, logger))

    if (module.hot)
    {
        module.hot.accept(() =>
    {
            const nextRootReducer = require('../reducers/index').default

            store.replaceReducer(nextRootReducer)
        })
    }

    return store
}
