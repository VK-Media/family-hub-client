import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'

import { changeDisplayDate } from '../../../redux/calendar/calendar.actions'
import { IYearProps } from '../../../types/calendar/calendar.types'
import { IState } from '../../../types/redux/state.types'
import {
	getDaysLabels,
	getMonthDates,
	getMonthLabels,
	getToday
} from '../../../utils/calendar/calendar.utils'
import Date from '../date/Date'
import Header from '../header/Header'

import styles from './Year.module.scss'

const Year: React.FC<IYearProps> = ({ displayDate, changeDisplayDate }) => {
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
		changeDisplayDate({ ...displayDate, year: displayDate.year - 1 })
	}

	const goToToday = () => {
		changeDisplayDate({ ...getToday() })
	}

	const goToNextYear = () => {
		changeDisplayDate({ ...displayDate, year: displayDate.year + 1 })
	}

	return (
		<div className={`${styles.calendar} ${styles.year}`}>
			<Header
				heading={`${displayDate.year}`}
				prevClicked={goToPreviousYear}
				todayClicked={goToToday}
				nextClicked={goToNextYear}
			/>
			<div className={styles['months-container']}>{renderMonths()}</div>
		</div>
	)
}

const mapStateToProps = (state: IState) => {
	return {
		displayDate: state.calendar.displayDate
	}
}

export default connect(mapStateToProps, { changeDisplayDate })(Year)
