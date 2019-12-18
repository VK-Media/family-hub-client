import React from 'react'

import { ILoaderProps } from '../../types/general.types'

import styles from './Loader.module.scss'

const Loader: React.FC<ILoaderProps> = ({ show }) => {
	if (show) {
		return (
			<div className={styles.loader}>
				<div />
				<div />
				<div />
				<div />
			</div>
		)
	}

	return null
}

export default Loader
