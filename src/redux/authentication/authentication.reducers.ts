import produce from 'immer'

import {
	IAuthenticationAction,
	IAuthenticationState
} from '../../types/authentication/authentication.types'

export const initialState: IAuthenticationState = {
	loginError: false,
	registerError: false
}

const reducer = (state = initialState, action: IAuthenticationAction) => {
	switch (action.type) {
		case 'setAuthenticationData':
			return produce(state, draft => {
				draft.jwt = action.payload.jwt
				draft.user = action.payload.user
			})
		case 'toggleLoginError':
			return produce(state, draft => {
				draft.loginError = !state.loginError
			})
		case 'setRegisterError':
			return produce(state, draft => {
				draft.registerError = true
			})
		default:
			return state
	}
}

export default reducer
