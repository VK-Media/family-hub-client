import produce from 'immer'

import {
	IAuthenticationAction,
	IAuthenticationState
} from '../../types/authentication/authentication.types'

export const initialState: IAuthenticationState = {
	loginError: '',
	registerError: '',
	loading: false
}

const reducer = (state = initialState, action: IAuthenticationAction) => {
	switch (action.type) {
		case 'setAuthenticationData':
			return produce(state, draft => {
				draft.jwt = action.payload.jwt
				draft.user = action.payload.user
			})
		case 'setLoginError':
			return produce(state, draft => {
				draft.loginError = action.payload
			})
		case 'setRegisterError':
			return produce(state, draft => {
				draft.registerError = action.payload
			})
		case 'setLoading':
			return produce(state, draft => {
				draft.loading = action.payload
			})
		default:
			return state
	}
}

export default reducer
