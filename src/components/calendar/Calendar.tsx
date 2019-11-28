import React from 'react'
import { connect } from 'react-redux'

import { ICalendarProps } from '../../types/calendar/calendar.types'
import { IState } from '../../types/redux/state.types'
import EventForm from './event/form/Form'
import MonthView from './views/Month'
import WeekView from './views/Week'
import YearView from './views/Year'

const Calendar: React.FC<ICalendarProps> = ({ viewMode }) => {
	const renderView = () => {
		switch (viewMode) {
			case 0:
				return <YearView />
			case 2:
				return <WeekView />
			default:
				return <MonthView />
		}
	}

	return (
		<>
			<EventForm />
			{renderView()}
		</>
	)
}

const mapStateToProps = (state: IState) => {
	return {
		viewMode: state.calendar.viewMode
	}
}

export default connect(mapStateToProps, {})(Calendar)
