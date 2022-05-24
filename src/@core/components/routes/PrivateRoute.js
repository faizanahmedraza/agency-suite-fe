// ** React Imports
import { Navigate } from 'react-router-dom'
import { Suspense } from 'react'
import { useSelector } from "@store/store"

const PrivateRoute = ({ children, route }) => {

  const { user } = useSelector(state => state.login)

  console.log(user)

  if (route) {
    let action = null
    let resource = null
    let restrictedRoute = false

    if (route.meta) {

      action = route.meta.action
      resource = route.meta.resource
      restrictedRoute = route.meta.restricted
    }
    
    if (!user) return <Navigate to='/login' replace />
    
    if (user && restrictedRoute) return <Navigate to='/dashboard' replace />
    
  }

  return <Suspense fallback={null}>{children}</Suspense>
}

export default PrivateRoute
