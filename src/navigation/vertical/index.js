import { Zap, Home, Users, ShoppingCart, File, Settings, DollarSign } from 'react-feather'

export default [
  {
    id: 'Dashboard',
    title: 'Dashboard',
    icon: <Home size={20} />,
    navLink: '/dashboard'
  },
  {
    header: 'Orders'
  },
  {
    id: 'Invoice',
    title: 'Invoices',
    icon: <File size={20} />,
    navLink: '/invoice'
  },
  {
    id: 'Customer_Invoices',
    title: 'Invoices',
    icon: <File size={20} />,
    navLink: '/customer-invoices'
  },
  {
    id: 'Requests',
    title: 'Requests',
    icon: <ShoppingCart size={20} />,
    navLink: '/service-requests'
  },
  // Customer Routes
  {
    id: 'Customer_Requests',
    title: 'Requests',
    icon: <ShoppingCart size={20} />,
    navLink: '/customer-service-requests'
  },
  {
    id: 'Customer_Billing',
    title: 'Billing',
    icon: <DollarSign size={20} />,
    navLink: '/billing'
  },
  {
    header: 'Catalog'
  },
  {
    id: 'Customer_Services',
    title: 'Services',
    icon: <Zap size={20} />,
    navLink: '/customer-services'
  },

  {
    header: 'Set up'
  },
  {
    id: 'Portal',
    title: 'Portal',
    icon: <Settings size={20} />,
    navLink: '/portal'
  },
  {
    id: 'Services',
    title: 'Services',
    icon: <Zap size={20} />,
    navLink: '/services'
  },
  {
    id: 'Customers',
    title: 'Customers',
    icon: <Users size={20} />,
    navLink: '/customers'
  },
]
