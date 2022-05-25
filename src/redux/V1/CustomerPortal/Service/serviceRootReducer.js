import { combineReducers } from "redux";
import ServiceListReducer from "@store/V1/CustomerPortal/Service/List/ServiceListReducer";
import ServiceDetailReducer from "@store/V1/CustomerPortal/Service/Detail/ServiceDetailReducer";

const ServiceRootReducer = combineReducers({
  list : ServiceListReducer,
  detail: ServiceDetailReducer,
});

export default ServiceRootReducer;
