import React, { Suspense, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Link, Route, Router } from 'react-router-dom'

import Login from './authentication/Login'
import Register from './authentication/Register'
import Dashboard from './dashboard/Dashboard'
import LandingPage from './landingPage/LandingPage'

import i18n from '../i18n/i18n'
import { setAuthenticationFromLocalStorage } from '../redux/authentication/authentication.effects'
import { history } from '../utils/general.utils'

import styles from './App.module.scss'

interface IMenuLink {
	path: string
	text: string
}

interface IRoute {
	path: string
	exact: boolean
	component: React.FC
}

interface IAppProps {
	setAuthenticationFromLocalStorage(): () => void
}

const App: React.FC<IAppProps> = ({ setAuthenticationFromLocalStorage }) => {
	const [menuLinks, setMenuLinks] = useState<IMenuLink[]>([])
	const [routes, setRoutes] = useState<IRoute[]>([])

	useEffect(() => {
		getMenuLinks().then(res => setMenuLinks(res))
		getRoutes().then(res => setRoutes(res))

		setAuthenticationFromLocalStorage()
	}, [setAuthenticationFromLocalStorage])

	const getMenuLinks = async () => {
		await i18n.loadNamespaces('translation')
		return [
			{ path: '/', text: i18n.t('Home') },
			{ path: i18n.t('/login'), text: i18n.t('Login') },
			{ path: i18n.t('/register'), text: i18n.t('Register') }
		]
	}

	const getRoutes = async () => {
		await i18n.loadNamespaces('translation')
		return [
			{ path: '/', exact: true, component: LandingPage },
			{ path: i18n.t('/login'), exact: false, component: Login },
			{ path: i18n.t('/register'), exact: false, component: Register },
			{
				path: i18n.t('/app/dashboard'),
				exact: false,
				component: Dashboard
			}
		]
	}

	const renderMenuLinks = () => {
		if (menuLinks) {
			const links = menuLinks.map(menuLink => {
				return (
					<Link key={menuLink.path} to={menuLink.path}>
						{menuLink.text}
					</Link>
				)
			})

			return <div className={styles.links}>{links}</div>
		}

		return null
	}

	const renderRoutes = () => {
		if (routes) {
			return routes.map(route => {
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

		return null
	}

	return (
		<Suspense fallback="Loading...">
			<div className={styles.app}>
				<Router history={history}>
					{renderMenuLinks()}
					{renderRoutes()}
				</Router>
			</div>
		</Suspense>
	)
}

export default connect(null, { setAuthenticationFromLocalStorage })(App)
