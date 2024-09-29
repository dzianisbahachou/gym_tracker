import React from 'react'
import Skeleton from '@mui/material/Skeleton'

export const HomePage = React.memo(() => {
	return (
		<div>
			<Skeleton variant='rounded' width={'100%'} height={60} />
		</div>
	)
})
