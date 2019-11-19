export interface IMonthDetails {
	month: number
	year: number
	days: number
	firstDay: number
	lastDay: number
}

export interface IDisplayDate {
	year: number
	month: number
	date?: number
}

export interface IDate {
	id: number
	year: number
	month: number
	date: number
	current?: boolean
	fade?: boolean
}

export interface IMonthProps {
	displayDate: IDisplayDate
	changeDisplayDate(displayDate: IDisplayDate): void
}

export interface IYearProps {
	displayDate: IDisplayDate
	changeDisplayDate(displayDate: IDisplayDate): void
}

import { Action } from 'redux'

export enum viewModes {
	WEEK,
	MONTH,
	YEAR
}

export interface ICalendarState {
	viewMode: viewModes
	displayDate: IDisplayDate
}

export interface IChangeViewMode extends Action {
	type: 'changeViewMode'
	payload: viewModes
}

export interface IChangeDisplayDate extends Action {
	type: 'changeDisplayDate'
	payload: IDisplayDate
}

export type CalendarAction = IChangeViewMode | IChangeDisplayDate
