import React from 'react'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import InboxIcon from '@mui/icons-material/MoveToInbox'
import MailIcon from '@mui/icons-material/Mail'
import { useNavigate } from 'react-router-dom'

export const SideBarList = React.memo(() => {
	const navigate = useNavigate()

	const list = ['Home', 'Calendar', 'Trainings', 'Goals']

	const test = (item) => {
		console.log(item)
		item === 'Home' ? navigate('/') : navigate(`/${item.toLowerCase()}`)
	}
	return (
		<List>
			{list.map((item, index) => (
				<ListItem key={item} disablePadding>
					<ListItemButton onClick={() => test(item)}>
						<ListItemIcon>
							{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
							{/* // make swith case for icons */}
						</ListItemIcon>
						<ListItemText primary={item} />
					</ListItemButton>
				</ListItem>
			))}
		</List>
	)
})
