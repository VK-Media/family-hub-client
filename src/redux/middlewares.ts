import { Middleware } from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'

const middlewares: Middleware[] = [thunk]

if (process.env.NODE_ENV === 'development') {
	middlewares.push(logger)
}

export default middlewares
