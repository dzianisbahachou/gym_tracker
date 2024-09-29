import React from 'react'
import Drawer from '@mui/material/Drawer'
import { SideBarList } from './SideBarList'

export const SideBarPermanent = React.memo(() => {
	return (
		<Drawer
			variant='persistent'
			anchor='left'
			sx={{
				display: { xs: 'none', lg: 'block' },
				'& .MuiDrawer-paper': {
					height: 'calc(100vh - 1em - 70px)',
					position: 'relative',
					top: '1em',
					boxSizing: 'border-box',
					width: '300px',
				},
			}}
			open
		>
			<SideBarList />
		</Drawer>
	)
})
