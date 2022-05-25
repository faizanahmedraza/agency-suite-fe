import React, { useState, useEffect } from 'react'
// import AvatarGroup from '@components/avatar-group'
import { Link } from 'react-router-dom'
import {
    Card,
    CardBody,
    TabContent,
    TabPane,
    Nav,
    NavItem,
    NavLink,
    Button,
} from 'reactstrap'
import { useDispatch, useSelector } from "@store/store"
import ServiceActions from '@store/V1/Service/List/ServiceListAction'
import ServiceTable from './ServiceTable'
import GeneralHelper from "@src/Helpers/GeneralHelper";

const Services = () => {

    const [active, setActive] = useState('1')

    const dispatch = useDispatch()
    const {
        list: {
            loading,
            services,
            pagination
        },
        delete: {
            isDeleted
        },
        catalog: {
            isChanged
        },
        service_status: {
            isChanged: isChangedService
        }
    } = useSelector(state => state.service)

    const catalog_service = services.filter(service => service.catalog_status === "active")
    const one_off_services = services.filter(service => service.subscription_type === "one-off")
    const subscription = services.filter(service => service.subscription_type === "recurring")

    const toggle = tab => {
        if (active !== tab) {
            if (tab == 1) {
                dispatch(ServiceActions.serviceList());
            } else if (tab == 2) {
                dispatch(ServiceActions.serviceList(GeneralHelper.Serialize({
                    catalog_status: "active"
                })));
            } else if (tab == 3) {
                dispatch(ServiceActions.serviceList(GeneralHelper.Serialize({
                    service_type: "one-off"
                })));
            } else if (tab == 4) {
                dispatch(ServiceActions.serviceList(GeneralHelper.Serialize({
                    service_type: "recurring"
                })));
            }
            setActive(tab)
        }
    }

    useEffect(() => {
        if (!services.length || isDeleted || isChanged || isChangedService) return dispatch(ServiceActions.serviceList())
    }, [isDeleted, isChanged, isChangedService])

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
                                <Button.Ripple color='primary' className="w-100">Create Service</Button.Ripple>
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
                        {
                            loading ?
                                <div className='text-center'>
                                    <strong>Loading....</strong>
                                </div>
                                : (
                                    <>
                                        <TabPane tabId='1'>
                                            <ServiceTable services={services} pagination={pagination}  tabIndex={active}/>
                                        </TabPane>
                                        <TabPane tabId='2'>
                                            <ServiceTable services={catalog_service} pagination={pagination}  tabIndex={active}/>
                                        </TabPane>
                                        <TabPane tabId='3'>
                                            <ServiceTable services={one_off_services} pagination={pagination}  tabIndex={active}/>
                                        </TabPane>
                                        <TabPane tabId='4'>
                                            <ServiceTable services={subscription} pagination={pagination}  tabIndex={active}/>
                                        </TabPane>
                                    </>
                                )
                        }
                    </TabContent>
                </CardBody>
            </Card>
        </div>
    )
}

export default Services