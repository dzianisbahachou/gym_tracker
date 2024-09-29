import React, { useCallback } from 'react'
import { Button } from '@mui/material'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter'
import { SideBarTemporary } from './SideBar/SideBarTemporary'
import MenuIcon from '@mui/icons-material/Menu'
import { useState } from 'react'
import { AuthDialog } from './authentication/AuthDialog'
import { APP_TITLE } from '../utils/commonConstants'

export const Header = React.memo(() => {
	const [showSidebar, setShowSidebar] = useState(false)
	const [showAuthDialog, setShowAuthDialog] = useState(false)

	const showSidebarHandler = showSidebar => {
		setShowSidebar(showSidebar)
	}

	const showAuthDialogHandler = useCallback(
		showAuthDialog => {
			setShowAuthDialog(showAuthDialog)
		},
		[showAuthDialog]
	)

	return (
		<>
			<Box sx={{ flexGrow: 1 }}>
				<AppBar position='static' color='info'>
					<Toolbar>
						<IconButton size='large' edge='start' color='inherit' aria-label='menu' sx={{ mr: 1, display: { xs: 'none', lg: 'block' } }}>
							<FitnessCenterIcon />
						</IconButton>
						<MenuIcon sx={{ mr: 1, display: { xs: 'block', lg: 'none' } }} onClick={() => showSidebarHandler(true)} />
						<Typography variant='h6' component='div' sx={{ ml: 3, flexGrow: 1 }}>
							{APP_TITLE}
						</Typography>
						<Button color='inherit' onClick={() => showAuthDialogHandler(true)}>
							Login
						</Button>
					</Toolbar>
				</AppBar>
			</Box>
			<SideBarTemporary showSidebarHandler={showSidebarHandler} showSidebar={showSidebar} />
			<AuthDialog showAuthDialogHandler={showAuthDialogHandler} showAuthDialog={showAuthDialog} />
		</>
	)
})
