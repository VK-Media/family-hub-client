import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import LoadingScreen from './loaders/LoadingScreen'
import Routes from './Routes'

import { setAuthenticationFromLocalStorage } from '../redux/authentication/authentication.effects'
import { IAppProps, IState } from '../types/general.types'

import styles from './App.module.scss'

const App: React.FC<IAppProps> = ({
	setAuthenticationFromLocalStorage,
	loading
}) => {
	useEffect(() => {
		setAuthenticationFromLocalStorage()
	}, [setAuthenticationFromLocalStorage])

	const renderApp = () => {
		if (!loading) return <Routes />
		return <LoadingScreen />
	}

	return <div className={styles.app}>{renderApp()}</div>
}

const mapStateToProps = (state: IState) => {
	return {
		loading: state.authentication.loading
	}
}

export default connect(mapStateToProps, { setAuthenticationFromLocalStorage })(
	App
)
