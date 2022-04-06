import { combineReducers } from "redux";
import ServiceCreateReducer from "@store/V1/Service/Create/ServiceCreateReducer";

const ServiceRootReducer = combineReducers({
  create: ServiceCreateReducer,
});

export default ServiceRootReducer;
