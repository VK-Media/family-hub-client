import { ThunkAction } from 'redux-thunk'

import server from '../../apis/server.api'
import {
	IAuthenticationAction,
	IAuthenticationState,
	ICreateUserInput,
	ILoginInput
} from '../../types/authentication/authentication.types'
import {
	setAuthenticationData,
	setRegisterError,
	toggleLoginError
} from './authentication.actions'

type Effect = ThunkAction<any, IAuthenticationState, any, IAuthenticationAction>

export const login = (data: ILoginInput): Effect => async dispatch => {
	try {
		const response = await server.post('/auth', data)

		if (response.status === 200) {
			dispatch(setAuthenticationData(response.data))
			return Promise.resolve()
		}
	} catch (error) {
		if (error.response.status === 400) {
			dispatch(toggleLoginError())
			return Promise.reject()
		}
	}
}

export const register = (data: ICreateUserInput): Effect => async dispatch => {
	try {
		const response = await server.post('/user', data)

		if (response.status === 201) {
			dispatch(setAuthenticationData(response.data))
			return Promise.resolve()
		}
	} catch (error) {
		if (error.response.status === 400) {
			dispatch(setRegisterError())
			return Promise.reject()
		}
	}
}
