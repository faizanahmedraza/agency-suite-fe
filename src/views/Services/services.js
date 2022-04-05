import React, { useState } from 'react'
import AvatarGroup from '@components/avatar-group'
import { Link } from 'react-router-dom'
import {
    Table,
    Card,
    CardBody,
    TabContent,
    TabPane,
    UncontrolledDropdown,
    Badge, DropdownMenu,
    DropdownItem,
    DropdownToggle,
    Nav,
    NavItem,
    NavLink,
    Button,
    Label,
    Input
} from 'reactstrap'
import react from '@src/assets/images/icons/react.svg'
import { MoreVertical, Edit, Trash } from 'react-feather'
import angular from '@src/assets/images/icons/angular.svg'
import avatar1 from '@src/assets/images/portrait/small/avatar-s-5.jpg'
import avatar2 from '@src/assets/images/portrait/small/avatar-s-6.jpg'
import avatar3 from '@src/assets/images/portrait/small/avatar-s-7.jpg'

const Services = () => {

    const [active, setActive] = useState('1')

    const avatarGroupData1 = [
        {
            title: 'Leslie',
            img: avatar1,
            imgHeight: 26,
            imgWidth: 26
        },
        {
            title: 'Quinn',
            img: avatar2,
            imgHeight: 26,
            imgWidth: 26
        },
        {
            title: 'Quinn',
            img: avatar3,
            imgHeight: 26,
            imgWidth: 26
        }
    ]

    const avatarGroupData2 = [
        {
            title: 'Felicia',
            img: avatar1,
            imgHeight: 26,
            imgWidth: 26
        },
        {
            title: 'Brent',
            img: avatar2,
            imgHeight: 26,
            imgWidth: 26
        },
        {
            title: 'Patricia',
            img: avatar3,
            imgHeight: 26,
            imgWidth: 26
        }
    ]


    const toggle = tab => {
        if (active !== tab) {
            setActive(tab)
        }
    }

    return (
        <div>
            <Card>
                <CardBody>
                    <div className='row'>
                        <div className='col-md-9'>
                            <h1>Services</h1>
                        </div>
                        <div className='col-md-3'>
                            <Link to="/services/create">
                                <Button.Ripple color='primary' className="w-100">Create Services</Button.Ripple>
                            </Link>
                        </div>
                    </div>
                </CardBody>
            </Card>
            <Card>
                <CardBody>
                    <Nav tabs fill>
                        <NavItem>
                            <NavLink
                                active={active === '1'}
                                onClick={() => {
                                    toggle('1')
                                }}
                            >
                                All
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                active={active === '2'}
                                onClick={() => {
                                    toggle('2')
                                }}
                            >
                                Active
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                active={active === '3'}
                                onClick={() => {
                                    toggle('3')
                                }}
                            >
                                One-off
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                active={active === '4'}
                                onClick={() => {
                                    toggle('4')
                                }}
                            >
                                Subscription
                            </NavLink>
                        </NavItem>
                    </Nav>
                    <TabContent className='py-50' activeTab={active}>
                        <TabPane tabId='1'>
                            <Table bordered responsive>
                                <thead>
                                    <tr>
                                        <th>NAME</th>
                                        <th>PRICE</th>
                                        <th>SHOW CATALOG</th>
                                        <th>SALES</th>
                                        <th>CREATED</th>
                                        <th>UPDATED</th>
                                        <th>ACTIONS</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            {/* <img className='me-75' src={angular} alt='angular' height='20' width='20' /> */}
                                            <span className='align-middle fw-bold'>JHON DOE</span>
                                        </td>
                                        <td>$ 100</td>
                                        <td>
                                            <div className='form-check form-switch'>
                                                <Input type='switch' className='w-75' name='customSwitch' id='exampleCustomSwitch' />
                                            </div></td>
                                        <td>0</td>
                                        <td>
                                            Mar 29, 2022
                                        </td>
                                        <td>
                                            Apr 05, 2022
                                        </td>
                                        <td>
                                            <UncontrolledDropdown>
                                                <DropdownToggle className='icon-btn hide-arrow' color='transparent' size='sm' caret>
                                                    <MoreVertical size={15} />
                                                </DropdownToggle>
                                                <DropdownMenu>
                                                        <Link className='dropdown-item' to="/services/edit/1">
                                                            <Edit className='me-50' size={10} /> <span className='align-middle'>Edit</span>
                                                        </Link>
                                                    <DropdownItem href='/' >
                                                        <Trash className='me-50' size={10} /> <span className='align-middle'>Delete</span>
                                                    </DropdownItem>
                                                </DropdownMenu>
                                            </UncontrolledDropdown>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            {/* <img className='me-75' src={angular} alt='angular' height='20' width='20' /> */}
                                            <span className='align-middle fw-bold'>TREVOR</span>
                                        </td>
                                        <td>$ 400</td>
                                        <td>
                                            <div className='form-check form-switch'>
                                                <Input type='switch' className='w-75' name='customSwitch' id='exampleCustomSwitch' />
                                            </div></td>
                                        <td>5</td>
                                        <td>
                                            Mar 29, 2023
                                        </td>
                                        <td>
                                            Nov 05, 2022
                                        </td>
                                        <td>
                                            <UncontrolledDropdown>
                                                <DropdownToggle className='icon-btn hide-arrow' color='transparent' size='sm' caret>
                                                    <MoreVertical size={15} />
                                                </DropdownToggle>
                                                <DropdownMenu>
                                                        <Link className='dropdown-item' to="/services/edit/2">
                                                            <Edit className='me-50' size={10} /> <span className='align-middle'>Edit</span>
                                                        </Link>
                                                    <DropdownItem href='/' >
                                                        <Trash className='me-50' size={10} /> <span className='align-middle'>Delete</span>
                                                    </DropdownItem>
                                                </DropdownMenu>
                                            </UncontrolledDropdown>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            {/* <img className='me-75' src={angular} alt='angular' height='20' width='20' /> */}
                                            <span className='align-middle fw-bold'>Zach</span>
                                        </td>
                                        <td>$ 300</td>
                                        <td>
                                            <div className='form-check form-switch'>
                                                <Input type='switch' className='w-75' name='customSwitch' id='exampleCustomSwitch' />
                                            </div></td>
                                        <td>2</td>
                                        <td>
                                            Apr 29, 2022
                                        </td>
                                        <td>
                                            Nov 23, 2022
                                        </td>
                                        <td>
                                            <UncontrolledDropdown>
                                                <DropdownToggle className='icon-btn hide-arrow' color='transparent' size='sm' caret>
                                                    <MoreVertical size={15} />
                                                </DropdownToggle>
                                                <DropdownMenu>
                                                        <Link className='dropdown-item' to="/services/edit/3">
                                                            <Edit className='me-50' size={10} /> <span className='align-middle'>Edit</span>
                                                        </Link>
                                                    <DropdownItem href='/' >
                                                        <Trash className='me-50' size={10} /> <span className='align-middle'>Delete</span>
                                                    </DropdownItem>
                                                </DropdownMenu>
                                            </UncontrolledDropdown>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            {/* <img className='me-75' src={angular} alt='angular' height='20' width='20' /> */}
                                            <span className='align-middle fw-bold'>Franklin</span>
                                        </td>
                                        <td>$ 300</td>
                                        <td>
                                            <div className='form-check form-switch'>
                                                <Input type='switch' className='w-75' name='customSwitch' id='exampleCustomSwitch' />
                                            </div></td>
                                        <td>9</td>
                                        <td>
                                            May 30, 2023
                                        </td>
                                        <td>
                                            Dec 05, 2022
                                        </td>
                                        <td>
                                            <UncontrolledDropdown>
                                                <DropdownToggle className='icon-btn hide-arrow' color='transparent' size='sm' caret>
                                                    <MoreVertical size={15} />
                                                </DropdownToggle>
                                                <DropdownMenu>
                                                        <Link className='dropdown-item' to="/services/edit/4">
                                                            <Edit className='me-50' size={10} /> <span className='align-middle'>Edit</span>
                                                        </Link>
                                                    <DropdownItem href='/' >
                                                        <Trash className='me-50' size={10} /> <span className='align-middle'>Delete</span>
                                                    </DropdownItem>
                                                </DropdownMenu>
                                            </UncontrolledDropdown>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            {/* <img className='me-75' src={angular} alt='angular' height='20' width='20' /> */}
                                            <span className='align-middle fw-bold'>Micheal</span>
                                        </td>
                                        <td>$ 800</td>
                                        <td>
                                            <div className='form-check form-switch'>
                                                <Input type='switch' className='w-75' name='customSwitch' id='exampleCustomSwitch' />
                                            </div></td>
                                        <td>7</td>
                                        <td>
                                            Jun 30, 2023
                                        </td>
                                        <td>
                                            July 10, 2022
                                        </td>
                                        <td>
                                            <UncontrolledDropdown>
                                                <DropdownToggle className='icon-btn hide-arrow' color='transparent' size='sm' caret>
                                                    <MoreVertical size={15} />
                                                </DropdownToggle>
                                                <DropdownMenu>
                                                        <Link className='dropdown-item' to="/services/edit/5    ">
                                                            <Edit className='me-50' size={10} /> <span className='align-middle'>Edit</span>
                                                        </Link>
                                                    <DropdownItem href='/' >
                                                        <Trash className='me-50' size={10} /> <span className='align-middle'>Delete</span>
                                                    </DropdownItem>
                                                </DropdownMenu>
                                            </UncontrolledDropdown>
                                        </td>
                                    </tr>
                                </tbody>
                            </Table>
                        </TabPane>
                        <TabPane tabId='2'>
                            <Table bordered responsive>
                                <thead>
                                    <tr>
                                        <th>NAME</th>
                                        <th>PRICE</th>
                                        <th>SHOW CATALOG</th>
                                        <th>SALES</th>
                                        <th>CREATED</th>
                                        <th>UPDATED</th>
                                        <th>ACTIONS</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            {/* <img className='me-75' src={angular} alt='angular' height='20' width='20' /> */}
                                            <span className='align-middle fw-bold'>FAHAD KHAN</span>
                                        </td>
                                        <td>$ 200</td>
                                        <td>
                                            <div className='form-check form-switch'>
                                                <Input type='switch' className='w-75' name='customSwitch' id='exampleCustomSwitch' />
                                            </div></td>
                                        <td>0</td>
                                        <td>
                                            May 30, 2022
                                        </td>
                                        <td>
                                            Dec 05, 2022
                                        </td>
                                        <td>
                                            <UncontrolledDropdown>
                                                <DropdownToggle className='icon-btn hide-arrow' color='transparent' size='sm' caret>
                                                    <MoreVertical size={15} />
                                                </DropdownToggle>
                                                <DropdownMenu>
                                                        <Link className='dropdown-item' to="/services/edit/1">
                                                            <Edit className='me-50' size={10} /> <span className='align-middle'>Edit</span>
                                                        </Link>
                                                    <DropdownItem href='/' >
                                                        <Trash className='me-50' size={10} /> <span className='align-middle'>Delete</span>
                                                    </DropdownItem>
                                                </DropdownMenu>                                            </UncontrolledDropdown>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            {/* <img className='me-75' src={angular} alt='angular' height='20' width='20' /> */}
                                            <span className='align-middle fw-bold'>Zain</span>
                                        </td>
                                        <td>$ 4800</td>
                                        <td>
                                            <div className='form-check form-switch'>
                                                <Input type='switch' className='w-75' name='customSwitch' id='exampleCustomSwitch' />
                                            </div></td>
                                        <td>5</td>
                                        <td>
                                            Mar 29, 2023
                                        </td>
                                        <td>
                                            Nov 05, 2022
                                        </td>
                                        <td>
                                            <UncontrolledDropdown>
                                                <DropdownToggle className='icon-btn hide-arrow' color='transparent' size='sm' caret>
                                                    <MoreVertical size={15} />
                                                </DropdownToggle>
                                                <DropdownMenu>
                                                        <Link className='dropdown-item' to="/services/edit/2">
                                                            <Edit className='me-50' size={10} /> <span className='align-middle'>Edit</span>
                                                        </Link>
                                                    <DropdownItem href='/' >
                                                        <Trash className='me-50' size={10} /> <span className='align-middle'>Delete</span>
                                                    </DropdownItem>
                                                </DropdownMenu>
                                            </UncontrolledDropdown>
                                        </td>
                                    </tr>
                                </tbody>
                            </Table>
                        </TabPane>
                        <TabPane tabId='3'>
                            <Table bordered responsive>
                                <thead>
                                    <tr>
                                        <th>NAME</th>
                                        <th>PRICE</th>
                                        <th>SHOW CATALOG</th>
                                        <th>SALES</th>
                                        <th>CREATED</th>
                                        <th>UPDATED</th>
                                        <th>ACTIONS</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            {/* <img className='me-75' src={angular} alt='angular' height='20' width='20' /> */}
                                            <span className='align-middle fw-bold'>IRFAN MUMTAZ</span>
                                        </td>
                                        <td>$ 3500</td>
                                        <td>
                                            <div className='form-check form-switch'>
                                                <Input type='switch' className='w-75' name='customSwitch' id='exampleCustomSwitch' />
                                            </div></td>
                                        <td>0</td>
                                        <td>
                                            Feb 29, 2022
                                        </td>
                                        <td>
                                            Sep 15, 2022
                                        </td>
                                        <td>
                                            <UncontrolledDropdown>
                                                <DropdownToggle className='icon-btn hide-arrow' color='transparent' size='sm' caret>
                                                    <MoreVertical size={15} />
                                                </DropdownToggle>
                                                <DropdownMenu>
                                                        <Link className='dropdown-item' to="/services/edit/1">
                                                            <Edit className='me-50' size={10} /> <span className='align-middle'>Edit</span>
                                                        </Link>
                                                    <DropdownItem href='/' >
                                                        <Trash className='me-50' size={10} /> <span className='align-middle'>Delete</span>
                                                    </DropdownItem>
                                                </DropdownMenu>
                                            </UncontrolledDropdown>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            {/* <img className='me-75' src={angular} alt='angular' height='20' width='20' /> */}
                                            <span className='align-middle fw-bold'>FAIZAN</span>
                                        </td>
                                        <td>$ 200</td>
                                        <td>
                                            <div className='form-check form-switch'>
                                                <Input type='switch' className='w-75' name='customSwitch' id='exampleCustomSwitch' />
                                            </div></td>
                                        <td>3</td>
                                        <td>
                                            Mar 29, 2023
                                        </td>
                                        <td>
                                            Nov 05, 2022
                                        </td>
                                        <td>
                                            <UncontrolledDropdown>
                                                <DropdownToggle className='icon-btn hide-arrow' color='transparent' size='sm' caret>
                                                    <MoreVertical size={15} />
                                                </DropdownToggle>
                                                <DropdownMenu>
                                                        <Link className='dropdown-item' to="/services/edit/2">
                                                            <Edit className='me-50' size={10} /> <span className='align-middle'>Edit</span>
                                                        </Link>
                                                    <DropdownItem href='/' >
                                                        <Trash className='me-50' size={10} /> <span className='align-middle'>Delete</span>
                                                    </DropdownItem>
                                                </DropdownMenu>
                                            </UncontrolledDropdown>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            {/* <img className='me-75' src={angular} alt='angular' height='20' width='20' /> */}
                                            <span className='align-middle fw-bold'>Omer</span>
                                        </td>
                                        <td>$ 900</td>
                                        <td>
                                            <div className='form-check form-switch'>
                                                <Input type='switch' className='w-75' name='customSwitch' id='exampleCustomSwitch' />
                                            </div></td>
                                        <td>7</td>
                                        <td>
                                            Jun 28, 2022
                                        </td>
                                        <td>
                                            Sep 15, 2022
                                        </td>
                                        <td>
                                            <UncontrolledDropdown>
                                                <DropdownToggle className='icon-btn hide-arrow' color='transparent' size='sm' caret>
                                                    <MoreVertical size={15} />
                                                </DropdownToggle>
                                                <DropdownMenu>
                                                        <Link className='dropdown-item' to="/services/edit/3">
                                                            <Edit className='me-50' size={10} /> <span className='align-middle'>Edit</span>
                                                        </Link>
                                                    <DropdownItem href='/' >
                                                        <Trash className='me-50' size={10} /> <span className='align-middle'>Delete</span>
                                                    </DropdownItem>
                                                </DropdownMenu>
                                            </UncontrolledDropdown>
                                        </td>
                                    </tr>
                                </tbody>
                            </Table>
                        </TabPane>
                        <TabPane tabId='4'>
                            <Table bordered responsive>
                                <thead>
                                    <tr>
                                        <th>NAME</th>
                                        <th>PRICE</th>
                                        <th>SHOW CATALOG</th>
                                        <th>SALES</th>
                                        <th>CREATED</th>
                                        <th>UPDATED</th>
                                        <th>ACTIONS</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            {/* <img className='me-75' src={angular} alt='angular' height='20' width='20' /> */}
                                            <span className='align-middle fw-bold'>Jack</span>
                                        </td>
                                        <td>$ 300</td>
                                        <td>
                                            <div className='form-check form-switch'>
                                                <Input type='switch' className='w-75' name='customSwitch' id='exampleCustomSwitch' />
                                            </div></td>
                                        <td>4</td>
                                        <td>
                                            Jul 29, 2022
                                        </td>
                                        <td>
                                            Oct 05, 2022
                                        </td>
                                        <td>
                                            <UncontrolledDropdown>
                                                <DropdownToggle className='icon-btn hide-arrow' color='transparent' size='sm' caret>
                                                    <MoreVertical size={15} />
                                                </DropdownToggle>
                                                <DropdownMenu>
                                                        <Link className='dropdown-item' to="/services/edit/1">
                                                            <Edit className='me-50' size={10} /> <span className='align-middle'>Edit</span>
                                                        </Link>
                                                    <DropdownItem href='/' >
                                                        <Trash className='me-50' size={10} /> <span className='align-middle'>Delete</span>
                                                    </DropdownItem>
                                                </DropdownMenu>
                                            </UncontrolledDropdown>
                                        </td>
                                    </tr>
                                </tbody>
                            </Table>
                        </TabPane>
                    </TabContent>
                </CardBody>
            </Card>

        </div>
    )
}

export default Services