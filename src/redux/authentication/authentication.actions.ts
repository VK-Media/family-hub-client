import {
	ISetAuthenticationData,
	ISetLoading,
	ISetLoginError,
	ISetRegisterError
} from '../../types/authentication/authentication.types'

export const setAuthenticationData = (jwt: string): ISetAuthenticationData => ({
	type: 'setAuthenticationData',
	payload: jwt
})

export const setLoginError = (error: string): ISetLoginError => ({
	type: 'setLoginError',
	payload: error
})

export const setRegisterError = (error: string): ISetRegisterError => ({
	type: 'setRegisterError',
	payload: error
})

export const setLoading = (loading: boolean): ISetLoading => ({
	type: 'setLoading',
	payload: loading
})
