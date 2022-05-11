import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "@store/store";
import ServiceRequestListAction from "@store/V1/CustomerPortal/ServiceRequest/LIST/ServiceRequestListAction";
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
import ServiceRequestList from "./ServiceRequestList";

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
      service_requests,
      pagination
    },
    change_status: {
      isChanged
    }
  } = useSelector(state => state.service_requests);

  function activeRequests() {
    const activeRequests = service_requests.filter((service) => {
      return service.status == "active";
    });

    return <ServiceRequestList data={activeRequests} pagination={pagination} />;
  }

  useEffect(() => {
    if (!service_requests.length || isChanged) return dispatch(ServiceRequestListAction.serviceRequestList());
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
                Active
                    </NavLink>
            </NavItem>
          </Nav>
          <TabContent className='py-50' activeTab={active}>
          {loading ? (
              <Loader />
            ) : (
                <>
                  <TabPane tabId="1">
                  <ServiceRequestList data={service_requests} pagination={pagination} />
                  </TabPane>
                  <TabPane tabId="2">
                    {service_requests && activeRequests(service_requests)}
                  </TabPane>
                </>
              )}
          </TabContent>
        </CardBody>
      </Card>
    </div>
  );
};

export default ServiceRequests;
