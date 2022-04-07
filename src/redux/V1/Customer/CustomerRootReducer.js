import { combineReducers } from 'redux';
import CustomerDetailReducer from "@store/V1/Customer/DETAIL/CustomerDetailReducer";
import CustomerListReducer from "@store/V1/Customer/LIST/CustomerListReducer";
import CustomerDeleteReducer from "@store/V1/Customer/DELETE/CustomerDeleteReducer";

const CustomerRootReducer = combineReducers({
    list: CustomerListReducer,
    detail: CustomerDetailReducer,
    delete: CustomerDeleteReducer,
});
export default CustomerRootReducer;
