import { combineReducers } from "redux";
import ServiceListReducer from "@store/V1/CustomerPortal/Service/List/ServiceListReducer";
import ServiceDetailReducer from "@store/V1/CustomerPortal/Service/Detail/ServiceDetailReducer";
import ServicePaginationReducer from "@store/V1/CustomerPortal/Service/Pagination/ServicePaginationReducer";

const ServiceRootReducer = combineReducers({
  list : ServiceListReducer,
  detail: ServiceDetailReducer,
  pagination : ServicePaginationReducer,
});

export default ServiceRootReducer;
