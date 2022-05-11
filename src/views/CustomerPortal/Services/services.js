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
import ServiceActions from '@store/V1/CustomerPortal/Service/List/ServiceListAction'
import ServicesGrid from './ServicesGrid'

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
                    {
                        loading ?
                            <div className='text-center'>
                                <strong>Loading....</strong>
                            </div>
                            : (
                                <ServicesGrid services={subscription} pagination={pagination} />
                            )
                    }
                </CardBody>
            </Card>
        </div>
    )
}

export default Services