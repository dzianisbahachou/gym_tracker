import React, { useCallback, useState } from 'react'
import { AlertTitle, Button, CircularProgress, Collapse, Container, Dialog, DialogTitle, TextField } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import Alert from '@mui/material/Alert'
import CheckIcon from '@mui/icons-material/Check'

import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../firebase'
import {
	emailValidator,
	LOGIN,
	LOGIN_ERROR,
	SIGNUP_HELP_TEXT,
	LOGIN_HELP_TEXT,
	LOGIN_LABEL,
	LOGIN_SUCCESS_MSG,
	passwordValidator,
	SIGNUP,
	SIGNUP_ERROR,
	SIGNUP_LABEL,
	SIGNUP_SUCCESS_MSG,
	TOAST_TYPE,
	USER_CREDENTIALS,
	USER_CREDENTIALS_ERROR,
} from '../../utils/authUtil'
import './authDialog.css'

export const AuthDialog = React.memo(({ showAuthDialogHandler, showAuthDialog }) => {
	const [userCredentials, setUserCredentials] = useState(USER_CREDENTIALS)
	const [userCredentialsError, setUserCredentialsError] = useState(USER_CREDENTIALS_ERROR)
	const [authType, setAuthType] = useState(LOGIN)
	const [loading, setLoading] = useState(false)
	const [toast, setToast] = useState(TOAST_TYPE)

	const emailHandler = () => {
		const emailValidity = emailValidator(userCredentials.email)
		setUserCredentialsError(prev => ({ ...prev, email: !emailValidity }))
		return emailValidity
	}

	const passwordHandler = () => {
		const passwordValidity = passwordValidator(userCredentials.password)
		setUserCredentialsError(prev => ({ ...prev, password: !passwordValidity }))
		return passwordValidity
	}

	const resetState = () => {
		setUserCredentials(USER_CREDENTIALS)
		setUserCredentialsError({ email: false, password: false })
		setToast(prev => ({ ...prev, error: null }))
	}

	const authDialogHandler = state => {
		resetState()
		setAuthType(LOGIN)
		showAuthDialogHandler(state)
	}

	const validateForm = () => {
		const emailValidator = emailHandler()
		const passwordValidator = passwordHandler()
		if (emailValidator && passwordValidator) {
			authType === LOGIN ? login() : signup()
		}
	}

	const showSuccessToast = text => {
		setToast(prev => ({ ...prev, success: text }))
		setTimeout(() => {
			setToast(prev => ({ ...prev, success: null }))
		}, 3000)
	}

	const login = async () => {
		setLoading(true)
		setToast(prev => ({ ...prev, error: null }))
		try {
			const response = await signInWithEmailAndPassword(auth, userCredentials.email, userCredentials.password)
			const user = response.user
			console.log('LOGIN', user)
			authDialogHandler()
			showSuccessToast(LOGIN_SUCCESS_MSG)
			setLoading(false)
		} catch {
			setToast(prev => ({ ...prev, error: LOGIN_ERROR }))
			setLoading(false)
		}
	}

	const signup = async () => {
		setLoading(true)
		setToast(prev => ({ ...prev, error: null }))
		try {
			const response = await createUserWithEmailAndPassword(auth, userCredentials.email, userCredentials.password)
			const user = response.user
			console.log('SIGNUP', user)
			authDialogHandler()
			showSuccessToast(SIGNUP_SUCCESS_MSG)
		} catch {
			setToast(prev => ({ ...prev, error: SIGNUP_ERROR }))
		}
		setLoading(false)
	}

	const authTypeHandler = type => {
		setAuthType(type)
		resetState()
	}

	const userInputRef = useCallback(
		name => {
			const placeholder = name.charAt(0).toUpperCase() + name.slice(1)
			let helperText = ''
			if (name === 'email' && userCredentialsError.email) {
				helperText = `Fill the correct ${placeholder}`
			} else if (name === 'password' && userCredentialsError.password) {
				helperText = `Fill the correct ${placeholder}`
			} else {
				helperText = null
			}
			return (
				<TextField
					disabled={loading}
					value={name === 'email' ? userCredentials.email || '' : userCredentials.password || ''}
					type={name}
					onChange={inputChangeHandler}
					name={name}
					helperText={helperText}
					variant='standard'
					error={name === 'email' ? userCredentialsError.email : userCredentialsError.password}
					label={placeholder}
					sx={{
						width: '100%',
						margin: '.5em 0',
					}}
				/>
			)
		},
		[userCredentials, userCredentialsError, loading]
	)

	const inputChangeHandler = event => {
		const { name, value } = event.target
		setUserCredentials({ ...userCredentials, [name]: value })
	}

	return (
		<>
			<Collapse in={toast.success}>
				<Alert
					sx={{
						position: 'absolute',
						bottom: '2%',
						right: '2%',
					}}
					icon={<CheckIcon fontSize='inherit' />}
					severity='success'
				>
					<AlertTitle>Success</AlertTitle>
					{toast.success}
				</Alert>
			</Collapse>
			<Dialog
				open={showAuthDialog}
				onClose={() => authDialogHandler(false)}
				sx={{
					'& .MuiPaper-root': {
						width: '25em',
						boxSizing: 'border-box',
					},
				}}
			>
				{loading && (
					<CircularProgress
						sx={{
							position: 'absolute',
							top: '45%',
							left: '45%',
						}}
					/>
				)}
				<div
					style={{
						display: 'flex',
						justifyContent: 'end',
					}}
				>
					<CloseIcon
						sx={{
							margin: '.5em 0.5em 0 .5em',
						}}
						onClick={() => authDialogHandler(false)}
					/>
				</div>
				<Container sx={{ width: '20em', padding: 0 }}>
					<DialogTitle
						sx={{
							textAlign: 'center',
							padding: '0',
						}}
					>
						{authType}
					</DialogTitle>

					{toast.error && (
						<Alert
							sx={{
								marginTop: '1em',
								width: '100% !important',
							}}
							severity='warning'
						>
							{toast.error}
						</Alert>
					)}

					{userInputRef('email')}
					{userInputRef('password')}

					<div className='signup-help'>
						{authType === LOGIN && (
							<div className='signup-help-align'>
								{SIGNUP_HELP_TEXT}
								<div className='signup-help-button signup-help-align' onClick={() => authTypeHandler(SIGNUP)}>
									{SIGNUP_LABEL}
								</div>
							</div>
						)}
						{authType === SIGNUP && (
							<div className='signup-help-align'>
								{LOGIN_HELP_TEXT}
								<div className='signup-help-button signup-help-align' onClick={() => authTypeHandler(LOGIN)}>
									{LOGIN_LABEL}
								</div>
							</div>
						)}
					</div>

					<Button
						disabled={loading}
						variant='contained'
						sx={{
							width: '100%',
							margin: '1.5em 0 2.5em 0',
						}}
						onClick={validateForm}
					>
						{authType === LOGIN ? LOGIN_LABEL : SIGNUP_LABEL}
					</Button>
				</Container>
			</Dialog>
		</>
	)
})
