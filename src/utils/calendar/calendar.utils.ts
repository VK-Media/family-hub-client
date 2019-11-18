import moment from 'moment'

import i18n from '../../i18n/i18n'

import {
	IDate,
	IDisplayDate,
	IMonthDetails
} from '../../types/calendar/calendar.types'

export const convertJsDay = (jsDay: number) => {
	if (jsDay === 0) return 6
	return jsDay - 1
}

export const getMonthDetails = (
	targetYear: number,
	targetMonth: number,
	getPrevious?: boolean
): IMonthDetails => {
	if (getPrevious) {
		if (targetMonth === 0) {
			targetYear = targetYear - 1
			targetMonth = 11
		} else {
			targetMonth = targetMonth - 1
		}
	}

	const firstDate = moment(
		`${targetYear}-${addLeadingZero(targetMonth + 1)}-01`
	)
	const daysInMonth = firstDate.daysInMonth()

	return {
		year: targetYear,
		month: targetMonth,
		days: daysInMonth,
		firstDay: convertJsDay(firstDate.day()),
		lastDay: convertJsDay(firstDate.date(daysInMonth).day())
	}
}

export const getToday = () => {
	const today = moment()

	return {
		year: today.year(),
		month: today.month(),
		date: today.date()
	}
}

export const addLeadingZero = (num: number): string => {
	if (num < 10) {
		return `0${num}`
	}

	return `${num}`
}

export const getMonthLabels = async () => {
	await i18n.loadNamespaces('translation')
	return [
		i18n.t('January'),
		i18n.t('February'),
		i18n.t('March'),
		i18n.t('April'),
		i18n.t('May'),
		i18n.t('Juni'),
		i18n.t('July'),
		i18n.t('August'),
		i18n.t('September'),
		i18n.t('October'),
		i18n.t('November'),
		i18n.t('December')
	]
}

export const getDaysLabels = async () => {
	await i18n.loadNamespaces('translation')
	return [
		i18n.t('Monday'),
		i18n.t('Tuesday'),
		i18n.t('Wednesday'),
		i18n.t('Thursday'),
		i18n.t('Friday'),
		i18n.t('Saturday'),
		i18n.t('Sunday')
	]
}

export const getMonthDates = (displayDate: IDisplayDate): IDate[] => {
	const currentMonth = getMonthDetails(displayDate.year, displayDate.month)
	const prevMonth = getMonthDetails(displayDate.year, displayDate.month, true)
	const today = getToday()

	const dates = []
	let j = 1
	let k = prevMonth.days - currentMonth.firstDay + 1
	let l = 1

	for (let i = 0; i < 7 * 6; i++) {
		if (
			i >= currentMonth.firstDay &&
			i < currentMonth.firstDay + currentMonth.days
		) {
			const isToday =
				j === displayDate.date &&
				today.month === displayDate.month &&
				displayDate.year === today.year

			dates.push({
				id: i,
				year: currentMonth.year,
				month: currentMonth.month,
				date: j,
				current: isToday
			})

			j++
		} else {
			if (i < currentMonth.firstDay) {
				const isToday =
					prevMonth.month === today.month &&
					k === today.date &&
					prevMonth.year === today.year

				dates.push({
					id: i,
					year: prevMonth.year,
					month: prevMonth.month,
					date: k,
					current: isToday,
					fade: !isToday
				})

				k++
			}

			if (i >= currentMonth.firstDay + currentMonth.days) {
				const isToday =
					l === today.date &&
					currentMonth.month + 1 === today.month &&
					currentMonth.year === today.year

				dates.push({
					id: i,
					year: currentMonth.year,
					month: currentMonth.month + 1,
					date: l,
					current: isToday,
					fade: !isToday
				})

				l++
			}
		}
	}

	return dates
}
