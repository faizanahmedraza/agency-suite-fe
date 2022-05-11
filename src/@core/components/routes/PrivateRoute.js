// ** React Imports
import { Navigate } from 'react-router-dom'
import { Suspense } from 'react'
import { useSelector } from "@store/store"
import config from "@configs/Config"

// ** Context Imports
import { AbilityContext } from '@src/utility/context/Can'

const PrivateRoute = ({ children, route }) => {
  // ** Hooks & Vars
  // const ability = useContext(AbilityContext)
  const { user } = useSelector(state => state.login)



  console.log(config.public_url)
  console.log(route.path)
  console.log(window.location.hostname + window.location.pathname)

  if (route) {
    let action = null
    let resource = null
    let restrictedRoute = false

    if (route.meta) {

      action = route.meta.action
      resource = route.meta.resource
      restrictedRoute = route.meta.restricted
    }

    if (window.location.hostname + window.location.pathname === config.public_url + '/login') return <Navigate to="/launch" replace />

    if (!user) {
      return <Navigate to='/login' />
    }
    if (user && restrictedRoute) {
      return <Navigate to='/dashboard' />
    }
    // if (user && restrictedRoute && user.role === 'client') {
    //   return <Navigate to='/access-control' />
    // }
    // if (user && !ability.can(action || 'read', resource)) {
    //   return <Navigate to='/misc/not-authorized' replace />
    // }
  }

  return <Suspense fallback={null}>{children}</Suspense>
}

export default PrivateRoute
