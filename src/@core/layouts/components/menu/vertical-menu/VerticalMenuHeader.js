import { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { Disc, X, Circle } from 'react-feather'
import themeConfig from '@configs/themeConfig'
import { getUserData, getHomeRouteForLoggedInUser } from '@utils'
import { useSelector } from "@store/store"

const VerticalMenuHeader = props => {
  // ** Props
  const { menuCollapsed, setMenuCollapsed, setMenuVisibility, setGroupOpen, menuHover } = props

  const { detail } = useSelector(state => state.portal_settings)

  const { logo, agency } = detail.portal_settings

  // ** Vars
  const user = getUserData()

  // ** Reset open group
  useEffect(() => {
    if (!menuHover && menuCollapsed) setGroupOpen([])
  }, [menuHover, menuCollapsed])

  // ** Menu toggler component
  const Toggler = () => {
    if (!menuCollapsed) {
      return (
        <Disc
          size={20}
          data-tour='toggle-icon'
          className='text-primary toggle-icon d-none d-xl-block'
          onClick={() => setMenuCollapsed(true)}
        />
      )
    } else {
      return (
        <Circle
          size={20}
          data-tour='toggle-icon'
          className='text-primary toggle-icon d-none d-xl-block'
          onClick={() => setMenuCollapsed(false)}
        />
      )
    }
  }

  return (
    <div className='navbar-header'>
      <ul className='nav navbar-nav flex-row'>
        <li className='nav-item me-auto'>
          {/* <NavLink to={user ? getHomeRouteForLoggedInUser(user.role) : '/'} className='navbar-brand bg-info '> */}
            <div className='brand-logo w-100'>
              <img src={logo} height="70" alt='logo'/>
            </div>
          {/* </NavLink> */}
        </li>
        <li className='nav-item nav-toggle'>
          <div className='nav-link modern-nav-toggle cursor-pointer'>
            <Toggler />
            <X onClick={() => setMenuVisibility(false)} className='toggle-icon icon-x d-block d-xl-none' size={20} />
          </div>
        </li>
      </ul>
    </div>
  )
}

export default VerticalMenuHeader
