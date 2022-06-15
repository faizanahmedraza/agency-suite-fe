import React, { useState, useEffect } from 'react'
// import AvatarGroup from '@components/avatar-group'
import {
    Card,
    CardBody,
    TabContent,
    TabPane,
    Nav,
    NavItem,
    NavLink,
} from 'reactstrap'
import { useDispatch, useSelector } from "@store/store"
import { useSearchParams } from 'react-router-dom'
import ServiceActions from '@store/V1/CustomerPortal/Service/List/ServiceListAction'
import ServiceTable from './ServiceTable'
import GeneralHelper from "@src/Helpers/GeneralHelper";
import Loader from '@src/views/GrowLoader';

const Services = () => {

    const [active, setActive] = useState('1')
    const [searchParam, setSearchParam] = useSearchParams()

    const index = searchParam.get("index")
    const tabindex = searchParam.get("tabindex")

    const dispatch = useDispatch()
    const {
        list: {
            loading,
            services,
            pagination
        },
    } = useSelector(state => state.customer_services)

    const one_off_services = services.filter(service => service.subscription_type === "one-off")
    const subscription = services.filter(service => service.subscription_type === "recurring")

    const toggle = tab => {
        if (active !== tab) {
            if (tab == 1) {
                setSearchParam({ tabindex: tab })
                dispatch(ServiceActions.serviceList());
            } else if (tab == 2) {
                setSearchParam({ tabindex: tab })
                dispatch(ServiceActions.serviceList(GeneralHelper.Serialize({
                    service_type: "one-off"
                })));
            } else if (tab == 3) {
                setSearchParam({ tabindex: tab })
                dispatch(ServiceActions.serviceList(GeneralHelper.Serialize({
                    service_type: "recurring"
                })));
            }
            setActive(tab)
        }
    }

    const queryParametersByTab = (tabId) => {

        let object = {
            page: index
        }

        if (tabId == 1) {
            return object
        }
        if (tabId == 2) {
            object.catalog_status = "active"
        }
        if (tabId == 3) {
            object.service_type = "one-off"
        }
        return object
    }

    useEffect(() => {
        dispatch(ServiceActions.serviceList(index ? GeneralHelper.Serialize(queryParametersByTab(tabindex)) : ""))
        if (tabindex) {
            setActive(tabindex)
        }
    }, [])

    return (
        <div>
            <Card>
                <CardBody>
                    <div className='row'>
                        <div className='col-md-9'>
                            <h1>Services</h1>
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
                                One-off
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                active={active === '3'}
                                onClick={() => {
                                    toggle('3')
                                }}
                            >
                                Recurring
                            </NavLink>
                        </NavItem>
                    </Nav>
                    <TabContent className='py-50' activeTab={active}>
                        {
                            loading ?
                                <Loader />
                                : (
                                    <>
                                        <TabPane tabId='1'>
                                            <ServiceTable services={services} pagination={pagination} tabIndex={active} />
                                        </TabPane>
                                        <TabPane tabId='2'>
                                            <ServiceTable services={one_off_services} pagination={pagination} tabIndex={active} />
                                        </TabPane>
                                        <TabPane tabId='3'>
                                            <ServiceTable services={subscription} pagination={pagination} tabIndex={active} />
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