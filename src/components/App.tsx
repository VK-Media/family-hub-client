import React from 'react'
import { connect } from 'react-redux'

import { addTextToData } from '../redux/data/data.action'
import { IDataState } from '../types/redux/data.types'

import styles from './App.module.scss'

interface IAppProps {
	data: string[]
}

const App: React.FC<IAppProps> = props => {
	return (
		<div className={styles.app}>
			<h1>VK Media</h1>
			<h4>React Redux TypeScript Template</h4>
		</div>
	)
}

const mapStateToProps = (state: IDataState) => {
	return {
		data: state.data
	}
}

export default connect(mapStateToProps, { addTextToData })(App)
