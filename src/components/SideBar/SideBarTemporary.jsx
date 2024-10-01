import React from 'react'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import { SideBarList } from './SideBarList'

export const SideBarTemporary = React.memo(({ showSidebarHandler, showSidebar }) => {
	return (
		<Drawer
			anchor='left'
			sx={{
				display: { xs: 'block', lg: 'none' },
				'& .MuiDrawer-paper': {
					boxSizing: 'border-box',
					width: '300px',
				},
			}}
			open={showSidebar}
			onClose={showSidebarHandler}
		>
			<Box sx={{ width: 250 }} role='presentation'>
				<SideBarList />
			</Box>
		</Drawer>
	)
})
