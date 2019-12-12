import React from 'react'

import formStyles from '../../styles/forms.module.scss'

interface IInputProps {
	icon?: string
	fieldProps: object
}

const Input: React.FC<IInputProps> = ({ icon, fieldProps }) => {
	const wrapperClasses = [formStyles['input-wrapper']]

	const handleIcon = () => {
		if (icon) {
			wrapperClasses.push(formStyles['has-icon'])

			return <i className={`fal ${icon}`} />
		}

		return null
	}

	return (
		<div className={wrapperClasses.join(' ')}>
			{handleIcon()}
			<input {...fieldProps} />
		</div>
	)
}

export default Input
