import { combineReducers } from "redux";
import ServiceRequestCreateReducer from "@store/V1/CustomerPortal/ServiceRequest/CREATE/ServiceRequestCreateReducer";
import ServiceRequestDetailReducer from "@store/V1/CustomerPortal/ServiceRequest/DETAIL/ServiceRequestDetailReducer";
import ServiceRequestListReducer from "@store/V1/CustomerPortal/ServiceRequest/LIST/ServiceRequestListReducer";
import ServiceRequestCancelReducer from "@store/V1/CustomerPortal/ServiceRequest/CANCEL/CancelReducer";

const CustomerServiceRequestRootReducer = combineReducers({
  create: ServiceRequestCreateReducer,
  list : ServiceRequestListReducer,
  detail : ServiceRequestDetailReducer,
  cancel: ServiceRequestCancelReducer
});

export default CustomerServiceRequestRootReducer;
