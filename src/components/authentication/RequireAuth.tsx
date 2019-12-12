import { verify } from 'jsonwebtoken'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { IState } from '../../types/general.types'

interface IRequireAuthProps {
	jwt: string
	children: React.ReactNode
}

const RequireAuth: React.FC<IRequireAuthProps> = ({ jwt, children }) => {
	const { t } = useTranslation()

	const validateJwt = (): boolean => {
		try {
			if (jwt && process.env.REACT_APP_JWT_SECRET) {
				const decoded = verify(jwt, process.env.REACT_APP_JWT_SECRET, {
					ignoreNotBefore: true
				})

				if (decoded) {
					return true
				}
			}

			return false
		} catch (err) {
			return false
		}
	}

	if (validateJwt()) {
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
