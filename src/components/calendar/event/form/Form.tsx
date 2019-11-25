import React from 'react'
import { Field, Form } from 'react-final-form'
import { useTranslation } from 'react-i18next'
import { connect } from 'react-redux'

import server from '../../../../apis/server.api'
import { toggleEventForm } from '../../../../redux/calendar/calendar.actions'
import {
	ICreateEventInput,
	IEventFormProps,
	PeriodOption
} from '../../../../types/calendar/calendar.types'
import { IState } from '../../../../types/redux/state.types'

import styles from './Form.module.scss'

const EventForm: React.FC<IEventFormProps> = ({
	showEventForm,
	toggleEventForm
}) => {
	const { t } = useTranslation()

	const onSubmit = (values: ICreateEventInput) => {
		values.participants = ['5ddbb99ea15d0d138fd34f89']
		values.timeDetails = {
			startTime: new Date('2019-10-25'),
			endTime: new Date(),
			repeat: {
				frequency: PeriodOption.Yearly
			}
		}

		server.post('/event', values).then(response => {
			console.log(response)
		})
	}

	const getFormClasses = () => {
		const formClasses = [styles['event-form']]

		if (showEventForm) {
			formClasses.push(styles.active)
		}

		return formClasses.join(' ')
	}

	return (
		<Form
			onSubmit={onSubmit}
			render={({ handleSubmit, form, submitting, pristine }) => (
				<form onSubmit={handleSubmit} className={getFormClasses()}>
					<div>
						<label>{t('Title')}</label>
						<Field
							name="title"
							component="input"
							type="text"
							placeholder={t('Title')}
						/>
					</div>
					<div className="buttons">
						<button type="submit" disabled={submitting || pristine}>
							{t('Submit')}
						</button>
						<button
							type="button"
							onClick={form.reset}
							disabled={submitting || pristine}
						>
							{t('Reset')}
						</button>
					</div>
				</form>
			)}
		/>
	)
}

const mapStateToProps = (state: IState) => {
	return {
		showEventForm: state.calendar.showEventForm
	}
}

export default connect(mapStateToProps, { toggleEventForm })(EventForm)
