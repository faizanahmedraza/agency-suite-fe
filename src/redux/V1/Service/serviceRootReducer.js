import { combineReducers } from "redux";
import ServiceCreateReducer from "@store/V1/Service/Create/ServiceCreateReducer";
import ServiceListReducer from "@store/V1/Service/List/ServiceListReducer";

const ServiceRootReducer = combineReducers({
  create: ServiceCreateReducer,
  list : ServiceListReducer
});

export default ServiceRootReducer;
