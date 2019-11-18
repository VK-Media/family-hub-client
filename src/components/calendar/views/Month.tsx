import React, { useEffect, useState } from 'react'

import { IMonthProps } from '../../../types/calendar/calendar.types'
import {
	getDaysLabels,
	getMonthDates,
	getMonthLabels,
	getToday
} from '../../../utils/calendar/calendar.utils'

import Date from '../date/Date'
import Header from '../header/Header'
import styles from './Month.module.scss'

const Month: React.FC<IMonthProps> = ({
	displayDate,
	setDisplayDate,
	viewMode,
	setViewMode
}) => {
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
			setDisplayDate({ ...today })
		} else {
			setDisplayDate({
				year: previousYear,
				month: previousMonth,
				date: undefined
			})
		}
	}

	const goToToday = () => {
		setDisplayDate({ ...getToday() })
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
			setDisplayDate({ ...today })
		} else {
			setDisplayDate({
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
		<div className={`${styles.calendar} ${styles[viewMode]}`}>
			<Header
				heading={headerHeading}
				viewMode={viewMode}
				setViewMode={setViewMode}
				prevClicked={goToPreviousMonth}
				todayClicked={goToToday}
				nextClicked={goToNextMonth}
			/>
			{renderDays()}
			{renderDates()}
		</div>
	)
}

export default Month
