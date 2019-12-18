import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import styles from './LandingPageNavigation.module.scss'

const LandingPageNavigation: React.FC = () => {
	const { t } = useTranslation()

	const getMenuLinks = () => {
		return [
			{ path: '/', text: t('Home') },
			{ path: t('/login'), text: t('Login') },
			{ path: t('/register'), text: t('Register') }
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

	return renderMenuLinks()
}

export default LandingPageNavigation
