import { combineReducers } from "redux";
import PaymentGatewayListReducer from "@store/V1/PaymentGateway/GET/PaymentGatewayListReducer";

const PaymentGatewayRootReducer = combineReducers({
  list: PaymentGatewayListReducer,
});

export default PaymentGatewayRootReducer;
