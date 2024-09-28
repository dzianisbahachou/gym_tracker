import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import { SideBarList } from './SideBarList'

export const SideBarTemporary = ({ showSidebarHandler, showSidebar }) => {
	const hideDrawer = () => {
		showSidebarHandler(false)
	}

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
			onClose={() => hideDrawer(false)}
		>
			<Box sx={{ width: 250 }} role='presentation'>
				<SideBarList />
			</Box>
		</Drawer>
	)
}
