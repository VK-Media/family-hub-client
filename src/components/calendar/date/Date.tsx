import moment from 'moment'
import React from 'react'
import { connect } from 'react-redux'

import { toggleEventForm } from '../../../redux/calendar/calendar.actions'
import { IDateProps } from '../../../types/calendar/calendar.types'
import { addLeadingZero } from '../../../utils/calendar/calendar.utils'

import styles from './Date.module.scss'

const Date: React.FC<IDateProps> = ({
	year,
	month,
	date,
	fade,
	current,
	view,
	toggleEventForm
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
		<div className={classes.join(' ')} onClick={toggleEventForm}>
			<div className={styles.number}>{date}.</div>
			{renderWeekNumber()}
		</div>
	)
}

export default connect(null, { toggleEventForm })(Date)
