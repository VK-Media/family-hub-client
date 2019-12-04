import React from 'react'
import { Field, Form } from 'react-final-form'
import { useTranslation } from 'react-i18next'
import { connect } from 'react-redux'

import server from '../../apis/server.api'
import {
	ICreateUserInput,
	IRegisterFormErrors,
	IRegisterFormFields
} from '../../types/authentication/authentication.types'

import formStyles from '../../styles/forms.module.scss'
import styles from './Authentication.module.scss'

const Signup: React.FC = () => {
	const { t } = useTranslation()

	const onSubmit = (values: IRegisterFormFields) => {
		const data: ICreateUserInput = {
			name: values.name,
			email: values.email,
			password: values.password
		}

		server.post('/user', data).then(response => {
			console.log(response)

			if ('data' in response && '_id' in response.data) {
				console.log(response)
			} else {
				return Promise.reject('No valid response...')
			}
		})
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
			<div className={styles.content}>
				<h1>{t('Register')}</h1>
				<Form
					onSubmit={onSubmit}
					validate={validate}
					render={({ handleSubmit, form, submitting, pristine }) => (
						<form
							onSubmit={event => {
								const promise = handleSubmit(event)

								if (promise) {
									promise.then(() => {
										form.reset()
									})
								}

								return promise
							}}
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
									className={formStyles.input}
									placeholder={t('Repeat Password')}
								/>
							</div>

							<button
								className={formStyles.submit}
								type="submit"
								disabled={submitting || pristine}
							>
								{t('Register')}
							</button>
						</form>
					)}
				/>
			</div>
		</div>
	)
}

export default connect(null)(Signup)
