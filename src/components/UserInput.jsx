import { TextField } from '@mui/material'
import React from 'react'

export const UserInput = ({ name, type = 'text', inputValue, inputError, disabled, inputChangeHandler }) => {
	const placeholder = name.charAt(0).toUpperCase() + name.slice(1)
	const helperText = inputError ? `Fill the correct ${placeholder}` : null

	const inputHandler = event => {
		inputChangeHandler(name, event.target.value)
	}

	return (
		<TextField
			disabled={disabled}
			value={inputValue}
			type={type}
			onChange={inputHandler}
			name={name}
			helperText={helperText}
			variant='standard'
			error={inputError}
			label={placeholder}
			sx={{
				width: '100%',
				margin: '.5em 0',
			}}
		/>
	)
}
