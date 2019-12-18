import React from 'react'
import { useTranslation } from 'react-i18next'
import { Route, Router } from 'react-router-dom'

import Login from './authentication/Login'
import Register from './authentication/Register'
import Dashboard from './dashboard/Dashboard'
import LandingPage from './landingPage/LandingPage'

import { history } from '../utils/general.utils'

const Routes: React.FC = () => {
	const { t } = useTranslation()
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

	return <Router history={history}>{renderRoutes()}</Router>
}

export default Routes
