import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "@store/store";
import CustomerListAction from "@store/V1/Customer/LIST/CustomerListAction";
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
import CustomerList from "./CustomerList";
import GeneralHelper from "@src/Helpers/GeneralHelper";

const Loader = () => {
  return (
    <div className="text-center">
      <strong>Loading...</strong>
    </div>
  );
};

const Customers = () => {
  const [active, setActive] = useState("1");
  const [searchParam, setSearchParam] = useSearchParams()

  const index = searchParam.get("index")
  const tabindex = searchParam.get("tabindex")

  const dispatch = useDispatch();
  const {
    list: {
      loading,
      customers,
      pagination
    },
    customer_status: {
      isChanged,
    },
    delete: {
      isDeleted
    }
  } = useSelector(state => state.customers)

  function activeCustomers() {
    const activeCustomers = customers.filter((customer) => {
      return customer.status === "active";
    });

    return <CustomerList data={activeCustomers} pagination={pagination} tabIndex={active} />;
  }
  function pendingCustomers() {
    const pendingCustomers = customers.filter((customer) => {
      return customer.status === "pending";
    });

    return <CustomerList data={pendingCustomers} pagination={pagination} tabIndex={active} />;
  }

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
    if (tabId == 3) {
      object.status = "pending"
    }

    return object

  }

  useEffect(() => {
    dispatch(CustomerListAction.customerList(index ? GeneralHelper.Serialize(queryParametersByTab(tabindex)) : ""));
    if (tabindex) {
      setActive(tabindex)
    }
  }, [isChanged, isDeleted])

  const toggle = (tab) => {
    if (active !== tab) {
      if (tab == 1) {
        setSearchParam({ tabindex: tab })
        dispatch(CustomerListAction.customerList());
      } else if (tab == 2) {
        setSearchParam({ tabindex: tab })
        dispatch(CustomerListAction.customerList(GeneralHelper.Serialize({
          status: "active"
        })));
      } else if (tab == 3) {
        setSearchParam({ tabindex: tab })
        dispatch(CustomerListAction.customerList(GeneralHelper.Serialize({
          status: "pending"
        })));
      }
      setActive(tab);
    }
  };

  return (
    <div>
      <Card>
        <CardBody>
          <div className="row">
            <div className="col-md-9">
              <h1>Customers</h1>
            </div>
            <div className="col-md-3">
              <Link to="/customers/create">
                <Button.Ripple className="w-100" color="primary">
                  Create Customer
                </Button.Ripple>
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
                active={active === "1"}
                onClick={() => {
                  toggle("1");
                }}
              >
                All
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                active={active === "2"}
                onClick={() => {
                  toggle("2");
                }}
              >
                Active
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                active={active === "3"}
                onClick={() => {
                  toggle("3");
                }}
              >
                Pending
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent className="py-50" activeTab={active}>
            {loading ? (
              <Loader />
            ) : (
              <>
                <TabPane tabId="1">
                  <CustomerList data={customers} pagination={pagination} tabIndex={active} />
                </TabPane>
                <TabPane tabId="2">
                  {customers && activeCustomers(customers)}
                </TabPane>
                <TabPane tabId="3">
                  {customers && pendingCustomers(customers)}
                </TabPane>
              </>
            )}
          </TabContent>
        </CardBody>
      </Card>
    </div>
  );
};

export default Customers;
