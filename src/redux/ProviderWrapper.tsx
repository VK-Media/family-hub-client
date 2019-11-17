import React from 'react'
import { Provider } from 'react-redux'
import { applyMiddleware, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

import middlewares from './middlewares'
import reducers from './rootReducer'

const ProviderWrapper: React.FC = ({ children }) => {
	const store = createStore(
		reducers,
		composeWithDevTools(applyMiddleware(...middlewares))
	)

	return <Provider store={store}>{children}</Provider>
}

export default ProviderWrapper
