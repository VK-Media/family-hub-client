import React from 'react'
import { Field, Form } from 'react-final-form'
import { useTranslation } from 'react-i18next'
import { connect } from 'react-redux'

import { setLoading } from '../../redux/authentication/authentication.actions'
import { register } from '../../redux/authentication/authentication.effects'
import {
	ICreateUserInput,
	IRegisterFormErrors,
	IRegisterFormFields,
	IRegisterProps
} from '../../types/authentication/authentication.types'
import { IState } from '../../types/general.types'
import { submitHandler } from '../../utils/authentication.utils'
import LandingPageNavigation from '../navigation/LandingPageNavigation'
import SubmitButton from '../ui/SubmitButton'

import formStyles from '../../styles/forms.module.scss'
import styles from './Authentication.module.scss'

const Register: React.FC<IRegisterProps> = ({
	registerError,
	register,
	loading,
	setLoading
}) => {
	const { t } = useTranslation()

	const onSubmit = (values: IRegisterFormFields) => {
		setLoading(true)

		const data: ICreateUserInput = {
			name: values.name,
			email: values.email,
			password: values.password
		}

		return register(data)
	}

	const renderErrorMessage = () => {
		const classes = [formStyles.error]

		if (registerError) {
			classes.push(formStyles.active)
		}

		return <div className={classes.join(' ')}>{registerError}</div>
	}

	const validate = (values: IRegisterFormFields): IRegisterFormErrors => {
		const errors: IRegisterFormErrors = {}

		if (!values.name) {
			errors.name = t('This field is required')
		}

		if (!values.email) {
			errors.email = t('This field is required')
		}

		if (values.password !== values.repeatPassword) {
			errors.password = t('The password fields must match')
		}

		if (!values.password) {
			errors.password = t('This field is required')
		}

		return errors
	}

	return (
		<div className={styles.background}>
			<LandingPageNavigation />
			<div className={styles.content}>
				<h1>{t('Register')}</h1>
				{renderErrorMessage()}
				<Form
					onSubmit={onSubmit}
					validate={validate}
					render={({ handleSubmit, form, submitting, pristine }) => (
						<form
							id="register-form"
							onSubmit={event =>
								submitHandler(event, handleSubmit, form)
							}
							className={formStyles.form}
						>
							<div className={formStyles['input-wrapper']}>
								<i className="fal fa-user" />
								<Field
									name="name"
									component="input"
									type="text"
									className={formStyles.input}
									placeholder={t('Name')}
								/>
							</div>

							<div className={formStyles['input-wrapper']}>
								<i className="fal fa-at" />
								<Field
									name="email"
									component="input"
									type="text"
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
									autoComplete="new-password"
									className={formStyles.input}
									placeholder={t('Password')}
								/>
							</div>

							<div className={formStyles['input-wrapper']}>
								<i className="fal fa-lock-alt" />
								<Field
									name="repeatPassword"
									component="input"
									type="password"
									autoComplete="new-password"
									className={formStyles.input}
									placeholder={t('Repeat Password')}
								/>
							</div>

							<SubmitButton
								loading={loading}
								disabled={submitting || pristine}
								text={t('Register')}
							/>
						</form>
					)}
				/>
			</div>
		</div>
	)
}

const mapStateToProps = (state: IState) => {
	return {
		registerError: state.authentication.registerError,
		loading: state.authentication.loading
	}
}

export default connect(mapStateToProps, { register, setLoading })(Register)
