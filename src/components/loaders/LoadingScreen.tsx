import React from 'react'

import Loader from './Loader'

import styles from './LoadingScreen.module.scss'

const LoadingScreen: React.FC = () => {
	return (
		<div className={styles.container}>
			<Loader show={true} />
		</div>
	)
}

export default LoadingScreen
