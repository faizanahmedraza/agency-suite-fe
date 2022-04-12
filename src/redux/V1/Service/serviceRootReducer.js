import { combineReducers } from "redux";
import ServiceCreateReducer from "@store/V1/Service/Create/ServiceCreateReducer";
import ServiceListReducer from "@store/V1/Service/List/ServiceListReducer";
import ServiceEditReducer from "@store/V1/Service/Edit/ServiceEditReducer";
import ServiceDeleteReducer from "@store/V1/Service/Delete/ServiceDeleteReducer";

const ServiceRootReducer = combineReducers({
  create: ServiceCreateReducer,
  list : ServiceListReducer,
  edit : ServiceEditReducer,
  delete : ServiceDeleteReducer
});

export default ServiceRootReducer;
