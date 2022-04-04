// ** React Imports
import { Navigate } from 'react-router-dom'
import { useContext, Suspense } from 'react'

// ** Context Imports
import { AbilityContext } from '@src/utility/context/Can'

const PrivateRoute = ({ children, route }) => {
  // ** Hooks & Vars
  const ability = useContext(AbilityContext)
  const user = JSON.parse(localStorage.getItem('user'))

  if (route) {
    let action = null
    let resource = null
    let restrictedRoute = false

    if (route.meta) {

      action = route.meta.action
      resource = route.meta.resource
      restrictedRoute = route.meta.restricted
    }
    if (!user) {
      console.log('working')
      return <Navigate to='/login' />
    }
    if (user && restrictedRoute) {
      console.log('working')
      return <Navigate to='/dashboard' />
    }
    if (user && restrictedRoute && user.role === 'client') {
      console.log('working')
      return <Navigate to='/access-control' />
    }
    // if (user && !ability.can(action || 'read', resource)) {
    //   return <Navigate to='/misc/not-authorized' replace />
    // }
  }

  return <Suspense fallback={null}>{children}</Suspense>
}

export default PrivateRoute
