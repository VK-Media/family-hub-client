import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'

import { changeDisplayDate } from '../../../redux/calendar/calendar.actions'
import { IMonthProps } from '../../../types/calendar/calendar.types'
import { IState } from '../../../types/redux/state.types'
import {
	getDaysLabels,
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

	useEffect(() => {
		getMonthLabels().then(res => setMonths(res))
		getDaysLabels().then(res => setDays(res))
	}, [])

	const headerHeading = `${months[displayDate.month]} ${displayDate.year}`

	const goToPreviousMonth = () => {
		let previousYear = displayDate.year
		let previousMonth = displayDate.month - 1

		if (displayDate.month === 0) {
			previousYear = displayDate.year - 1
			previousMonth = 11
		}

		const today = getToday()

		if (previousYear === today.year && previousMonth === today.month) {
			changeDisplayDate({ ...today })
		} else {
			changeDisplayDate({
				year: previousYear,
				month: previousMonth,
				date: undefined
			})
		}
	}

	const goToToday = () => {
		changeDisplayDate({ ...getToday() })
	}

	const goToNextMonth = () => {
		let nextYear = displayDate.year
		let nextMonth = displayDate.month + 1

		if (displayDate.month === 11) {
			nextYear = displayDate.year + 1
			nextMonth = 0
		}

		const today = getToday()

		if (nextYear === today.year && nextMonth === today.month) {
			changeDisplayDate({ ...today })
		} else {
			changeDisplayDate({
				year: nextYear,
				month: nextMonth,
				date: undefined
			})
		}
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
