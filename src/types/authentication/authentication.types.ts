export interface ICreateUserInput {
	name: string
	email: string
	password: string
	profileColor?: string
	family?: string
}

export interface IRegisterFormFields {
	name: string
	email: string
	password: string
	repeatPassword: string
}

export interface IRegisterFormErrors {
	name?: string
	email?: string
	password?: string
}

export interface ILoginFormFields {
	email: string
	password: string
}

export interface ILoginInput {
	email: string
	password: string
}

export interface ILoginFormErrors {
	email?: string
	password?: string
}
