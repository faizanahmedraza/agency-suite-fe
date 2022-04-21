import { combineReducers } from "redux";
import ServiceCreateReducer from "@store/V1/Service/Create/ServiceCreateReducer";
import ServiceListReducer from "@store/V1/Service/List/ServiceListReducer";
import ServiceEditReducer from "@store/V1/Service/Edit/ServiceEditReducer";
import ServiceDeleteReducer from "@store/V1/Service/Delete/ServiceDeleteReducer";
import ServicePaginationReducer from "@store/V1/Service/Pagination/ServicePaginationReducer";
import ServiceCatalogReducer from "@store/V1/Service/Catalog Status/CatalogStatusReducer";
import ServiceStatusReducer from "@store/V1/Service/ServiceStatus/ServiceStatusReducer";

const ServiceRootReducer = combineReducers({
  create: ServiceCreateReducer,
  list : ServiceListReducer,
  edit : ServiceEditReducer,
  delete : ServiceDeleteReducer,
  pagination : ServicePaginationReducer,
  catalog : ServiceCatalogReducer,
  service_status : ServiceStatusReducer,
});

export default ServiceRootReducer;
