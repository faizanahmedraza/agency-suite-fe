// ** React Imports
import { Suspense } from 'react'
import { Navigate } from 'react-router-dom'
import config from "@configs/Config"
import { useSelector } from "@store/store"

const PublicRoute = ({ children, route }) => {

  if (route) {

    const { user } = useSelector(state => state.login)

    // if (window.location.hostname + window.location.pathname === config.public_url + '/login') return <Navigate to="/launch" replace />

    // if (window.location.hostname + window.location.pathname !== config.public_url + '/launch' && window.location.pathname === "/launch") return <Navigate to="/login" replace />

    const restrictedRoute = route.meta && route.meta.restricted

    if (user && restrictedRoute) return <Navigate replace to="/dashboard" />

  }

  return <Suspense fallback={null}>{children}</Suspense>

}

export default PublicRoute
