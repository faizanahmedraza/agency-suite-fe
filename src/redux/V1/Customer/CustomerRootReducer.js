import { combineReducers } from 'redux';
import CustomerFirstReducer from "@store/V1/Customer/FIRST/CustomerFirstReducer";
import CustomerListReducer from "@store/V1/Customer/LIST/CustomerListReducer";
import CustomerDeleteReducer from "@store/V1/Customer/DELETE/CustomerDeleteReducer";

const CustomerRootReducer = combineReducers({
    list: CustomerListReducer,
    detail: CustomerFirstReducer,
    delete: CustomerDeleteReducer,
});
export default CustomerRootReducer;
