import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from '@store/store';
import CustomerListAction from "@store/V1/Customer/LIST/CustomerListAction";
import { Link } from 'react-router-dom';
import {
    Table,
    Card,
    CardBody,
    TabContent,
    TabPane,
    Nav,
    NavItem,
    NavLink,
    Button,
} from 'reactstrap'
import CustomerList from './CustomerList';

const Loader = () => {
    return (
        <tr><td colSpan={5} className="text-center"><strong>Loading...</strong></td></tr>
    );
}

const Customers = () => {

    const [active, setActive] = useState('1');

    const dispatch = useDispatch();
    const state = useSelector((state => state.customers.list));
    const loading = state.loading;
    const customers = state.customers;

    function activeCustomers (){
        const activeCustomers = customers.filter((customer) => {
            return customer.status === "active";
        });

        return <CustomerList data={activeCustomers}/>
    }

    function pendingCustomers(){
        const pendingCustomers = customers.filter((customer) => {
            return customer.status === "pending";
        });

        return <CustomerList data={pendingCustomers}/>
    }

    useEffect(() => {
        dispatch(CustomerListAction.customerList());
    }, []);

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
                                        <th>LAST LOGGED IN</th>
                                        <th>ACTIONS</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        loading ? <Loader/> : <CustomerList data={customers}/>
                                    }
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
                                        <th>LAST LOGGED IN</th>
                                        <th>ACTIONS</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {  loading ? <Loader/> : customers && activeCustomers(customers)}
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
                                        <th>LAST LOGGED IN</th>
                                        <th>ACTIONS</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {  loading ? <Loader/> : customers && pendingCustomers(customers)}
                                </tbody>
                            </Table>
                        </TabPane>
                    </TabContent>
                </CardBody>
            </Card>
        </div >
    )
}

export default Customers;