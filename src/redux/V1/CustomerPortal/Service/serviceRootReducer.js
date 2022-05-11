import { combineReducers } from "redux";
import ServiceListReducer from "@store/V1/CustomerPortal/Service/List/ServiceListReducer";
import ServicePaginationReducer from "@store/V1/CustomerPortal/Service/Pagination/ServicePaginationReducer";

const ServiceRootReducer = combineReducers({
  list : ServiceListReducer,
  pagination : ServicePaginationReducer,
});

export default ServiceRootReducer;
