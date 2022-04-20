import { all } from "redux-saga/effects";
import { ServiceCreateSaga, serviceCreateSuccessSaga } from "@store/V1/Service/Create/ServiceCreateSaga"
import { ServiceListSaga } from "@store/V1/Service/List/ServiceListSaga"
import { ServiceEditSaga, ServiceEditSuccessSaga } from "@store/V1/Service/Edit/ServiceEditSaga"
import { serviceDeleteSaga } from "@store/V1/Service/Delete/ServiceDeleteSaga"
import { ServicePaginationSaga } from "@store/V1/Service/Pagination/ServicePaginationSaga"
import { ServiceCatalogSaga } from "@store/V1/Service/Catalog Status/CatalogStatusSaga"
import { ServiceStatusSaga } from "@store/V1/Service/ServiceStatus/ServiceStatusSaga"

export default function* ServiceRootSaga() {
    yield all([
        ServiceCreateSaga(),
        serviceCreateSuccessSaga(),
        ServiceListSaga(),
        ServiceEditSaga(),
        ServiceEditSuccessSaga(),
        serviceDeleteSaga(),
        ServicePaginationSaga(),
        ServiceCatalogSaga(),
        ServiceStatusSaga(),
    ]);
}
