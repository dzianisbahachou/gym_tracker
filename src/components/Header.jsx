import React, { useCallback, useContext } from 'react'
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
import { AuthContext } from '../context/auth-context'
import { AvatarMenu } from './AvatarMenu'

export const Header = React.memo(() => {
	const [showSidebar, setShowSidebar] = useState(false)
	const [showAuthDialog, setShowAuthDialog] = useState(false)

	const { isLoggedIn } = useContext(AuthContext)

	const showSidebarHandler = () => {
		setShowSidebar(prev => !prev)
	}

	const showAuthDialogHandler = useCallback(() => {
		setShowAuthDialog(prev => !prev)
	}, [showAuthDialog])

	return (
		<>
			<Box sx={{ flexGrow: 1 }}>
				<AppBar position='static' color='info'>
					<Toolbar>
						<IconButton size='large' edge='start' color='inherit' aria-label='menu' sx={{ mr: 1, display: { xs: 'none', lg: 'block' } }}>
							<FitnessCenterIcon />
						</IconButton>
						<MenuIcon sx={{ mr: 1, display: { xs: 'block', lg: 'none' } }} onClick={showSidebarHandler} />
						<Typography variant='h6' component='div' sx={{ ml: 3, flexGrow: 1 }}>
							{APP_TITLE}
						</Typography>
						{!isLoggedIn && (
							<Button color='inherit' onClick={showAuthDialogHandler}>
								Login
							</Button>
						)}
						{isLoggedIn && <AvatarMenu />}
					</Toolbar>
				</AppBar>
			</Box>
			<SideBarTemporary showSidebarHandler={showSidebarHandler} showSidebar={showSidebar} />
			<AuthDialog showAuthDialogHandler={showAuthDialogHandler} showAuthDialog={showAuthDialog} />
		</>
	)
})
