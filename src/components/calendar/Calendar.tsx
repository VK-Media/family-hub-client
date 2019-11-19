import React from 'react'
import { connect } from 'react-redux'

import { viewModes } from '../../types/calendar/calendar.types'
import { IState } from '../../types/redux/state.types'
import MonthView from './views/Month'
import YearView from './views/Year'

import styles from './Calendar.module.scss'

interface ICalendarProps {
	viewMode: viewModes
}

const Calendar: React.FC<ICalendarProps> = ({ viewMode }) => {
	// TODO: Add modal for adding new calendar event

	switch (viewMode) {
		case 0:
			return <YearView />
		case 2:
			return <div className={`${styles.calendar} ${styles[viewMode]}`} />
		default:
			return <MonthView />
	}
}

const mapStateToProps = (state: IState) => {
	return {
		viewMode: state.calendar.viewMode
	}
}

export default connect(mapStateToProps, {})(Calendar)
