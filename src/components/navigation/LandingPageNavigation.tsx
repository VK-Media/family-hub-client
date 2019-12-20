import React from 'react'
import { useTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { ILandingPageNavigationProps, IState } from '../../types/general.types'

import styles from './LandingPageNavigation.module.scss'
import { validateJwt } from '../../utils/authentication.utils'

const LandingPageNavigation: React.FC<ILandingPageNavigationProps> = ({
	jwt
}) => {
	const { t } = useTranslation()

	const getMenuLinks = () => {
		const routes = [{ path: '/', text: t('Home') }]

		if (validateJwt(jwt)) {
			routes.push({ path: t('/app/dashboard'), text: t('Dashboard') })
		} else {
			routes.push(
				{ path: t('/login'), text: t('Login') },
				{ path: t('/register'), text: t('Register') }
			)
		}

		return routes
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

	return renderMenuLinks()
}

const mapStateToProps = (state: IState) => {
	return {
		jwt: state.authentication.jwt
	}
}

export default connect(mapStateToProps, {})(LandingPageNavigation)
