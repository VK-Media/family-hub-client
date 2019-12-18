import {
	IAuthenticationState,
	IUser
} from './authentication/authentication.types'
import { ICalendarState } from './calendar/calendar.types'

export interface IState {
	calendar: ICalendarState
	authentication: IAuthenticationState
}

export interface IAppProps {
	user?: IUser
	setAuthenticationFromLocalStorage(): () => void
}

export interface ILoaderProps {
	show: boolean
}
