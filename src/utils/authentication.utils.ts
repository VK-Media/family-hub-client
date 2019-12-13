import i18n from '../i18n/i18n'
import { history } from '../utils/general.utils'

export const submitHandler = (
	event: React.FormEvent,
	handleSubmit: any,
	form: any
) => {
	const promise = handleSubmit(event)

	const loadI18nNamespace = async () => {
		await i18n.loadNamespaces('translation')

		return i18n.t('/app/dashboard')
	}

	if (promise) {
		promise
			.then(() => {
				form.reset()

				loadI18nNamespace().then(route => {
					history.push(route)
				})
			})
			.catch(() => {
				console.log('Error')
			})
	}

	return promise
}
