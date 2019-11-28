import React from 'react'
import { Field, Form } from 'react-final-form'
import { useTranslation } from 'react-i18next'
import { connect } from 'react-redux'

import server from '../../../../apis/server.api'
import { closeEventForm } from '../../../../redux/calendar/calendar.actions'
import {
	ICreateEventInput,
	IEventFormErrors,
	IEventFormFields,
	IEventFormProps,
	PeriodOption
} from '../../../../types/calendar/calendar.types'
import { IState } from '../../../../types/redux/state.types'

import styles from './Form.module.scss'

const EventForm: React.FC<IEventFormProps> = ({
	showEventForm,
	eventFormDate,
	closeEventForm
}) => {
	const { t } = useTranslation()

	const onSubmit = (values: IEventFormFields) => {
		const data: ICreateEventInput = {
			title: values.title,
			participants: ['5ddbb99ea15d0d138fd34f89'],
			timeDetails: {
				startTime: new Date(values.startTime),
				endTime: new Date(values.endTime),
				repeat: {
					frequency: PeriodOption.Yearly
				}
			}
		}

		if (values.description) {
			data.description = values.description
		}

		if (values.location) {
			data.location = values.location
		}

		server.post('/event', data).then(response => {
			if ('data' in response && '_id' in response.data) {
				closeEventForm()
			} else {
				return Promise.reject('No valid response...')
			}
		})
	}

	const getFormClasses = () => {
		const formClasses = [styles['event-form']]

		if (showEventForm) {
			formClasses.push(styles.active)
		}

		return formClasses.join(' ')
	}

	const initialValues = {
		title: '',
		startTime: `${eventFormDate}T10:00:00`,
		endTime: `${eventFormDate}T11:00:00`,
		description: '',
		location: ''
	}

	const validate = (values: IEventFormFields): IEventFormErrors => {
		const errors: IEventFormErrors = {}

		if (!values.title) {
			errors.title = t('This field is required')
		}

		if (!values.startTime) {
			errors.startTime = t('This field is required')
		}

		if (!values.endTime) {
			errors.endTime = t('This field is required')
		}

		return errors
	}

	return (
		<Form
			onSubmit={onSubmit}
			initialValues={initialValues}
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
					className={getFormClasses()}
				>
					<Field
						name="title"
						component="input"
						type="text"
						placeholder={t('Title')}
					/>
					<Field
						name="startTime"
						component="input"
						type="text"
						placeholder={t('Start time')}
					/>
					<Field
						name="endTime"
						component="input"
						type="text"
						placeholder={t('End time')}
					/>
					<Field
						name="location"
						component="input"
						type="text"
						placeholder={t('Location')}
					/>
					<Field
						name="description"
						component="textarea"
						placeholder={t('Description')}
					/>
					<button
						className={styles.submit}
						type="submit"
						disabled={submitting || pristine}
					>
						{t('Create')}
					</button>
				</form>
			)}
		/>
	)
}

const mapStateToProps = (state: IState) => {
	return {
		showEventForm: state.calendar.showEventForm,
		eventFormDate: state.calendar.eventFormDate
	}
}

export default connect(mapStateToProps, { closeEventForm })(EventForm)
