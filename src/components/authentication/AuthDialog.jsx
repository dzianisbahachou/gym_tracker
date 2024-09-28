import React, { useState } from 'react'
import {
	AlertTitle,
	Button,
	CircularProgress,
	Collapse,
	Container,
	Dialog,
	DialogTitle,
	TextField,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import Alert from '@mui/material/Alert'
import CheckIcon from '@mui/icons-material/Check'

import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
} from 'firebase/auth'
import { auth } from '../../firebase'
import {
	emailValidator,
	LOGIN,
	LOGIN_ERROR,
	LOGIN_SUCCESS_MSG,
	passwordValidator,
	SIGNUP,
	SIGNUP_ERROR,
	SIGNUP_SUCCESS_MSG,
} from '../../utils/authUtil'
import './authDialog.css'

export const AuthDialog = ({ showAuthDialogHandler, showAuthDialog }) => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [emailError, setEmailError] = useState(false)
	const [passwordError, setPasswordError] = useState(false)
	const [authType, setAuthType] = useState(LOGIN)
	const [loading, setLoading] = useState(false)
	const [successToast, setSuccessToast] = useState(null)
	const [errorAuthToast, setErrorAuthToast] = useState(null)

	const emailHandler = () => {
		const emailValidity = emailValidator(email)
		setEmailError(!emailValidity)
		return emailValidity
	}

	const passwordHandler = () => {
		const passwordValidity = passwordValidator(password)
		setPasswordError(!passwordValidity)
		return passwordValidity
	}

	const resetState = () => {
		setEmail('')
		setPassword('')
		setEmailError(false)
		setPasswordError()
		setErrorAuthToast(null)
	}

	const authDialogHandler = (state) => {
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

	const showSuccessToast = (text) => {
		setSuccessToast(text)
		setTimeout(() => {
			setSuccessToast(null)
		}, 3000)
	}

	const login = () => {
		setLoading(true)
		setErrorAuthToast(null)
		signInWithEmailAndPassword(auth, email, password)
			.then((userCreds) => {
				const user = userCreds.user
				console.log('LOGIN', user)
				authDialogHandler()
				showSuccessToast(LOGIN_SUCCESS_MSG)
			})
			.catch((e) => {
				setErrorAuthToast(LOGIN_ERROR)
			})
			.finally(() => {
				setLoading(false)
			})
	}

	const signup = async () => {
		setLoading(true)
		setErrorAuthToast(null)
		await createUserWithEmailAndPassword(auth, email, password)
			.then((userCreds) => {
				const user = userCreds.user
				console.log('SIGNUP', user)
				authDialogHandler()
				showSuccessToast(SIGNUP_SUCCESS_MSG)
			})
			.catch((e) => {
				setErrorAuthToast(SIGNUP_ERROR)
			})
			.finally(() => {
				setLoading(false)
			})
	}

	const authTypeHandler = (type) => {
		setAuthType(type)
		resetState()
	}

	return (
		<>
			<Collapse in={successToast}>
				<Alert
					sx={{ position: 'absolute', bottom: '2%', right: '2%' }}
					icon={<CheckIcon fontSize='inherit' />}
					severity='success'
				>
					<AlertTitle>Success</AlertTitle>
					{successToast}
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
						sx={{ position: 'absolute', top: '45%', left: '45%' }}
					/>
				)}
				<div style={{ display: 'flex', justifyContent: 'end' }}>
					<CloseIcon
						sx={{ margin: '.5em 0.5em 0 .5em' }}
						onClick={() => authDialogHandler(false)}
					/>
				</div>
				<Container sx={{ width: '20em', padding: 0 }}>
					<DialogTitle sx={{ textAlign: 'center', padding: '0' }}>
						{authType}
					</DialogTitle>

					{errorAuthToast && (
						<Alert
							sx={{ marginTop: '1em', width: '100% !important' }}
							severity='warning'
						>
							{errorAuthToast}
						</Alert>
					)}

					<TextField
						disabled={loading}
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						helperText={
							emailError ? 'Fill the correct Email' : null
						}
						variant='standard'
						error={emailError}
						label='Email'
						sx={{ width: '100%', margin: '.5em 0' }}
					/>
					<TextField
						disabled={loading}
						type='password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						helperText={
							passwordError ? 'Fill the correct password' : null
						}
						variant='standard'
						error={passwordError}
						id='outlined-error'
						label='Password'
						sx={{ width: '100%', margin: '.5em 0' }}
					/>

					<div className='signup-help'>
						{authType === LOGIN && (
							<div className='signup-help-align'>
								Don't have an account?{' '}
								<div
									className='signup-help-button signup-help-align'
									onClick={() => authTypeHandler(SIGNUP)}
								>
									Register
								</div>
							</div>
						)}
						{authType === SIGNUP && (
							<div className='signup-help-align'>
								Already have an account?{' '}
								<div
									className='signup-help-button signup-help-align'
									onClick={() => authTypeHandler(LOGIN)}
								>
									Sign In
								</div>
							</div>
						)}
					</div>

					<Button
						disabled={loading}
						variant='contained'
						sx={{ width: '100%', margin: '1.5em 0 2.5em 0' }}
						onClick={validateForm}
					>
						{authType}
					</Button>
				</Container>
			</Dialog>
		</>
	)
}
