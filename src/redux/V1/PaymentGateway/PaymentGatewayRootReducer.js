import { combineReducers } from "redux";
import PaymentGatewayListReducer from "@store/V1/PaymentGateway/Detail/PaymentGatewayDetailReducer";
import PaymentGatewayCreateReducer from "@store/V1/PaymentGateway/Create/PaymentGatewayCreateReducer";

const PaymentGatewayRootReducer = combineReducers({
  list: PaymentGatewayListReducer,
  create : PaymentGatewayCreateReducer
});

export default PaymentGatewayRootReducer;
