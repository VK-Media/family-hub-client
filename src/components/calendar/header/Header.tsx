import React from 'react'
import { useTranslation } from 'react-i18next'
import { connect } from 'react-redux'

import styles from './Header.module.scss'

import { changeViewMode } from '../../../redux/calendar/calendar.actions'
import { viewModes } from '../../../types/calendar/calendar.types'
import { IState } from '../../../types/redux/state.types'
import { ReactComponent as Left } from './chevron-left-light.svg'
import { ReactComponent as Right } from './chevron-right-light.svg'

interface IHeaderProps {
	heading: string
	viewMode: viewModes
	prevClicked(): void
	todayClicked(): void
	nextClicked(): void
	changeViewMode(viewMode: viewModes): void
}

const Header: React.FC<IHeaderProps> = ({
	heading,
	viewMode,
	prevClicked,
	todayClicked,
	nextClicked,
	changeViewMode
}) => {
	const { t } = useTranslation()

	const renderViewModeButtons = () => {
		const viewModeLabels = ['Year', 'Month', 'Week']

		return viewModeLabels.map((view, i) => {
			return (
				<div
					key={view}
					className={viewMode === i ? styles.active : undefined}
					onClick={() => {
						changeViewMode(i)
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

const mapStateToProps = (state: IState) => {
	return {
		viewMode: state.calendar.viewMode
	}
}

export default connect(mapStateToProps, { changeViewMode })(Header)
