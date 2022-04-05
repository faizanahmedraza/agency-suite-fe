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
    DropdownToggle,
    Nav,
    NavItem,
    NavLink,
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from 'reactstrap'
import react from '@src/assets/images/icons/react.svg'
import { MoreVertical, Edit, Trash } from 'react-feather'
// import angular from '@src/assets/images/icons/angular.svg'
import avatar1 from '@src/assets/images/portrait/small/avatar-s-5.jpg'
import avatar2 from '@src/assets/images/portrait/small/avatar-s-6.jpg'
import avatar3 from '@src/assets/images/portrait/small/avatar-s-7.jpg'

const Customers = () => {

    const [active, setActive] = useState('1');
    const [formModal, setFormModal] = useState(false);

    // const avatarGroupData1 = [
    //     {
    //         title: 'Leslie',
    //         img: avatar1,
    //         imgHeight: 26,
    //         imgWidth: 26
    //     },
    //     {
    //         title: 'Quinn',
    //         img: avatar2,
    //         imgHeight: 26,
    //         imgWidth: 26
    //     },
    //     {
    //         title: 'Quinn',
    //         img: avatar3,
    //         imgHeight: 26,
    //         imgWidth: 26
    //     }
    // ]

    // const avatarGroupData2 = [
    //     {
    //         title: 'Felicia',
    //         img: avatar1,
    //         imgHeight: 26,
    //         imgWidth: 26
    //     },
    //     {
    //         title: 'Brent',
    //         img: avatar2,
    //         imgHeight: 26,
    //         imgWidth: 26
    //     },
    //     {
    //         title: 'Patricia',
    //         img: avatar3,
    //         imgHeight: 26,
    //         imgWidth: 26
    //     }
    // ]


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
                            <h1>Customers</h1>
                        </div>
                        <div className='col-md-3'>
                            <Link to="/customers/create">
                                <Button.Ripple className="w-100" color='primary'>Create Customers</Button.Ripple>
                            </Link>
                        </div>
                    </div>
                </CardBody >
            </Card >
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
                                Pending
                            </NavLink>
                        </NavItem>
                    </Nav>
                    <TabContent className='py-50' activeTab={active}>
                        <TabPane tabId='1'>
                            <Table bordered responsive>
                                <thead>
                                    <tr>
                                        <th>NAME</th>
                                        <th>EMAIL</th>
                                        <th>STATUS</th>
                                        <th>CREATED</th>
                                        <th>ACTIONS</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            <span className='align-middle fw-bold'>FAIZAN AHMED RAZA</span>
                                        </td>
                                        <td>faizan@saasfa.com</td>
                                        <td>
                                            <Badge pill color='light-primary' className='me-1'>
                                                Active
                                            </Badge>
                                        </td>
                                        <td>11 Minutes ago</td>
                                        <td>
                                            <UncontrolledDropdown>
                                                <DropdownToggle className='icon-btn hide-arrow' color='transparent' size='sm' caret>
                                                    <MoreVertical size={15} />
                                                </DropdownToggle>
                                                <DropdownMenu>
                                                    <Link className='dropdown-item' to='/customers/edit/1'>
                                                        <Edit className='me-50' size={15} /> <span className='align-middle'>Edit</span>
                                                    </Link>
                                                    <div className='dropdown-item' onClick={() => setFormModal(!formModal)}>
                                                        <Trash className='me-50' size={15} /> <span className='align-middle'>Delete</span>
                                                    </div>
                                                </DropdownMenu>
                                            </UncontrolledDropdown>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <span className='align-middle fw-bold'>HARIS GHORI</span>
                                        </td>
                                        <td>faizan@saasfa.com</td>
                                        <td>
                                            <Badge pill color='light-primary' className='me-1'>
                                                Active
                                            </Badge>
                                        </td>
                                        <td>11 Minutes ago</td>
                                        <td>
                                            <UncontrolledDropdown>
                                                <DropdownToggle className='icon-btn hide-arrow' color='transparent' size='sm' caret>
                                                    <MoreVertical size={15} />
                                                </DropdownToggle>
                                                <DropdownMenu>
                                                    <Link className='dropdown-item' to='/customers/edit/1'>
                                                        <Edit className='me-50' size={15} /> <span className='align-middle'>Edit</span>
                                                    </Link>
                                                    <div className='dropdown-item' onClick={() => setFormModal(!formModal)}>
                                                        <Trash className='me-50' size={15} /> <span className='align-middle'>Delete</span>
                                                    </div>
                                                </DropdownMenu>
                                            </UncontrolledDropdown>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <span className='align-middle fw-bold'>Mehmood</span>
                                        </td>
                                        <td>mehmood@saasfa.com</td>
                                        <td>
                                            <Badge pill color='light-primary' className='me-1'>
                                                Pending
                                            </Badge>
                                        </td>
                                        <td>11 Minutes ago</td>
                                        <td>
                                            <UncontrolledDropdown>
                                                <DropdownToggle className='icon-btn hide-arrow' color='transparent' size='sm' caret>
                                                    <MoreVertical size={15} />
                                                </DropdownToggle>
                                                <DropdownMenu>
                                                    <Link className='dropdown-item' to='/customers/edit/1'>
                                                        <Edit className='me-50' size={15} /> <span className='align-middle'>Edit</span>
                                                    </Link>
                                                    <div className='dropdown-item' onClick={() => setFormModal(!formModal)}>
                                                        <Trash className='me-50' size={15} /> <span className='align-middle'>Delete</span>
                                                    </div>
                                                </DropdownMenu>
                                            </UncontrolledDropdown>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <span className='align-middle fw-bold'>Fahad</span>
                                        </td>
                                        <td>fahad@saasfa.com</td>
                                        <td>
                                            <Badge pill color='light-primary' className='me-1'>
                                                Pending
                                            </Badge>
                                        </td>
                                        <td>11 Minutes ago</td>
                                        <td>
                                            <UncontrolledDropdown>
                                                <DropdownToggle className='icon-btn hide-arrow' color='transparent' size='sm' caret>
                                                    <MoreVertical size={15} />
                                                </DropdownToggle>
                                                <DropdownMenu>
                                                    <Link className='dropdown-item' to='/customers/edit/1'>
                                                        <Edit className='me-50' size={15} /> <span className='align-middle'>Edit</span>
                                                    </Link>
                                                    <div className='dropdown-item' onClick={() => setFormModal(!formModal)}>
                                                        <Trash className='me-50' size={15} /> <span className='align-middle'>Delete</span>
                                                    </div>
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
                                        <th>EMAIL</th>
                                        <th>STATUS</th>
                                        <th>CREATED</th>
                                        <th>ACTIONS</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            <img className='me-75' src={react} alt='angular' height='20' width='20' />
                                            <span className='align-middle fw-bold'>FAIZAN AHMED RAZA</span>
                                        </td>
                                        <td>faizan@saasfa.com</td>
                                        <td>
                                            <Badge pill color='light-primary' className='me-1'>
                                                Active
                                            </Badge>
                                        </td>
                                        <td>11 Minutes ago</td>
                                        <td>
                                            <UncontrolledDropdown>
                                                <DropdownToggle className='icon-btn hide-arrow' color='transparent' size='sm' caret>
                                                    <MoreVertical size={15} />
                                                </DropdownToggle>
                                                <DropdownMenu>
                                                    <Link className='dropdown-item' to='/customers/edit/1'>
                                                        <Edit className='me-50' size={15} /> <span className='align-middle'>Edit</span>
                                                    </Link>
                                                    <div className='dropdown-item' onClick={() => setFormModal(!formModal)}>
                                                        <Trash className='me-50' size={15} /> <span className='align-middle'>Delete</span>
                                                    </div>
                                                </DropdownMenu>
                                            </UncontrolledDropdown>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <span className='align-middle fw-bold'>HARIS GHORI</span>
                                        </td>
                                        <td>faizan@saasfa.com</td>
                                        <td>
                                            <Badge pill color='light-primary' className='me-1'>
                                                Active
                                            </Badge>
                                        </td>
                                        <td>11 Minutes ago</td>
                                        <td>
                                            <UncontrolledDropdown>
                                                <DropdownToggle className='icon-btn hide-arrow' color='transparent' size='sm' caret>
                                                    <MoreVertical size={15} />
                                                </DropdownToggle>
                                                <DropdownMenu>
                                                    <Link className='dropdown-item' to='/customers/edit/1'>
                                                        <Edit className='me-50' size={15} /> <span className='align-middle'>Edit</span>
                                                    </Link>
                                                    <div className='dropdown-item' onClick={() => setFormModal(!formModal)}>
                                                        <Trash className='me-50' size={15} /> <span className='align-middle'>Delete</span>
                                                    </div>
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
                                        <th>EMAIL</th>
                                        <th>STATUS</th>
                                        <th>CREATED</th>
                                        <th>ACTIONS</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            <span className='align-middle fw-bold'>Mehmood</span>
                                        </td>
                                        <td>mehmood@saasfa.com</td>
                                        <td>
                                            <Badge pill color='light-primary' className='me-1'>
                                                Pending
                                            </Badge>
                                        </td>
                                        <td>11 Minutes ago</td>
                                        <td>
                                            <UncontrolledDropdown>
                                                <DropdownToggle className='icon-btn hide-arrow' color='transparent' size='sm' caret>
                                                    <MoreVertical size={15} />
                                                </DropdownToggle>
                                                <DropdownMenu>
                                                    <Link className='dropdown-item' to='/customers/edit/1'>
                                                        <Edit className='me-50' size={15} /> <span className='align-middle'>Edit</span>
                                                    </Link>
                                                    <div className='dropdown-item' onClick={() => setFormModal(!formModal)}>
                                                        <Trash className='me-50' size={15} /> <span className='align-middle'>Delete</span>
                                                    </div>
                                                </DropdownMenu>
                                            </UncontrolledDropdown>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <span className='align-middle fw-bold'>Fahad</span>
                                        </td>
                                        <td>fahad@saasfa.com</td>
                                        <td>
                                            <Badge pill color='light-primary' className='me-1'>
                                                Pending
                                            </Badge>
                                        </td>
                                        <td>11 Minutes ago</td>
                                        <td>
                                            <UncontrolledDropdown>
                                                <DropdownToggle className='icon-btn hide-arrow' color='transparent' size='sm' caret>
                                                    <MoreVertical size={15} />
                                                </DropdownToggle>
                                                <DropdownMenu>
                                                    <Link className='dropdown-item' to='/customers/edit/1'>
                                                        <Edit className='me-50' size={15} /> <span className='align-middle'>Edit</span>
                                                    </Link>
                                                    <div className='dropdown-item' onClick={() => setFormModal(!formModal)}>
                                                        <Trash className='me-50' size={15} /> <span className='align-middle'>Delete</span>
                                                    </div>
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
            <Modal isOpen={formModal} toggle={() => setFormModal(!formModal)} className='modal-dialog-centered'>
                <ModalHeader toggle={() => setFormModal(!formModal)}></ModalHeader>
                <ModalBody>
                    <h3 className='text-center mb-2'>Are you sure you want to delete?</h3>
                    <div className='d-flex justify-content-around'>
                        <Button.Ripple color="secondary" onClick={() => setFormModal(!formModal)}>
                            Cancel
                        </Button.Ripple>
                        <Button.Ripple color='danger'>
                            <Link className='text-white' to='/customers/delete/1'>
                                Delete
                            </Link>
                        </Button.Ripple>
                    </div>
                </ModalBody>
            </Modal>
        </div >
    )
}

export default Customers;