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
	setDisplayDate(displayDate: IDisplayDate): void
	viewMode: string
	setViewMode(view: string): void
}

export interface IYearProps {
	displayDate: IDisplayDate
	setDisplayDate(displayDate: IDisplayDate): void
	viewMode: string
	setViewMode(view: string): void
}
