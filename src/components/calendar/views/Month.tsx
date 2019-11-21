import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'

import { changeDisplayDate } from '../../../redux/calendar/calendar.actions'
import { IMonthProps } from '../../../types/calendar/calendar.types'
import { IState } from '../../../types/redux/state.types'
import {
	getDaysLabels,
	getMomentFromDisplayDate,
	getMonthDates,
	getMonthLabels,
	getToday
} from '../../../utils/calendar/calendar.utils'

import Date from '../date/Date'
import Header from '../header/Header'
import styles from './Month.module.scss'

const Month: React.FC<IMonthProps> = ({ displayDate, changeDisplayDate }) => {
	const [months, setMonths] = useState<string[]>([])
	const [days, setDays] = useState<string[]>([])

	const currentMoment = getMomentFromDisplayDate(displayDate)

	useEffect(() => {
		getMonthLabels().then(res => setMonths(res))
		getDaysLabels().then(res => setDays(res))
	}, [])

	const headerHeading = `${months[displayDate.month]} ${displayDate.year}`

	const goToPreviousMonth = () => {
		const previousMonth = currentMoment.subtract(1, 'month')

		changeDisplayDate({
			year: previousMonth.year(),
			month: previousMonth.month(),
			date: previousMonth.date()
		})
	}

	const goToToday = () => {
		changeDisplayDate({ ...getToday() })
	}

	const goToNextMonth = () => {
		const nextMonth = currentMoment.add(1, 'month')

		changeDisplayDate({
			year: nextMonth.year(),
			month: nextMonth.month(),
			date: nextMonth.date()
		})
	}

	const renderDays = () => {
		const daysHtml = days.map((day: string) => {
			return (
				<div key={day} className={styles.day}>
					{day}
				</div>
			)
		})

		return <div className={styles.grid}>{daysHtml}</div>
	}

	const renderDates = () => {
		const dates = getMonthDates(displayDate).map(date => {
			return <Date key={date.id} {...date} view="month" />
		})

		return <div className={`${styles.grid} ${styles.body}`}>{dates}</div>
	}

	return (
		<div className={`${styles.calendar} ${styles.month}`}>
			<Header
				heading={headerHeading}
				prevClicked={goToPreviousMonth}
				todayClicked={goToToday}
				nextClicked={goToNextMonth}
			/>
			{renderDays()}
			{renderDates()}
		</div>
	)
}

const mapStateToProps = (state: IState) => {
	return {
		displayDate: state.calendar.displayDate
	}
}

export default connect(mapStateToProps, { changeDisplayDate })(Month)
