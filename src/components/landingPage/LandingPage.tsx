import React from 'react'
import { useTranslation } from 'react-i18next'
import styles from './LandingPage.module.scss'

const LandingPage: React.FC = () => {
	const { t } = useTranslation()

	return (
		<div className={styles.background}>
			<div className={styles.content}>
				<h1>{t('Family Hub')}</h1>
				<p>{t('The ultimate tool for managing your family!')}</p>
			</div>
		</div>
	)
}

export default LandingPage
