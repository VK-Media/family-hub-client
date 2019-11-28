import {
	IChangeDisplayDate,
	IChangeViewMode,
	ICloseEventForm,
	IDisplayDate,
	IOpenEventForm,
	viewModes
} from '../../types/calendar/calendar.types'

export const changeViewMode = (mode: viewModes): IChangeViewMode => ({
	type: 'changeViewMode',
	payload: mode
})

export const changeDisplayDate = (
	displayDate: IDisplayDate
): IChangeDisplayDate => ({
	type: 'changeDisplayDate',
	payload: displayDate
})

export const openEventForm = (date: string): IOpenEventForm => ({
	type: 'openEventForm',
	payload: date
})

export const closeEventForm = (): ICloseEventForm => ({
	type: 'closeEventForm'
})
