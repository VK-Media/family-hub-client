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
			})
			.catch(() => {
				console.log('Error')
			})
	}

	return promise
}
