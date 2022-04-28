import { combineReducers } from "redux";
import ServiceRequestCreateReducer from "@store/V1/ServiceRequest/CREATE/ServiceRequestCreateReducer";
import ServiceRequestDetailReducer from "@store/V1/ServiceRequest/DETAIL/ServiceRequestDetailReducer";
import ServiceRequestListReducer from "@store/V1/ServiceRequest/LIST/ServiceRequestListReducer";

const ServiceRequestRootReducer = combineReducers({
  create: ServiceRequestCreateReducer,
  list : ServiceRequestListReducer,
  detail : ServiceRequestDetailReducer,
});

export default ServiceRequestRootReducer;
