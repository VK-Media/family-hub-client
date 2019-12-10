import React from 'react'

import RequireAuth from '../authentication/RequireAuth'

const Dashboard: React.FC = () => {
	return (
		<RequireAuth>
			<div>This is the dashboard!</div>
		</RequireAuth>
	)
}

export default Dashboard
