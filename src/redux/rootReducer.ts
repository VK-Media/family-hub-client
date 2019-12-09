import { combineReducers } from 'redux'

import authenticationReducer from './authentication/authentication.reducers'
import calendarReducer from './calendar/calendar.reducers'

const reducer = combineReducers({
	calendar: calendarReducer,
	authentication: authenticationReducer
})

export default reducer
