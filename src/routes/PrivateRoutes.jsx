
import { Route } from 'react-router-dom'
import Dashboard from '../pages/Dashboard'
import PrivateRoute from '../components/privateroute/PrivateRoute'

const PrivateRoutes = () => {

   return (
    <>
      
        <Route path="/dashboard" 
          element={<PrivateRoute><Dashboard /> </PrivateRoute>} 
          
        />
      
    </>
  )

}

export default PrivateRoutes
