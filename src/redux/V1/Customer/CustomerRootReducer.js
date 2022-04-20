import { combineReducers } from 'redux';
import CustomerDetailReducer from "@store/V1/Customer/DETAIL/CustomerDetailReducer";
import CustomerListReducer from "@store/V1/Customer/LIST/CustomerListReducer";
import CustomerCreateReducer from "@store/V1/Customer/CREATE/CustomerCreateReducer";
import CustomerUpdateReducer from "@store/V1/Customer/UPDATE/CustomerUpdateReducer";
import CustomerDeleteReducer from "@store/V1/Customer/DELETE/CustomerDeleteReducer";
import CustomerStatusReducer from "@store/V1/Customer/STATUS/CustomerStatusReducer";

const CustomerRootReducer = combineReducers({
    list: CustomerListReducer,
    detail: CustomerDetailReducer,
    create: CustomerCreateReducer,
    update: CustomerUpdateReducer,
    delete: CustomerDeleteReducer,
    customer_status: CustomerStatusReducer,
});
export default CustomerRootReducer;
