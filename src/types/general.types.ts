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
	loading: boolean
	setAuthenticationFromLocalStorage(): () => void
}

export interface ILoaderProps {
	show: boolean
}

export interface ILandingPageNavigationProps {
	jwt: string
}
