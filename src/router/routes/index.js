// ** React Imports
import { Fragment, lazy } from 'react'
import { Navigate } from 'react-router-dom'
// ** Layouts
import BlankLayout from '@layouts/BlankLayout'
import VerticalLayout from '@src/layouts/VerticalLayout'
import HorizontalLayout from '@src/layouts/HorizontalLayout'
import LayoutWrapper from '@src/@core/layouts/components/layout-wrapper'

// ** Route Components
import PublicRoute from '@components/routes/PublicRoute'
import PrivateRoute from '@components/routes/PrivateRoute'

// ** Utils
import { isObjEmpty } from '@utils'

const getLayout = {
  blank: <BlankLayout />,
  vertical: <VerticalLayout />,
  horizontal: <HorizontalLayout />
}

// ** Document title
const TemplateTitle = '%s - Vuexy React Admin Template'

// ** Default Route
const DefaultRoute = '/dashboard'

const Dashboard = lazy(() => import('../../views/Dashboard/dashboard'))
const Profile = lazy(() => import('../../views/Profile/Profile'))
const Services = lazy(() => import('../../views/Services/services'))
const Customers = lazy(() => import('../../views/Customers/Customers'))
const CreateCustomer = lazy(() => import('../../views/Customers/CreateCustomer'))
const UpdateCustomer = lazy(() => import('../../views/Customers/UpdateCustomer'))
const Portal = lazy(() => import('../../views/Portal/portal'))
const Invoice = lazy(() => import('../../views/Invoice/invoice'))
const CreateInvoice = lazy(() => import('../../views/Invoice/Create Invoice'))
const CreateServices = lazy(() => import('../../views/Services/Create Service/createService'))
const EditServices = lazy(() => import('../../views/Services/Edit Service/editService'))
const Login = lazy(() => import('../../views/Login'))
const Register = lazy(() => import('../../views/Register'))
const Verification = lazy(() => import('../../views/Verification'))
const ForgotPassword = lazy(() => import('../../views/ForgotPassword'))
const Error = lazy(() => import('../../views/Error'))

// ** Merge Routes
const Routes = [
  {
    path: '/',
    index: true,
    element: <Navigate replace to={DefaultRoute} />
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
    // meta: {
    //   publicRoute: true,
    // }
   
  },
  {
    path: '/profile',
    element: <Profile />,
    // meta: {
    //   publicRoute: true,
    // }
   
  },
  {
    path: '/services',
    element: <Services />,
    // meta: {
    //   publicRoute: true,
    // }
   
   
  },
  {
    path: '/services/create',
    element: <CreateServices />,
    // meta: {
    //   publicRoute: true,
    // }
   
    
  },
  {
    path: '/services/edit/:id',
    element: <EditServices />,
    // meta: {
    //   publicRoute: true,
    // }
   
  },
  {
    path: '/customers',
    element: <Customers />,
    // meta: {
    //   publicRoute: true,
    // }
   
  },
  {
    path: '/customers/create',
    element: <CreateCustomer />,
    // meta: {
    //   publicRoute: true,
    // }
   
  }
  ,
  {
    path: '/customers/edit/:id',
    element: <UpdateCustomer />,
    // meta: {
    //   publicRoute: true,
    // }
   
  }
  ,
  {
    path: '/customers/delete/:id',
    element: <UpdateCustomer />,
    // meta: {
    //   publicRoute: true,
    // }
   
  },
  {
    path: '/portal',
    element: <Portal />,
    // meta: {
    //   publicRoute: true,
    // }
   
   
  },
  {
    path: '/invoice',
    element: <Invoice />,
    meta: {
      layout: 'vertical',
      publicRoute: true,
    }
  },
  {
    path: '/invoice/create',
    element: <CreateInvoice />,
    meta: {
      layout: 'vertical',
      // publicRoute: true,
    }
  },
  {
    path: '/invoice/edit/:id',
    element: <CreateInvoice />,
    meta: {
      layout: 'vertical',
      // publicRoute: true,
    }
  },
  {
    path: '/login',
    element: <Login />,
    meta: {
      layout: 'blank',
      publicRoute: true,
      restricted: true
    }
  },
  {
    path: '/register',
    element: <Register />,
    meta: {
      layout: 'blank',
      publicRoute: true,
      restricted: true
    }
  },
  {
    path: '/verify/:token',
    element: <Verification />,
    meta: {
      layout: 'blank',
      publicRoute: true,
      restricted: true,
      
    }
  },
  {
    path: '/forgot-password',
    element: <ForgotPassword />,
    meta: {
      layout: 'blank',
      publicRoute: true,
      restricted: true
    }
  },
  {
    path: '/error',
    element: <Error />,
    meta: {
      layout: 'blank',
      
    }
  }
]

const getRouteMeta = route => {
  if (isObjEmpty(route.element.props)) {
    if (route.meta) {
      return { routeMeta: route.meta }
    } else {
      return {}
    }
  }
}

// ** Return Filtered Array of Routes & Paths
const MergeLayoutRoutes = (layout, defaultLayout) => {
  const LayoutRoutes = []

  if (Routes) {
    Routes.filter(route => {
      let isBlank = false
      // ** Checks if Route layout or Default layout matches current layout
      if (
        (route.meta && route.meta.layout && route.meta.layout === layout) ||
        ((route.meta === undefined || route.meta.layout === undefined) && defaultLayout === layout)
      ) {
        let RouteTag = PrivateRoute

        // ** Check for public or private route
        if (route.meta) {
          route.meta.layout === 'blank' ? (isBlank = true) : (isBlank = false)
          RouteTag = route.meta.publicRoute ? PublicRoute : PrivateRoute
        }
        if (route.element) {
          const Wrapper =
            // eslint-disable-next-line multiline-ternary
            isObjEmpty(route.element.props) && isBlank === false
              ? // eslint-disable-next-line multiline-ternary
              LayoutWrapper
              : Fragment

          route.element = (
            <Wrapper {...(isBlank === false ? getRouteMeta(route) : {})}>
              <RouteTag route={route}>{route.element}</RouteTag>
            </Wrapper>
          )
        }

        // Push route to LayoutRoutes
        LayoutRoutes.push(route)
      }
      return LayoutRoutes
    })
  }
  return LayoutRoutes
}

const getRoutes = layout => {
  const defaultLayout = layout || 'vertical'
  const layouts = ['vertical', 'horizontal', 'blank']

  const AllRoutes = []

  layouts.forEach(layoutItem => {
    const LayoutRoutes = MergeLayoutRoutes(layoutItem, defaultLayout)

    AllRoutes.push({
      path: '/',
      element: getLayout[layoutItem] || getLayout[defaultLayout],
      children: LayoutRoutes
    })
  })
  return AllRoutes
}


export { DefaultRoute, TemplateTitle, Routes, getRoutes }
