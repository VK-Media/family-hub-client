import { history } from '../utils/general.utils'

export const submitHandler = (
	event: React.FormEvent,
	handleSubmit: any,
	form: any
) => {
	const promise = handleSubmit(event)

	if (promise) {
		promise
			.then(() => {
				form.reset()
				history.push('/app/dashboard')
			})
			.catch(() => {
				console.log('Error')
			})
	}

	return promise
}
