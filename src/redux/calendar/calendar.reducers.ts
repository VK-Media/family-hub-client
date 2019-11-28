import produce from 'immer'

import {
	CalendarAction,
	ICalendarState
} from '../../types/calendar/calendar.types'
import { getToday } from '../../utils/calendar/calendar.utils'

export const initialState: ICalendarState = {
	viewMode: 1,
	displayDate: { ...getToday() },
	showEventForm: false,
	eventFormDate: ''
}

const reducer = (state = initialState, action: CalendarAction) => {
	switch (action.type) {
		case 'changeViewMode':
			return produce(state, draft => {
				draft.viewMode = action.payload
			})
		case 'changeDisplayDate':
			return produce(state, draft => {
				draft.displayDate = action.payload
			})
		case 'openEventForm':
			return produce(state, draft => {
				draft.showEventForm = true
				draft.eventFormDate = action.payload
			})
		case 'closeEventForm':
			return produce(state, draft => {
				draft.showEventForm = false
				draft.eventFormDate = ''
			})
		default:
			return state
	}
}

export default reducer
