import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import LoadingScreen from './loaders/LoadingScreen'
import Routes from './Routes'

import { setAuthenticationFromLocalStorage } from '../redux/authentication/authentication.effects'
import { IAppProps, IState } from '../types/general.types'

const App: React.FC<IAppProps> = ({
	setAuthenticationFromLocalStorage,
	user
}) => {
	useEffect(() => {
		setAuthenticationFromLocalStorage()
	}, [setAuthenticationFromLocalStorage])

	if (user) return <Routes />
	return <LoadingScreen />
}

const mapStateToProps = (state: IState) => {
	return {
		user: state.authentication.user
	}
}

export default connect(mapStateToProps, { setAuthenticationFromLocalStorage })(
	App
)
