import { Action } from 'redux'

export interface IDataState {
	data: string[]
}

export interface IAddTextToData extends Action {
	type: 'addTextToData'
	payload: string
}

export type DataAction = IAddTextToData
