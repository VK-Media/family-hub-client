import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { connect } from 'react-redux'

import { changeDisplayDate } from '../../../redux/calendar/calendar.actions'
import { IDate, IWeekProps } from '../../../types/calendar/calendar.types'
import { IState } from '../../../types/general.types'
import {
	getDaysLabels,
	getMomentFromDisplayDate,
	getToday
} from '../../../utils/calendar.utils'
import Date from '../date/Date'
import Header from '../header/Header'

import styles from './Week.module.scss'

const Week: React.FC<IWeekProps> = ({ displayDate, changeDisplayDate }) => {
	const { t } = useTranslation()
	const [days, setDays] = useState<string[]>([])

	const currentMoment = getMomentFromDisplayDate(displayDate)
	const weekNumber = currentMoment.isoWeek()
	const headerHeading = `${displayDate.year} ${t('Week')} ${weekNumber}`

	useEffect(() => {
		getDaysLabels().then(res => setDays(res))
	}, [])

	const goToPreviousWeek = () => {
		const previousWeek = currentMoment.subtract(7, 'days')

		changeDisplayDate({
			year: previousWeek.year(),
			month: previousWeek.month(),
			date: previousWeek.date()
		})
	}

	const goToToday = () => {
		changeDisplayDate({ ...getToday() })
	}

	const goToNextWeek = () => {
		const nextWeek = currentMoment.add(7, 'days')

		changeDisplayDate({
			year: nextWeek.year(),
			month: nextWeek.month(),
			date: nextWeek.date()
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

	const getWeekDates = (): IDate[] => {
		const weekDates = []
		const currentDay = currentMoment.isoWeekday()
		let weekMonday = currentMoment

		if (currentDay === 0) {
			weekMonday = currentMoment.add(1, 'day')
		} else if (currentDay > 1) {
			weekMonday = currentMoment.subtract(currentDay - 1, 'days')
		}

		for (let i = 0; i < 7; i++) {
			let dateMoment = weekMonday

			if (i > 0) {
				dateMoment = weekMonday.add(1, 'days')
			}

			weekDates.push({
				id: i,
				year: dateMoment.year(),
				month: dateMoment.month(),
				date: dateMoment.date()
			})
		}

		return weekDates
	}

	const renderDates = () => {
		const dates = getWeekDates().map(date => {
			return <Date key={date.id} {...date} view="week" />
		})

		return <div className={`${styles.grid} ${styles.body}`}>{dates}</div>
	}

	return (
		<div className={`${styles.calendar} ${styles.week}`}>
			<Header
				heading={headerHeading}
				prevClicked={goToPreviousWeek}
				todayClicked={goToToday}
				nextClicked={goToNextWeek}
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

export default connect(mapStateToProps, { changeDisplayDate })(Week)
