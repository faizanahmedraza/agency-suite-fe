import { Zap, Home, Users, ShoppingCart, File } from 'react-feather'

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
    title: 'Invoice',
    icon: <File size={20} />,
    navLink: '/invoice'
  },
  {
    header: 'Set up'
  },
  {
    id: 'Portal',
    title: 'Portal',
    icon: <ShoppingCart size={20} />,
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
