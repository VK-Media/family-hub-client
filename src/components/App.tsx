import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import { Link, Route, Router } from 'react-router-dom'

import Login from './authentication/Login'
import Register from './authentication/Register'
import Dashboard from './dashboard/Dashboard'
import LandingPage from './landingPage/LandingPage'

import { setAuthenticationFromLocalStorage } from '../redux/authentication/authentication.effects'
import { IAppProps } from '../types/general.types'
import { history } from '../utils/general.utils'

import styles from './App.module.scss'

const App: React.FC<IAppProps> = ({ setAuthenticationFromLocalStorage }) => {
	const { t } = useTranslation()

	useEffect(() => {
		setAuthenticationFromLocalStorage()
	}, [setAuthenticationFromLocalStorage])

	const getMenuLinks = () => {
		return [
			{ path: '/', text: t('Home') },
			{ path: t('/login'), text: t('Login') },
			{ path: t('/register'), text: t('Register') }
		]
	}

	const getRoutes = () => {
		return [
			{ path: '/', exact: true, component: LandingPage },
			{ path: t('/login'), exact: false, component: Login },
			{ path: t('/register'), exact: false, component: Register },
			{
				path: t('/app/dashboard'),
				exact: false,
				component: Dashboard
			}
		]
	}

	const renderMenuLinks = () => {
		const links = getMenuLinks().map(menuLink => {
			return (
				<Link key={menuLink.path} to={menuLink.path}>
					{menuLink.text}
				</Link>
			)
		})

		return <div className={styles.links}>{links}</div>
	}

	const renderRoutes = () => {
		return getRoutes().map(route => {
			return (
				<Route
					key={route.path}
					path={route.path}
					exact={route.exact}
					component={route.component}
				/>
			)
		})
	}

	return (
		<div className={styles.app}>
			<Router history={history}>
				{renderMenuLinks()}
				{renderRoutes()}
			</Router>
		</div>
	)
}

export default connect(null, { setAuthenticationFromLocalStorage })(App)
