import React, { useState } from 'react'

import { IDisplayDate } from '../../types/calendar/calendar.types'
import { getToday } from '../../utils/calendar/calendar.utils'
import MonthView from './views/Month'
import YearView from './views/Year'

import styles from './Calendar.module.scss'

const Calendar: React.FC = () => {
	const [displayDate, setDisplayDate] = useState<IDisplayDate>({
		...getToday()
	})
	const [viewMode, setViewMode] = useState('year')

	// TODO: Add different views (year, month, week, day)
	// TODO: Add modal for adding new calendar event

	switch (viewMode) {
		case 'year':
			return (
				<YearView
					displayDate={displayDate}
					setDisplayDate={setDisplayDate}
					viewMode={viewMode}
					setViewMode={setViewMode}
				/>
			)
		case 'week':
			return (
				<div className={`${styles.calendar} ${styles[viewMode]}`}></div>
			)
		default:
			return (
				<MonthView
					displayDate={displayDate}
					setDisplayDate={setDisplayDate}
					viewMode={viewMode}
					setViewMode={setViewMode}
				/>
			)
	}
}

export default Calendar
