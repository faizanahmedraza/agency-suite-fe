import React, { useState } from "react";
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
// import { convertBase64 } from "@utils";
// import PortalSettingDetailAction from "@store/V1/PortalSetting/DETAIL/PortalSettingDetailAction";
// import PortalSettingUpdateAction from "@store/V1/PortalSetting/UPDATE/PortalSettingUpdateAction";
import PortalSetting from "@src/Components/PortalSettingsComponent";
import PortalPayment from "@src/Components/PortalPaymentComponent";


const PortalSettings = () => {
  
    const [active, setActive] = useState("1");

  const toggle = (tab) => {
    if (active !== tab) {
      setActive(tab);
    }
  };

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
                {/* <h2> Hello </h2> */}
                <PortalSetting />
            </TabPane>

            <TabPane tabId="2">
                <PortalPayment/>
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
