import { Route, BrowserRouter, Routes } from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import { SideBarPermanent } from './components/SideBar/SideBarPermanent'
import { Header } from './components/Header'
import Container from '@mui/material/Container'
import { useContext, useEffect } from 'react'
import { AuthContext } from './context/auth-context'

function App() {
	const { isLoggedIn, stayInPageHandler, leavePageHandler } = useContext(AuthContext)

	useEffect(() => {
		const accessToken = window.localStorage.getItem('access-token')
		accessToken ? stayInPageHandler() : leavePageHandler()
	}, [])

	return (
		<BrowserRouter>
			<Header />
			{isLoggedIn && (
				<div style={{ display: 'flex' }}>
					<SideBarPermanent />
					<Container
						disableGutters
						sx={{
							margin: { xs: '1em 1em', lg: '1em 2em', xl: '1em 2em' },
						}}
						maxWidth='2000px'
					>
						<Routes>
							<Route path='/' element={<HomePage />} />
						</Routes>
					</Container>
				</div>
			)}
		</BrowserRouter>
	)
}

export default App
