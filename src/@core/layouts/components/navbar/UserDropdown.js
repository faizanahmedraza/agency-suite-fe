// ** React Imports
import { Link } from 'react-router-dom'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Third Party Components
import { User, Power } from 'react-feather'

// ** Reactstrap Imports
import { UncontrolledDropdown, DropdownMenu, DropdownToggle, DropdownItem } from 'reactstrap'

// ** Default Avatar Image
import defaultAvatar from '@src/assets/images/portrait/small/avatar-s-27.png'

import { useEffect, useState } from "react"

import LogoutHelper from "@src/Helpers/LogoutHelper"

import SettingHelper from "@src/Helpers/SettingHelper";

const UserDropdown = () => {

  const user = SettingHelper.localData(localStorage.getItem("user"));
  const [userProfile, setUserProfile] = useState(user);
  const role = userProfile?.roles[0].name;
  const logo = userProfile?.image;

  return (
    <UncontrolledDropdown tag='li' className='dropdown-user nav-item'>
      <DropdownToggle href='/' tag='a' className='nav-link dropdown-user-link' onClick={e => e.preventDefault()}>
        <div className='user-nav d-sm-flex d-none'>
          <span className='user-name fw-bold'>{(role !== 'Agency') ? userProfile?.first_name + ' ' + userProfile?.last_name : userProfile?.first_name}</span>
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
