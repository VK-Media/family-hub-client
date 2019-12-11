import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { IUser } from '../../types/authentication/authentication.types'
import { IState } from '../../types/general.types'

interface IRequireAuthProps {
	jwt?: string
	user?: IUser
	children: React.ReactNode
}

const RequireAuth: React.FC<IRequireAuthProps> = ({ jwt, user, children }) => {
	let authorized = true

	if (!user || !jwt) authorized = false

	if (authorized) {
		return <div>{children}</div>
	} else {
		return <Redirect to="/" />
	}
}

const mapStateToProps = (state: IState) => {
	return {
		jwt: state.authentication.jwt,
		user: state.authentication.user
	}
}

export default connect(mapStateToProps, {})(RequireAuth)
