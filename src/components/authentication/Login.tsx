import React from 'react'
import { Field, Form } from 'react-final-form'
import { useTranslation } from 'react-i18next'
import { connect } from 'react-redux'

import { login } from '../../redux/authentication/authentication.effects'
import {
	ILoginFormErrors,
	ILoginFormFields,
	ILoginInput,
	ILoginProps
} from '../../types/authentication/authentication.types'
import { IState } from '../../types/general.types'
import { submitHandler } from '../../utils/general.utils'

import formStyles from '../../styles/forms.module.scss'
import styles from './Authentication.module.scss'

const Login: React.FC<ILoginProps> = ({ loginError, login }) => {
	const { t } = useTranslation()

	const onSubmit = async (values: ILoginFormFields) => {
		const data: ILoginInput = {
			email: values.email,
			password: values.password
		}

		return login(data)
	}

	const renderErrorMessage = () => {
		const classes = [formStyles.error]

		if (loginError) {
			classes.push(formStyles.active)
		}

		return (
			<div className={classes.join(' ')}>
				{t('Invalid email or password')}
			</div>
		)
	}

	const validate = (values: ILoginFormFields): ILoginFormErrors => {
		const errors: ILoginFormErrors = {}

		if (!values.email) {
			errors.email = t('This field is required')
		}

		if (!values.password) {
			errors.password = t('This field is required')
		}

		return errors
	}

	return (
		<div className={styles.background}>
			<div className={styles.content}>
				<h1>{t('Login')}</h1>
				{renderErrorMessage()}
				<Form
					onSubmit={onSubmit}
					validate={validate}
					render={({ handleSubmit, form, submitting, pristine }) => (
						<form
							onSubmit={event =>
								submitHandler(event, handleSubmit, form)
							}
							className={formStyles.form}
						>
							<div className={formStyles['input-wrapper']}>
								<i className="fal fa-at" />
								<Field
									name="email"
									component="input"
									type="email"
									className={formStyles.input}
									placeholder={t('Email')}
								/>
							</div>

							<div className={formStyles['input-wrapper']}>
								<i className="fal fa-lock-alt" />
								<Field
									name="password"
									component="input"
									type="password"
									className={formStyles.input}
									placeholder={t('Password')}
								/>
							</div>
							<button
								className={formStyles.submit}
								type="submit"
								disabled={submitting || pristine}
							>
								{t('Log in')}
							</button>
						</form>
					)}
				/>
			</div>
		</div>
	)
}

const mapStateToProps = (state: IState) => {
	return {
		loginError: state.authentication.loginError
	}
}

export default connect(mapStateToProps, { login })(Login)
