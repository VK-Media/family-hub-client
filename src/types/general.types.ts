import { IAuthenticationState } from './authentication/authentication.types'
import { ICalendarState } from './calendar/calendar.types'

export interface IState {
	calendar: ICalendarState
	authentication: IAuthenticationState
}
