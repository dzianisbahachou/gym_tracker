import { createContext, useState } from 'react'

export const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
	const [isLoggedIn, setIsLoggedIn] = useState(false)

	const setItem = value => {
		window.localStorage.setItem('access-token', value)
		setIsLoggedIn(true)
	}

	const removeItem = () => {
		window.localStorage.removeItem('access-token')
		setIsLoggedIn(false)
	}

	const stayInPageHandler = () => {
		setIsLoggedIn(true)
	}

	const leavePageHandler = () => {
		setIsLoggedIn(false)
	}

	return (
		<AuthContext.Provider
			value={{
				isLoggedIn,
				setItem,
				removeItem,
				stayInPageHandler,
				leavePageHandler,
			}}
		>
			{children}
		</AuthContext.Provider>
	)
}
