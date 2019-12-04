import React from 'react'
import { Field, Form } from 'react-final-form'
import { useTranslation } from 'react-i18next'
import { connect } from 'react-redux'

import server from '../../apis/server.api'
import {
	ILoginFormErrors,
	ILoginFormFields,
	ILoginInput
} from '../../types/authentication/authentication.types'

import formStyles from '../../styles/forms.module.scss'
import styles from './Authentication.module.scss'

const Login: React.FC = () => {
	const { t } = useTranslation()

	const onSubmit = (values: ILoginFormFields) => {
		const data: ILoginInput = {
			email: values.email,
			password: values.password
		}

		server.post('/auth', data).then(response => {
			if ('data' in response && '_id' in response.data) {
				console.log(response)
			} else {
				return Promise.reject('No valid response...')
			}
		})
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

export default connect(null)(Login)
