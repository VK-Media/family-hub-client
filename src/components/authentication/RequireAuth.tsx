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
	if (!user || !jwt) {
		return <Redirect to="/" />
	} else {
		return <div>{children}</div>
	}
}

const mapStateToProps = (state: IState) => {
	return {
		jwt: state.authentication.jwt,
		user: state.authentication.user
	}
}

export default connect(mapStateToProps, {})(RequireAuth)
