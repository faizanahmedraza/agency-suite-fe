import { Mail, Home, Check } from 'react-feather'

export default [
  {
    id: 'home',
    title: 'Home',
    icon: <Home size={20} />,
    navLink: '/home'
  },
  {
    id: 'secondPage',
    title: 'Second Page',
    icon: <Mail size={20} />,
    navLink: '/second-page'
  },
  {
    id: 'newPage',
    title: 'New Page',
    icon: <Check size={20} />,
    navLink: '/new-page'
  }
]
