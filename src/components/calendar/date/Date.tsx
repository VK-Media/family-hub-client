import moment from 'moment'
import React from 'react'

import { addLeadingZero } from '../../../utils/calendar/calendar.utils'

import styles from './Date.module.scss'

interface IDateProps {
	year: number
	month: number
	date: number
	fade?: boolean
	current?: boolean
	view?: string
}

const Date: React.FC<IDateProps> = ({
	year,
	month,
	date,
	fade,
	current,
	view
}) => {
	const monthString = addLeadingZero(month + 1)
	const dateString = addLeadingZero(date)
	const classes = [styles.date]

	if (fade) {
		classes.push(styles.faded)
	}

	if (current) {
		classes.push(styles.current)
	}

	if (view) {
		classes.push(styles[view])
	}

	const renderWeekNumber = () => {
		if (view === 'month') {
			const fullDate = moment(`${year}-${monthString}-${dateString}`)
			const week = fullDate.isoWeek()
			const isMonday = fullDate.weekday() === 1

			if (isMonday) {
				return <div className={styles.week}>{week}</div>
			}
		}

		return null
	}

	return (
		<div className={classes.join(' ')}>
			<div className={styles.number}>{date}.</div>
			{renderWeekNumber()}
		</div>
	)
}

export default Date
