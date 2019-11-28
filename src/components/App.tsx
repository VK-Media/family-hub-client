import React, { Suspense } from 'react'
import { connect } from 'react-redux'

import { addTextToData } from '../redux/data/data.action'
import { IDataState } from '../types/redux/data.types'

import Calendar from './calendar/Calendar'

import styles from './App.module.scss'

interface IAppProps {
	data: string[]
}

const App: React.FC<IAppProps> = props => {
	return (
		<Suspense fallback="loading...">
			<div className={styles.app}>
				<Calendar />
			</div>
		</Suspense>
	)
}

const mapStateToProps = (state: IDataState) => {
	return {
		data: state.data
	}
}

export default connect(mapStateToProps, { addTextToData })(App)
