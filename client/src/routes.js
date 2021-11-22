import {
    Routes as Manager,
    Route,
    Navigate
} from 'react-router-dom'
import Index from './pages'
import Home from './pages/Home'
import { Context } from './Context/AuthContext'
import { useContext } from 'react'


const Private = ( { isAuth, children } ) => (
    isAuth ? (
        children
    ) : (
        <Navigate to="/" />
    )
)
const Routes = () => {
    const { isAuth  } = useContext(Context)
    return (
            <Manager>
                <Route path="/" element={<Index />} />
                <Route path="/home" element={
                    <Private isAuth={isAuth} >
                        <Home />
                    </Private>
                } />
            </Manager>
    )
}

export default Routes