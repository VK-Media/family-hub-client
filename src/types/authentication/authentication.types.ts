import { Action } from 'redux'

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

export interface IAuthenticationState {
	jwt: string
	loginError: string
	registerError: string
	loading: boolean
}

export interface IUser {
	id: string
	name: string
	email: string
	appMode: AppMode
	profilePicturePath?: string
	profileColor: string
	family?: string
	events?: string[]
}

export enum AppMode {
	AllAccess = 'AllAccess',
	ChildAccess = 'ChildAccess'
}

export type IAuthenticationAction =
	| ISetAuthenticationData
	| ISetLoginError
	| ISetRegisterError
	| ISetLoading

export interface ISetLoading extends Action {
	type: 'setLoading'
	payload: boolean
}

export interface ISetAuthenticationData extends Action {
	type: 'setAuthenticationData'
	payload: string
}

export interface ISetLoginError extends Action {
	type: 'setLoginError'
	payload: string
}

export interface ISetRegisterError extends Action {
	type: 'setRegisterError'
	payload: string
}

export interface ILoginProps {
	loginError: string
	login(data: ILoginInput): () => void
	loading: boolean
	setLoading(loading: boolean): ISetLoading
}

export interface IRegisterProps {
	registerError: string
	register(data: ICreateUserInput): () => void
	loading: boolean
	setLoading(loading: boolean): ISetLoading
}
