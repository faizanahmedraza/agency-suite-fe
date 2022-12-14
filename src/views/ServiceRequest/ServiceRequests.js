import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "@store/store";
import ServiceRequestListAction from "@store/V1/ServiceRequest/LIST/ServiceRequestListAction";
import { Link, useSearchParams } from "react-router-dom";
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
import GeneralHelper from "@src/Helpers/GeneralHelper";

const Loader = () => {
  return (
    <div className="text-center">
      <strong>Loading...</strong>
    </div>
  );
};

const ServiceRequests = () => {
  const [active, setActive] = useState("1");
  const [searchParam, setSearchParam] = useSearchParams()

  const index = searchParam.get("index")
  const tabindex = searchParam.get("tabindex")

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

  const queryParametersByTab = (tabId) => {
    let object = {
        page: index
    }

    if (tabId == 1) {
        return object
    }
    if (tabId == 2) {
        object.status = "active"
    }
    return object
}

  const activeRequests = service_requests.filter(request => request.status === "active");

  useEffect(() => {
    dispatch(ServiceRequestListAction.serviceRequestList(index ? GeneralHelper.Serialize(queryParametersByTab(tabindex)) : ""));
    if (tabindex) {
      setActive(tabindex)
    }
  }, [isChanged])

  const toggle = (tab) => {
    if (active !== tab) {
      if (tab == 1) {
        setSearchParam({ tabindex: tab })
        dispatch(ServiceRequestListAction.serviceRequestList());

      } else if (tab == 2) {
        setSearchParam({ tabindex: tab })
        dispatch(ServiceRequestListAction.serviceRequestList(GeneralHelper.Serialize({
          status: "active"
        })));
      }
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
                  <ServiceRequestList service_requests={service_requests} pagination={pagination} tabIndex={active} />
                </TabPane>
                <TabPane tabId="2">
                  <ServiceRequestList service_requests={activeRequests} pagination={pagination} tabIndex={active} />
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
