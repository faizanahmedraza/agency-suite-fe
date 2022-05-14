import { combineReducers } from "redux";
import ServiceRequestCreateReducer from "@store/V1/CustomerPortal/ServiceRequest/CREATE/ServiceRequestCreateReducer";
import ServiceRequestDetailReducer from "@store/V1/CustomerPortal/ServiceRequest/DETAIL/ServiceRequestDetailReducer";
import ServiceRequestListReducer from "@store/V1/CustomerPortal/ServiceRequest/LIST/ServiceRequestListReducer";

const CustomerServiceRequestRootReducer = combineReducers({
  create: ServiceRequestCreateReducer,
  list : ServiceRequestListReducer,
  detail : ServiceRequestDetailReducer,
});

export default CustomerServiceRequestRootReducer;
