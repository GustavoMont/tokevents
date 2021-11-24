import {
    Routes,
    Route,
    Navigate
} from 'react-router-dom'
import Index from './pages'
import Home from './pages/Home'
import { Context } from './Context/AuthContext'
import { useContext } from 'react'
import { EventProvider } from './Context/EventContext'
import Footer from './Components/Footer'


const Private = ( { isAuth, children } ) => (
    isAuth ? (
        children
    ) : (
        <Navigate to="/" />
    )
)
const Rotas = () => {
    const { isAuth  } = useContext(Context)
    return (
            <Routes>
                <Route path="/" element={
                    <>
                        <Index />
                        <Footer />
                    </>
                } />
                <Route path="/home" element={
                    <Private isAuth={isAuth} >
                        <EventProvider>
                            <Home />
                            <Footer />
                        </EventProvider>
                    </Private>
                }/>
            </Routes>
    )
}

export default Rotas