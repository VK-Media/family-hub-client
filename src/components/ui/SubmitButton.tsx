import React from 'react'

import { ISubmitButtonProps } from '../../types/ui/ui.types'

import formStyles from '../../styles/forms.module.scss'
import Loader from '../loaders/Loader'

const SubmitButton: React.FC<ISubmitButtonProps> = ({
	text,
	disabled,
	loading
}) => {
	const renderButtonContent = () => {
		if (loading) {
			return <Loader show={true} />
		}

		return text
	}

	return (
		<button className={formStyles.submit} type="submit" disabled={disabled}>
			{renderButtonContent()}
		</button>
	)
}

export default SubmitButton
