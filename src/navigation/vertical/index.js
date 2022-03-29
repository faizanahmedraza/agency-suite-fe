import { Mail, Home } from 'react-feather'

export default [
  {
    id: 'Dashboard',
    title: 'Dashboard',
    icon: <Home size={20} />,
    navLink: '/dashboard'
  },
  {
    id: 'Services',
    title: 'Services',
    icon: <Mail size={20} />,
    navLink: '/services'
  }
]
