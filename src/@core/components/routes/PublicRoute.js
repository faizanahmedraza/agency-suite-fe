// ** React Imports
import { Suspense } from 'react'
import { Navigate } from 'react-router-dom'
import config from "@configs/Config"
// import { getUserData, getHomeRouteForLoggedInUser } from '@utils'
import { getUserData } from '@utils'

const PublicRoute = ({ children, route }) => {
  if (route) {

    // if (window.location.hostname === config.public_url+"/login") {
    //   window.location === "/launch"
    // }

    const user = getUserData()

    // console.log(window.location.hostname)

    const restrictedRoute = route.meta && route.meta.restricted

    if (user && restrictedRoute) {
      return <Navigate replace to="/dashboard" />
    }
  }

  return <Suspense fallback={null}>{children}</Suspense>
}

export default PublicRoute
