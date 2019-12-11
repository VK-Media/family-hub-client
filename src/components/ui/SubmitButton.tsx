import React from 'react'

import { ISubmitButtonProps } from '../../types/ui/ui.types'

import formStyles from '../../styles/forms.module.scss'

const SubmitButton: React.FC<ISubmitButtonProps> = ({
	text,
	disabled,
	loading
}) => {
	const submitButtonClasses = (): string => {
		const classes = [formStyles.submit]

		if (loading) {
			classes.push(formStyles.loading)
		}

		return classes.join(' ')
	}

	const renderButtonContent = () => {
		if (loading) {
			return (
				<div className={formStyles.loader}>
					<div />
					<div />
					<div />
					<div />
				</div>
			)
		}

		return text
	}

	return (
		<button
			className={submitButtonClasses()}
			type="submit"
			disabled={disabled}
		>
			{renderButtonContent()}
		</button>
	)
}

export default SubmitButton
