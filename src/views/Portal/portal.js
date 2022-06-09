import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  CardBody
} from "reactstrap";
import PortalSetting from "@src/Components/PortalSettingsComponent";
import PortalPayment from "@src/Components/PortalPaymentComponent";
import PaymentGatewayDetailAction from "@store/V1/PaymentGateway/Detail/PaymentGatewayDetailAction"
import { useDispatch } from "@store/store"
import { useSearchParams } from "react-router-dom"

const PortalSettings = () => {

  const [searchParam, setSearchParam] = useSearchParams()
  const [active, setActive] = useState("1");
  const dispatch = useDispatch()
  const tab = searchParam.get('tab')

  const toggle = (tab) => {
    if (active !== tab) {
      setSearchParam({ tab })
      setActive(tab);
    }
  };

  useEffect(() => {
    dispatch(PaymentGatewayDetailAction.paymentGatewayList("stripe"))
    if (tab) setActive(tab)
  }, [])

  return (
    <>
      <div>
        <Card>
          <CardHeader>
            <h1>Settings</h1>
          </CardHeader>
        </Card>
        <Card>
          <React.Fragment>
            <CardHeader>
              <Nav tabs justified>
                <NavItem>
                  <NavLink
                    active={active === "1"}
                    onClick={() => {
                      toggle("1");
                    }}
                  >
                    Portal Settings
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    active={active === "2"}
                    onClick={() => {
                      toggle("2");
                    }}
                  >
                    Payment
                  </NavLink>
                </NavItem>
              </Nav>
            </CardHeader>
            <CardBody>
              <TabContent className="py-50" activeTab={active}>
                <TabPane tabId="1">
                  <PortalSetting />
                </TabPane>
                <TabPane tabId="2">
                  <PortalPayment />
                </TabPane>
              </TabContent>
            </CardBody>
          </React.Fragment>
        </Card>
      </div>
    </>
  )
};

export default PortalSettings;
