import { Zap, Home , ShoppingCart } from 'react-feather'

export default [
  {
    id: 'Dashboard',
    title: 'Dashboard',
    icon: <Home size={20} />,
    navLink: '/dashboard'
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
  }
]
