import { lazy } from "react";
// ** Layouts
import BlankLayout from '@layouts/BlankLayout'
// ** Router imports
import { useRoutes } from 'react-router-dom'
const Error = lazy(() => import("@src/views/Error"));

const Router = ({ allRoutes }) => { 

  const routes = useRoutes([
    {
      path: '*',
      element: <BlankLayout />,
      children: [{ path: '*', element: <Error /> }]
    },
    ...allRoutes
  ])

  return routes
}

export default Router
