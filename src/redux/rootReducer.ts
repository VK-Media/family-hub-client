import { combineReducers } from 'redux'

// import dataReducer from './data/data.reducer'
import calendarReducer from './calendar/calendar.reducers'

const reducer = combineReducers({
	calendar: calendarReducer
})

export default reducer
