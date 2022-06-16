import { lazy } from "react";
// ** Layouts
import BlankLayout from '@layouts/BlankLayout'
// ** Router imports
import { useRoutes } from 'react-router-dom'
const Error = lazy(() => import("@src/views/Error"));
const Login = lazy(() => import("@src/views/Login"));

const Router = ({ allRoutes }) => { 

  const routes = useRoutes([
    ...allRoutes
  ])

  return routes
}

export default Router
