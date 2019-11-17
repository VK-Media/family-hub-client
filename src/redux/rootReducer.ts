import { combineReducers } from 'redux'

import dataReducer from './data/data.reducer'

const reducer = combineReducers({
	data: dataReducer
})

export default reducer
