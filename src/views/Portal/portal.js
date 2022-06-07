import React, { useState  , useEffect} from "react";
import {
    Card,
    CardHeader,
    TabContent,
    TabPane,
    Nav, 
    NavItem, 
    NavLink
} from "reactstrap";
// import { convertBase64 } from "@utils";
// import PortalSettingDetailAction from "@store/V1/PortalSetting/DETAIL/PortalSettingDetailAction";
// import PortalSettingUpdateAction from "@store/V1/PortalSetting/UPDATE/PortalSettingUpdateAction";
import PortalSetting from "@src/Components/PortalSettingsComponent";
import PortalPayment from "@src/Components/PortalPaymentComponent";
import PaymentGatewayListAction from "@store/V1/PaymentGateway/GET/PaymentGatewayListAction"
import {useDispatch} from "@store/store"

const PortalSettings = () => {
  
    const [active, setActive] = useState("1");
    const dispatch = useDispatch()

  const toggle = (tab) => {
    if (active !== tab) {
      setActive(tab);
    }
  };

  useEffect(()=>{
    dispatch(PaymentGatewayListAction.paymentGatewayList())
  },[])

    return (
        <>
        <div>
            <Card>
                <CardHeader>
                    <h1>Settings</h1>
                </CardHeader>
            </Card>
            <React.Fragment>
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
          <TabContent className="py-50" activeTab={active}>
            <TabPane tabId="1">
                {/* <h2> Hello </h2> */}
                <PortalSetting />
            </TabPane>

            <TabPane tabId="2">
                <PortalPayment/>
            </TabPane>
          </TabContent>
            </React.Fragment>
        </div>   
        </>
    )
};

export default PortalSettings;
