import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "@store/store";
import CustomerListAction from "@store/V1/Customer/LIST/CustomerListAction";
import { Link } from "react-router-dom";
import {
  Card,
  CardBody,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Button,
} from "reactstrap";

const Loader = () => {
  return (
    <div className="text-center">
      <strong>Loading...</strong>
    </div>
  );
};

const ServiceRequests = () => {
  const [active, setActive] = useState("1");

  const dispatch = useDispatch();
  const {
    list: {
      loading,
      customers,
      pagination
    },
    customer_status: {
      isChanged
    }
  } = useSelector(state => state.customers)

  const state = useSelector(state => state.customers)

  function activeCustomers() {
    const activeCustomers = customers.filter((customer) => {
      return customer.status === "active";
    });

    return <CustomerList data={activeCustomers} pagination={pagination} />;
  }

  function pendingCustomers() {
    const pendingCustomers = customers.filter((customer) => {
      return customer.status === "pending";
    });

    return <CustomerList data={pendingCustomers} pagination={pagination} />;
  }

  useEffect(() => {
    if (!customers.length || isChanged) return dispatch(CustomerListAction.customerList());
  }, [isChanged])

  const toggle = (tab) => {
    if (active !== tab) {
      setActive(tab);
    }
  };

  return (
    <div>
    <Card>
        <CardBody>
            <div className='row'>
                <div className='col-md-9'>
                    <h1>Requests</h1>
                </div>
                <div className='col-md-3'>
                    <Link to="/service-requests/create">
                        <Button.Ripple color='primary' className="w-100">Create Request</Button.Ripple>
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
                        Pending
                    </NavLink>
                </NavItem>
            </Nav>
            <TabContent className='py-50' activeTab={active}>
              
            </TabContent>
        </CardBody>
    </Card>
</div>
  );
};

export default ServiceRequests;
