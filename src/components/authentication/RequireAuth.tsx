import React from 'react'
import { useTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { IState } from '../../types/general.types'
import { validateJwt } from '../../utils/authentication.utils'

interface IRequireAuthProps {
	jwt: string
	children: React.ReactNode
}

const RequireAuth: React.FC<IRequireAuthProps> = ({ jwt, children }) => {
	const { t } = useTranslation()

	if (validateJwt(jwt)) {
		return <div>{children}</div>
	} else {
		return <Redirect to={t('/login')} />
	}
}

const mapStateToProps = (state: IState) => {
	return {
		jwt: state.authentication.jwt
	}
}

export default connect(mapStateToProps, {})(RequireAuth)
