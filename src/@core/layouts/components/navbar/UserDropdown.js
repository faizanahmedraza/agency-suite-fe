import { Link } from 'react-router-dom'
import Avatar from '@components/avatar'
import { User, Power } from 'react-feather'
import { UncontrolledDropdown, DropdownMenu, DropdownToggle, DropdownItem } from 'reactstrap'
import defaultAvatar from '@src/assets/images/portrait/small/avatar-s-27.png'
import LogoutHelper from "@src/Helpers/LogoutHelper"
import { useSelector } from "@store/store"

const UserDropdown = () => {
  const {
    login: {
      user 
    },
  } = useSelector(state => state)

  const role = user?.roles[0].name;
  const logo = user?.image;

  return (
    <UncontrolledDropdown tag='li' className='dropdown-user nav-item'>
      <DropdownToggle href='/' tag='a' className='nav-link dropdown-user-link' onClick={e => e.preventDefault()}>
        <div className='user-nav d-sm-flex d-none'>
          <span className='user-name fw-bold'>{(role !== 'Agency') ? user?.first_name + ' ' + user?.last_name : user?.first_name}</span>
          <span className='user-status'>{role}</span>
        </div>
        <Avatar img={logo ? logo : defaultAvatar} imgHeight='40' imgWidth='40' status='online' />
      </DropdownToggle>
      <DropdownMenu end>
        <DropdownItem tag={Link} to='/profile'>
          <User size={14} className='me-75' />
          <span className='align-middle'>Profile</span>
        </DropdownItem>
        <DropdownItem onClick={() => LogoutHelper.logout()} tag={Link} to='/login'>
          <Power size={14} className='me-75' />
          <span className='align-middle'>Logout</span>
        </DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  )
}

export default UserDropdown
