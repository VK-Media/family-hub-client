import {
	IAuthenticationState,
	ISetAuthenticationData,
	ISetRegisterError,
	IToggleLoginError
} from '../../types/authentication/authentication.types'

export const setAuthenticationData = (
	authenticationData: IAuthenticationState
): ISetAuthenticationData => ({
	type: 'setAuthenticationData',
	payload: authenticationData
})

export const toggleLoginError = (): IToggleLoginError => ({
	type: 'toggleLoginError'
})

export const setRegisterError = (): ISetRegisterError => ({
	type: 'setRegisterError'
})
