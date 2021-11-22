import { 
    Routes as Manager,
    Route
} from 'react-router-dom'
import Index from './pages'
import Home from './pages/Home'

const Routes = () => (
     <Manager>
         <Route path="/" element={<Index />}  />
         <Route path="/home" element={<Home />}  />
     </Manager>
)

export default Routes