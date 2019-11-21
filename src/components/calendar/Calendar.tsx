import React from 'react'
import { connect } from 'react-redux'

import { ICalendarProps } from '../../types/calendar/calendar.types'
import { IState } from '../../types/redux/state.types'
import MonthView from './views/Month'
import WeekView from './views/Week'
import YearView from './views/Year'

const Calendar: React.FC<ICalendarProps> = ({ viewMode }) => {
	// TODO: Add modal for adding new calendar event

	switch (viewMode) {
		case 0:
			return <YearView />
		case 2:
			return <WeekView />
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
