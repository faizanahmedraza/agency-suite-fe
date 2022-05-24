import { combineReducers } from 'redux';
import BillingInformationListReducer from "@store/V1/CustomerPortal/BillingInformation/LIST/BillingInformationListReducer";
import BillingInformationDetailReducer from "@store/V1/CustomerPortal/BillingInformation/DETAIL/BillingInformationDetailReducer";
import BillingInformationCreateReducer from "@store/V1/CustomerPortal/BillingInformation/CREATE/BillingInformationCreateReducer";
import BillingInformationUpdateReducer from "@store/V1/CustomerPortal/BillingInformation/UPDATE/BillingInformationUpdateReducer";
import PaymentMethodReducer from "@store/V1/CustomerPortal/BillingInformation/PAYMENT_METHOD/PaymentMethodReducer";

const BillingInformationRootReducer = combineReducers({
    list: BillingInformationListReducer,
    detail: BillingInformationDetailReducer,
    create: BillingInformationCreateReducer,
    update: BillingInformationUpdateReducer,
    payment_method: PaymentMethodReducer,
});
export default BillingInformationRootReducer;
