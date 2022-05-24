import { combineReducers } from 'redux';
import BillingInformationListReducer from "@store/V1/CustomerPortal/BillingInformation/LIST/BillingInformationListReducer";
import BillingInformationDetailReducer from "@store/V1/CustomerPortal/BillingInformation/DETAIL/BillingInformationDetailReducer";
import BillingInformationCreateReducer from "@store/V1/CustomerPortal/BillingInformation/CREATE/BillingInformationCreateReducer";
import BillingInformationDeleteReducer from "@store/V1/CustomerPortal/BillingInformation/DELETE/DeleteReducer";
import MarkPrimaryReducer from "@store/V1/CustomerPortal/BillingInformation/MARK_PRIMARY/MarkPrimaryReducer";

const BillingInformationRootReducer = combineReducers({
    list: BillingInformationListReducer,
    detail: BillingInformationDetailReducer,
    create: BillingInformationCreateReducer,
    delete: BillingInformationDeleteReducer,
    mark_primary: MarkPrimaryReducer,
});
export default BillingInformationRootReducer;
