
import Home from '../pages/Home'
import { Route } from 'react-router-dom'
import Signup from '../pages/Signup'
import Signin from '../pages/Signin'

const PublicRoutes = () => {
  return (
    <>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/signin" element={<Signin />} />
    </>
  )
}

export default PublicRoutes
