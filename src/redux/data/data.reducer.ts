import produce from 'immer'

import { DataAction, IDataState } from '../../types/redux/data.types'

export const initialState: IDataState = {
	data: []
}

const reducer = (state = initialState, action: DataAction) => {
	switch (action.type) {
		case 'addTextToData':
			return produce(state, draft => {
				draft.data.push(action.payload)
			})
		default:
			return state
	}
}

export default reducer
