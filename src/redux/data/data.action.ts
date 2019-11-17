import { IAddTextToData } from '../../types/redux/data.types'

export const addTextToData = (text: string): IAddTextToData => ({
	type: 'addTextToData',
	payload: text
})
