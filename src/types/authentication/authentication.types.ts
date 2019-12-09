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
	jwt?: string
	user?: IUser
	loginError: boolean
	registerError: boolean
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
	| IToggleLoginError
	| ISetRegisterError

export interface ISetAuthenticationData extends Action {
	type: 'setAuthenticationData'
	payload: IAuthenticationState
}

export interface IToggleLoginError extends Action {
	type: 'toggleLoginError'
}

export interface ISetRegisterError extends Action {
	type: 'setRegisterError'
}

export interface ILoginProps {
	loginError: boolean
	login(data: ILoginInput): () => void
}

export interface IRegisterProps {
	registerError: boolean
	register(data: ICreateUserInput): () => void
}
