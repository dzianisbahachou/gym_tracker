import React, { useContext } from 'react'
import { ListItemIcon, Menu } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import { useState } from 'react'
import { AuthContext } from '../context/auth-context'
import MenuItem from '@mui/material/MenuItem'
import Avatar from '@mui/material/Avatar'
import Tooltip from '@mui/material/Tooltip'
import Logout from '@mui/icons-material/Logout'
import { Settings } from '@mui/icons-material'

export const AvatarMenu = () => {
	const [anchorEl, setAnchorEl] = useState(null)

	const { removeItem } = useContext(AuthContext)

	const avatarMenuHandler = event => {
		setAnchorEl(event.currentTarget)
	}

	const avatarMenuCloseHandler = () => {
		setAnchorEl(null)
	}

	const logoutHandler = () => {
		removeItem()
	}

	return (
		<>
			<Tooltip title='Account settings'>
				<IconButton
					onClick={avatarMenuHandler}
					size='small'
					sx={{ ml: 2 }}
					aria-controls={anchorEl ? 'account-menu' : undefined}
					aria-haspopup='true'
					aria-expanded={anchorEl ? 'true' : undefined}
				>
					<Avatar sx={{ width: 32, height: 32 }}>D</Avatar>
				</IconButton>
			</Tooltip>
			<Menu
				anchorEl={anchorEl}
				id='account-menu'
				open={!!anchorEl}
				onClose={avatarMenuCloseHandler}
				slotProps={{
					paper: {
						elevation: 0,
						sx: {
							overflow: 'visible',
							filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
							mt: 1.5,
							'& .MuiAvatar-root': {
								width: 32,
								height: 32,
								ml: -0.5,
								mr: 1,
							},
							'&::before': {
								content: '""',
								display: 'block',
								position: 'absolute',
								top: 0,
								right: 14,
								width: 10,
								height: 10,
								bgcolor: 'background.paper',
								transform: 'translateY(-50%) rotate(45deg)',
								zIndex: 0,
							},
						},
					},
				}}
				transformOrigin={{ horizontal: 'right', vertical: 'top' }}
				anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
			>
				<MenuItem>
					<ListItemIcon>
						<Settings fontSize='small' />
					</ListItemIcon>
					Settings
				</MenuItem>
				<MenuItem onClick={logoutHandler}>
					<ListItemIcon>
						<Logout fontSize='small' />
					</ListItemIcon>
					Logout
				</MenuItem>
			</Menu>
		</>
	)
}
