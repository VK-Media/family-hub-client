import { Action } from 'redux'

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

export interface IWeekProps {
	displayDate: IDisplayDate
	changeDisplayDate(displayDate: IDisplayDate): void
}

export interface IMonthProps {
	displayDate: IDisplayDate
	changeDisplayDate(displayDate: IDisplayDate): void
}

export interface IYearProps {
	displayDate: IDisplayDate
	changeDisplayDate(displayDate: IDisplayDate): void
}

export interface IDateProps {
	year: number
	month: number
	date: number
	toggleEventForm(): void
	fade?: boolean
	current?: boolean
	view?: string
}

export enum viewModes {
	WEEK,
	MONTH,
	YEAR
}

export interface ICalendarState {
	viewMode: viewModes
	displayDate: IDisplayDate
	showEventForm: boolean
}

export interface ICalendarProps {
	viewMode: viewModes
}

export interface IChangeViewMode extends Action {
	type: 'changeViewMode'
	payload: viewModes
}

export interface IChangeDisplayDate extends Action {
	type: 'changeDisplayDate'
	payload: IDisplayDate
}

export interface IToggleEventForm extends Action {
	type: 'toggleEventForm'
}

export type CalendarAction =
	| IChangeViewMode
	| IChangeDisplayDate
	| IToggleEventForm

export interface IEventFormProps {
	showEventForm: boolean
	toggleEventForm(): void
}

export enum PeriodOption {
	Daily = 'DAILY',
	Weekly = 'WEEKLY',
	Monthly = 'MONTHLY',
	Yearly = 'Yearly'
}

export enum WeekDays { // TODO: Find a more optimal way to do this
	Monday = 'Monday',
	Tuesday = 'Tuesday',
	Wednesday = 'Wednesday',
	Thursday = 'Thursday',
	Friday = 'Friday',
	Saturday = 'Saturday',
	Sunday = 'Sunday'
}

export interface IEventException {
	startTime: Date
	endTime: Date
	removed?: boolean
}

export interface ICreateTimeDetails {
	startTime?: Date
	endTime?: Date
	allDay?: boolean
	repeat?: {
		frequency: PeriodOption
		onWeekdays?: WeekDays[]
		endRepeat?: Date
		exceptions?: IEventException[]
	}
}

export interface ICreateEventInput {
	title: string
	description?: string
	location?: string
	timeDetails: ICreateTimeDetails
	alert?: Date
	participants: string[]
}
