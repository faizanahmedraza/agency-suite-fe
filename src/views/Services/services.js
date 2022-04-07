import React, { useState, useEffect } from 'react'
// import AvatarGroup from '@components/avatar-group'
import { Link } from 'react-router-dom'
import {
    Table,
    Card,
    CardBody,
    TabContent,
    TabPane,
    UncontrolledDropdown,
    DropdownMenu,
    DropdownItem,
    DropdownToggle,
    Nav,
    NavItem,
    NavLink,
    Button,
} from 'reactstrap'
import { MoreVertical, Edit, Trash } from 'react-feather'
import { useDispatch, useSelector } from "@store/store"
import ServiceActions from '@store/V1/Service/List/ServiceListAction'
import { formatDate } from '@utils'

const Services = () => {

    const [active, setActive] = useState('1')
    const dispatch = useDispatch()
    const { loading, services } = useSelector(state => state.service.list)

    const toggle = tab => {
        if (active !== tab) {
            setActive(tab)
        }
    }

    useEffect(() => {
        if (!services.length) return dispatch(ServiceActions.serviceList())
    }, [])


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
                                Catalog
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
                        {!loading ?
                            <>
                                <TabPane tabId='1'>
                                    <Table bordered responsive>
                                        <thead>
                                            <tr>
                                                <th>NAME</th>
                                                <th>PRICE</th>
                                                <th>Subscription Type</th>
                                                <th>CREATED</th>
                                                <th>UPDATED</th>
                                                <th>ACTIONS</th>
                                            </tr>
                                        </thead>


                                        <tbody>
                                            {services && services.map((service) => {
                                                return (
                                                    <tr key={service.id}>
                                                        <td>
                                                            {/* <img className='me-75' src={angular} alt='angular' height='20' width='20' /> */}
                                                            <span className='align-middle fw-bold'>{service.name}</span>
                                                        </td>
                                                        <td>$ {service.price_types.price}</td>
                                                        <td>{service.subscription_type}</td>
                                                        <td>
                                                            {formatDate(service.created_at)}
                                                        </td>
                                                        <td>
                                                            {formatDate(service.updated_at)}
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
                                                )
                                            })}
                                        </tbody>
                                    </Table>
                                </TabPane>
                                <TabPane tabId='2'>
                                    <Table bordered responsive>
                                        <thead>
                                            <tr>
                                                <th>NAME</th>
                                                <th>PRICE</th>
                                                <th>Subscription Type</th>
                                                <th>CREATED</th>
                                                <th>UPDATED</th>
                                                <th>ACTIONS</th>
                                            </tr>
                                        </thead>


                                        <tbody>
                                            {services && services.map((service) => {
                                                if (service.catalog_status !== "active") return
                                                return (
                                                    <tr key={service.id}>
                                                        <td>
                                                            {/* <img className='me-75' src={angular} alt='angular' height='20' width='20' /> */}
                                                            <span className='align-middle fw-bold'>{service.name}</span>
                                                        </td>
                                                        <td>$ {service.price_types.price}</td>
                                                        <td>{service.subscription_type}</td>
                                                        <td>
                                                            {formatDate(service.created_at)}
                                                        </td>
                                                        <td>
                                                            {formatDate(service.updated_at)}
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
                                                )
                                            })}
                                        </tbody>
                                    </Table>
                                </TabPane>
                                <TabPane tabId='3'>
                                    <Table bordered responsive>
                                    <thead>
                                            <tr>
                                                <th>NAME</th>
                                                <th>PRICE</th>
                                                <th>Subscription Type</th>
                                                <th>CREATED</th>
                                                <th>UPDATED</th>
                                                <th>ACTIONS</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {services && services.map((service) => {
                                                if (service.subscription_type !== "one-off") return
                                                return (
                                                    <tr key={service.id}>
                                                        <td>
                                                            {/* <img className='me-75' src={angular} alt='angular' height='20' width='20' /> */}
                                                            <span className='align-middle fw-bold'>{service.name}</span>
                                                        </td>
                                                        <td>$ {service.price_types.price}</td>
                                                        <td>{service.subscription_type}</td>
                                                        <td>
                                                            {formatDate(service.created_at)}
                                                        </td>
                                                        <td>
                                                            {formatDate(service.updated_at)}
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
                                                )
                                            })}
                                        </tbody>
                                    </Table>
                                </TabPane>
                                <TabPane tabId='4'>
                                    <Table bordered responsive>
                                    <thead>
                                            <tr>
                                                <th>NAME</th>
                                                <th>PRICE</th>
                                                <th>Subscription Type</th>
                                                <th>CREATED</th>
                                                <th>UPDATED</th>
                                                <th>ACTIONS</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {services && services.map((service) => {
                                                if (service.subscription_type !== "recurring") return
                                                return (
                                                    <tr key={service.id}>
                                                        <td>
                                                            {/* <img className='me-75' src={angular} alt='angular' height='20' width='20' /> */}
                                                            <span className='align-middle fw-bold'>{service.name}</span>
                                                        </td>
                                                        <td>$ {service.price_types.price}</td>
                                                        <td>{service.subscription_type}</td>
                                                        <td>
                                                            {formatDate(service.created_at)}
                                                        </td>
                                                        <td>
                                                            {formatDate(service.updated_at)}
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
                                                )
                                            })}
                                        </tbody>
                                    </Table>
                                </TabPane>
                            </>
                            : (
                                <div className='text-center '>
                                    <strong>Loading....</strong>

                                </div>
                            )
                        }
                    </TabContent>
                </CardBody>
            </Card>

        </div>
    )
}

export default Services