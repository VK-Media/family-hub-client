import {
	IChangeDisplayDate,
	IChangeViewMode,
	IDisplayDate,
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
