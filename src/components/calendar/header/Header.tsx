import React from 'react'
import { useTranslation } from 'react-i18next'

import styles from './Header.module.scss'

import { ReactComponent as Left } from './chevron-left-light.svg'
import { ReactComponent as Right } from './chevron-right-light.svg'

interface IHeaderProps {
	heading: string
	viewMode: string
	setViewMode(view: string): void
	prevClicked(): void
	todayClicked(): void
	nextClicked(): void
}

const Header: React.FC<IHeaderProps> = ({
	heading,
	viewMode,
	setViewMode,
	prevClicked,
	todayClicked,
	nextClicked
}) => {
	const { t } = useTranslation()

	const renderViewModeButtons = () => {
		const viewModes = ['Year', 'Month', 'Week']

		return viewModes.map(view => {
			const lowerCase = view.toLowerCase()

			return (
				<div
					key={view}
					className={
						viewMode === lowerCase ? styles.active : undefined
					}
					onClick={() => {
						setViewMode(lowerCase)
					}}
				>
					{t(view)}
				</div>
			)
		})
	}

	return (
		<div className={styles.header}>
			<h1>{heading}</h1>
			<div className={styles.view}>{renderViewModeButtons()}</div>
			<div className={styles.buttons}>
				<div onClick={prevClicked}>
					<Left />
				</div>
				<div className={styles.today} onClick={todayClicked}>
					{t('Today')}
				</div>
				<div onClick={nextClicked}>
					<Right />
				</div>
			</div>
		</div>
	)
}

export default Header
