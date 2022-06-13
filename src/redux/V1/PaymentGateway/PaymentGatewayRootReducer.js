import { combineReducers } from "redux";
import PaymentGatewayListReducer from "@store/V1/PaymentGateway/Detail/PaymentGatewayDetailReducer";
import PaymentGatewayCreateReducer from "@store/V1/PaymentGateway/Create/PaymentGatewayCreateReducer";
import PaymentGatewayStatusReducer from "@store/V1/PaymentGateway/Status/PaymentGatewayStatusReducer";

const PaymentGatewayRootReducer = combineReducers({
  list: PaymentGatewayListReducer,
  create : PaymentGatewayCreateReducer,
  status: PaymentGatewayStatusReducer
});

export default PaymentGatewayRootReducer;
