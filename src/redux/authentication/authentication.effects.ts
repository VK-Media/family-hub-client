import { ThunkAction } from 'redux-thunk'

import server from '../../apis/server.api'
import i18n from '../../i18n/i18n'
import {
	IAuthenticationAction,
	IAuthenticationState,
	ICreateUserInput,
	ILoginInput
} from '../../types/authentication/authentication.types'
import {
	setAuthenticationData,
	setLoading,
	setLoginError,
	setRegisterError
} from './authentication.actions'

type Effect = ThunkAction<any, IAuthenticationState, any, IAuthenticationAction>

export const login = (data: ILoginInput): Effect => async dispatch => {
	try {
		const response = await server.post('/auth', data)

		if (response.status === 200) {
			localStorage.setItem(
				'authentication',
				JSON.stringify(response.data.jwt)
			)

			dispatch(setAuthenticationData(response.data.jwt))
			dispatch(setLoading(false))
			return Promise.resolve()
		}
	} catch (error) {
		if (error.response.status === 400) {
			dispatch(setLoginError(i18n.t('Invalid email or password')))
			dispatch(setLoading(false))
			return Promise.reject()
		}
	}
}

export const register = (data: ICreateUserInput): Effect => async dispatch => {
	try {
		const response = await server.post('/user', data)

		if (response.status === 201) {
			dispatch(setAuthenticationData(response.data.jwt))
			dispatch(setLoading(false))
			return Promise.resolve()
		}
	} catch (error) {
		if (error.response.status === 400) {
			dispatch(setRegisterError(i18n.t('Something went wrong...')))
			dispatch(setLoading(false))
			return Promise.reject()
		}
	}
}

export const setAuthenticationFromLocalStorage = (): Effect => async dispatch => {
	const localStorageAuthentication = localStorage.getItem('authentication')

	if (localStorageAuthentication) {
		dispatch(setAuthenticationData(JSON.parse(localStorageAuthentication)))
	}
}
