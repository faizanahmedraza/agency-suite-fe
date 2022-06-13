import { Link } from 'react-router-dom'
import Avatar from '@components/avatar'
import { User, Power } from 'react-feather'
import { UncontrolledDropdown, DropdownMenu, DropdownToggle, DropdownItem } from 'reactstrap'
import defaultAvatar from '@src/assets/images/portrait/small/avatar-s-27.png'
import LogoutAction from "@store/V1/Auth/Logout/LogoutAction";
import { useDispatch, useSelector } from "@store/store"
import { useState, useEffect } from "react"

const UserDropdown = () => {
  const dispatch = useDispatch();
  const {
    login: {
      user: login_user
    },
    profile_settings:
    {
      update: {
        user: profile_user,
        isFetched
      }
    }

  } = useSelector(state => state)

  const [user, setUser] = useState()

  useEffect(() => {
    if (!isFetched) return setUser(login_user)
    setUser(profile_user)
  }, [profile_user, login_user])

  const role = user?.roles[0].name;
  const logo = user?.image;

  const logOut = () => {
    dispatch(LogoutAction.deleteLogout());
  }

  return (
    <UncontrolledDropdown tag='li' className='dropdown-user nav-item'>
      <DropdownToggle href='/' tag='a' className='nav-link dropdown-user-link' onClick={e => e.preventDefault()}>
        <div className='user-nav d-sm-flex d-none'>
          <span className='user-name fw-bold'>{user?.first_name + ' ' + user?.last_name}</span>
          <span className='user-status'>{role}</span>
        </div>
        <Avatar img={logo ? logo : defaultAvatar} imgHeight='40' imgWidth='40' status='online' />
      </DropdownToggle>
      <DropdownMenu end>
        <DropdownItem tag={Link} to='/profile'>
          <User size={14} className='me-75' />
          <span className='align-middle'>Profile</span>
        </DropdownItem>
        <DropdownItem className='w-100' onClick={logOut}>
          <Power size={14} className='me-75' />
          <span className='align-middle'>Logout</span>
        </DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  )
}

export default UserDropdown
