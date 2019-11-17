import { ThunkAction } from 'redux-thunk'
import { DataAction, IDataState } from '../../types/redux/data.types'

import dataApi from '../../apis/data.api'

import { addTextToData } from './data.action'

type Effect = ThunkAction<any, IDataState, any, DataAction>

export const requestData = (): Effect => async (dispatch, getState) => {
	let response: string

	response = await dataApi.get('/data')

	dispatch(addTextToData(response))
}
