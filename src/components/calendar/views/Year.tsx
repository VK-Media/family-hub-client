import React, { useEffect, useState } from 'react'

import { IYearProps } from '../../../types/calendar/calendar.types'
import {
	getDaysLabels,
	getMonthDates,
	getMonthLabels,
	getToday
} from '../../../utils/calendar/calendar.utils'
import Date from '../date/Date'
import Header from '../header/Header'

import styles from './Year.module.scss'

const Year: React.FC<IYearProps> = ({
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

	const renderDays = () => {
		return days.map((day: string) => {
			const firstLetter = day.substr(0, 1)

			return (
				<div key={day} className={styles.day}>
					{firstLetter.toUpperCase()}
				</div>
			)
		})
	}

	const renderMonths = () => {
		const monthDates = months.map((month, i) => {
			return getMonthDates({ ...displayDate, month: i })
		})

		return monthDates.map((month, i) => {
			const dates = month.map(date => {
				return <Date key={date.id} {...date} view="year" />
			})

			return (
				<div key={i} className={styles.month}>
					<div className={styles['month-name']}>{months[i]}</div>
					<div className={styles['week-days']}>{renderDays()}</div>
					<div className={styles.dates}>{dates}</div>
				</div>
			)
		})
	}

	const goToPreviousYear = () => {
		setDisplayDate({ ...displayDate, year: displayDate.year - 1 })
	}

	const goToToday = () => {
		setDisplayDate({ ...getToday() })
	}

	const goToNextYear = () => {
		setDisplayDate({ ...displayDate, year: displayDate.year + 1 })
	}

	return (
		<div className={`${styles.calendar} ${styles[viewMode]}`}>
			<Header
				heading={`${displayDate.year}`}
				viewMode={viewMode}
				setViewMode={setViewMode}
				prevClicked={goToPreviousYear}
				todayClicked={goToToday}
				nextClicked={goToNextYear}
			/>
			<div className={styles['months-container']}>{renderMonths()}</div>
		</div>
	)
}

export default Year
