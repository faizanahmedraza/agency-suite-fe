import { combineReducers } from 'redux';
import BillingInformationDetailReducer from "@store/V1/CustomerPortal/BillingInformation/DETAIL/BillingInformationDetailReducer";
import BillingInformationCreateReducer from "@store/V1/CustomerPortal/BillingInformation/CREATE/BillingInformationCreateReducer";
import BillingInformationUpdateReducer from "@store/V1/CustomerPortal/BillingInformation/UPDATE/BillingInformationUpdateReducer";

const BillingInformationRootReducer = combineReducers({
    detail: BillingInformationDetailReducer,
    create: BillingInformationCreateReducer,
    update: BillingInformationUpdateReducer,
});
export default BillingInformationRootReducer;
