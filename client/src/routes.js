import { 
    Routes as Manager,
    Route
} from 'react-router-dom'
import Home from './pages'


const Routes = () => (
     <Manager>
         <Route path="/" element={<Home />}  />
     </Manager>
)

export default Routes