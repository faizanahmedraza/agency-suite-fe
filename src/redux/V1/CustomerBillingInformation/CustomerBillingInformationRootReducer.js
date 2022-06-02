import { combineReducers } from 'redux';
import BillingInformationListReducer from "@store/V1/CustomerBillingInformation/LIST/BillingInformationListReducer";

const CustomerBillingInformationRootReducer = combineReducers({
    list: BillingInformationListReducer
});
export default CustomerBillingInformationRootReducer;
